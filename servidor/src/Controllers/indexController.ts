import { Request, Response } from 'express';
import Errores from './analizador/excepciones/Errores';
import Arbol from './analizador/simbolo/Arbol';
import tablaSimbolo from './analizador/simbolo/tablaSimbolos';
var fs = require('fs');
import { exec } from 'child_process';
import Metodo from './analizador/instrucciones/Metodo';
import Funcion from './analizador/instrucciones/Funcion';
import Run from './analizador/instrucciones/Run';
import DeclaracionArray1 from './analizador/instrucciones/DeclaracionArray1';
import DeclaracionArray2 from './analizador/instrucciones/DeclaracionArray2';
import DeclaracionVar from './analizador/instrucciones/DeclaracionVar';
import ModVar from './analizador/instrucciones/ModVar';
import ModVec from './analizador/instrucciones/ModVec';
export let listaErrores: Array<Errores>;
export let numeroNodo = { no: 10 as number };
let tree: Arbol;
let graphAST: string;

class IndexController {
    public prueba(req: Request, res: Response) {
        res.json({ "funciona": "la api" });
    }

    public escaneo(req: Request, res: Response) {
        graphAST = "";
        numeroNodo.no = 0;
        listaErrores = new Array<Errores>();
        let parser = require("./analizador/analizador");

        try {
            let ast = new Arbol(parser.parse(req.body.consola));
            var tabla = new tablaSimbolo();
            tabla.setNombre("")
            ast.setTablaGlobal(tabla);
            ast.setConsola("")
            for (let i of ast.getInstrucciones()) {
                if (i instanceof Errores) listaErrores.push(i)
                if (i instanceof Metodo || i instanceof Funcion) {
                    i.id = i.id.toLowerCase();
                    ast.addFunciones(i);
                }
                if (i instanceof DeclaracionArray1 || i instanceof DeclaracionArray2 || i instanceof DeclaracionVar || i instanceof ModVar || i instanceof ModVec) {
                    var resultado = i.interpretar(ast, tabla);
                    if (resultado instanceof Errores) {
                        listaErrores.push(resultado);
                    }
                }
            }

            for (let i of ast.getInstrucciones()) {
                if (i instanceof Run) {
                    var resultado = i.interpretar(ast, tabla);
                    if (resultado instanceof Errores) {
                        listaErrores.push(resultado);
                    }
                } else if (i instanceof Metodo || i instanceof Funcion || i instanceof DeclaracionArray1 || i instanceof DeclaracionArray2 || i instanceof DeclaracionVar || i instanceof ModVar || i instanceof ModVec) {
                    continue;
                }
                else {
                    listaErrores.push(new Errores("Semantico", "Sentencia fuera de rango", i.linea, i.col));
                }


            }
            let cadena = "digraph ast {\n";
            cadena += "nINICIO [label=\"INICIO\"];\n";
            cadena += "nINSTRUCCIONES [label=\"INSTRUCCIONES\"];\n"
            cadena += "nINICIO->nINSTRUCCIONES;\n";

            for (let i of ast.getInstrucciones()) {
                if (i instanceof Errores) continue;
                else {

                    let nodo1 = "n" + (numeroNodo.no + 1);
                    numeroNodo.no += 1;
                    cadena += nodo1 + "[label=\"INSTRUCCION\"];\n";
                    cadena += "nINSTRUCCIONES" + "->" + nodo1 + ";\n";
                    cadena += i.generarDot(nodo1);

                }

            }
            cadena += "\n}"
            graphAST = cadena;
            //console.log(graphAST)
            for (let i of listaErrores) {
                ast.Println(i.toString());
            }
            tree = ast;
            //console.log(ast.getTablaGlobal().getTabla())
            //console.log(ast.getSimbolos())
            res.json({ consola: ast.getConsola() })
        } catch (err) {
            res.send({ "ERROR": "ALGO SALIO MAL :(" })

        }
    }

    public ast(req: Request, res: Response) {
        if (graphAST != "") {
            fs.writeFile('AST.dot', graphAST, () => { });
            exec("dot -Tsvg AST.dot -o ../cliente/src/assets/AST.svg", (error, stdout, stderr) => { if (error) { res.json({ ast: false }); return; } else { res.json({ ast: true }); return; } });
        }else  res.json({ast:false});
    }

    public errores(req: Request, res: Response) {
        res.json({ Errores: listaErrores });
    }

    public simbolos(req: Request, res: Response) {
        res.json({ Simbolos: tree.getSimbolos() });
    }
}

export const indexController = new IndexController();