"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.indexController = exports.numeroNodo = exports.listaErrores = void 0;
const Errores_1 = __importDefault(require("./analizador/excepciones/Errores"));
const Arbol_1 = __importDefault(require("./analizador/simbolo/Arbol"));
const tablaSimbolos_1 = __importDefault(require("./analizador/simbolo/tablaSimbolos"));
var fs = require('fs');
const child_process_1 = require("child_process");
const Metodo_1 = __importDefault(require("./analizador/instrucciones/Metodo"));
const Funcion_1 = __importDefault(require("./analizador/instrucciones/Funcion"));
const Run_1 = __importDefault(require("./analizador/instrucciones/Run"));
const DeclaracionArray1_1 = __importDefault(require("./analizador/instrucciones/DeclaracionArray1"));
const DeclaracionArray2_1 = __importDefault(require("./analizador/instrucciones/DeclaracionArray2"));
const DeclaracionVar_1 = __importDefault(require("./analizador/instrucciones/DeclaracionVar"));
const ModVar_1 = __importDefault(require("./analizador/instrucciones/ModVar"));
const ModVec_1 = __importDefault(require("./analizador/instrucciones/ModVec"));
exports.numeroNodo = { no: 10 };
let tree;
let graphAST;
class IndexController {
    prueba(req, res) {
        res.json({ "funciona": "la api" });
    }
    escaneo(req, res) {
        graphAST = "";
        exports.numeroNodo.no = 0;
        exports.listaErrores = new Array();
        let parser = require("./analizador/analizador");
        try {
            let ast = new Arbol_1.default(parser.parse(req.body.consola));
            var tabla = new tablaSimbolos_1.default();
            tabla.setNombre("");
            ast.setTablaGlobal(tabla);
            ast.setConsola("");
            for (let i of ast.getInstrucciones()) {
                if (i instanceof Errores_1.default)
                    exports.listaErrores.push(i);
                if (i instanceof Metodo_1.default || i instanceof Funcion_1.default) {
                    i.id = i.id.toLowerCase();
                    ast.addFunciones(i);
                }
                if (i instanceof DeclaracionArray1_1.default || i instanceof DeclaracionArray2_1.default || i instanceof DeclaracionVar_1.default || i instanceof ModVar_1.default || i instanceof ModVec_1.default) {
                    var resultado = i.interpretar(ast, tabla);
                    if (resultado instanceof Errores_1.default) {
                        exports.listaErrores.push(resultado);
                    }
                }
            }
            for (let i of ast.getInstrucciones()) {
                if (i instanceof Run_1.default) {
                    var resultado = i.interpretar(ast, tabla);
                    if (resultado instanceof Errores_1.default) {
                        exports.listaErrores.push(resultado);
                    }
                }
                else if (i instanceof Metodo_1.default || i instanceof Funcion_1.default || i instanceof DeclaracionArray1_1.default || i instanceof DeclaracionArray2_1.default || i instanceof DeclaracionVar_1.default || i instanceof ModVar_1.default || i instanceof ModVec_1.default) {
                    continue;
                }
                else {
                    exports.listaErrores.push(new Errores_1.default("Semantico", "Sentencia fuera de rango", i.linea, i.col));
                }
            }
            let cadena = "digraph ast {\n";
            cadena += "nINICIO [label=\"INICIO\"];\n";
            cadena += "nINSTRUCCIONES [label=\"INSTRUCCIONES\"];\n";
            cadena += "nINICIO->nINSTRUCCIONES;\n";
            for (let i of ast.getInstrucciones()) {
                if (i instanceof Errores_1.default)
                    continue;
                else {
                    let nodo1 = "n" + (exports.numeroNodo.no + 1);
                    exports.numeroNodo.no += 1;
                    cadena += nodo1 + "[label=\"INSTRUCCION\"];\n";
                    cadena += "nINSTRUCCIONES" + "->" + nodo1 + ";\n";
                    cadena += i.generarDot(nodo1);
                }
            }
            cadena += "\n}";
            graphAST = cadena;
            //console.log(graphAST)
            for (let i of exports.listaErrores) {
                ast.Println(i.toString());
            }
            tree = ast;
            //console.log(ast.getTablaGlobal().getTabla())
            //console.log(ast.getSimbolos())
            res.json({ consola: ast.getConsola() });
        }
        catch (err) {
            res.send({ "ERROR": "ALGO SALIO MAL :(" });
        }
    }
    ast(req, res) {
        if (graphAST != "") {
            fs.writeFile('AST.dot', graphAST, () => { });
            (0, child_process_1.exec)("dot -Tsvg AST.dot -o ../cliente/src/assets/AST.svg", (error, stdout, stderr) => { if (error) {
                res.json({ ast: false });
                return;
            }
            else {
                res.json({ ast: true });
                return;
            } });
        }
        else
            res.json({ ast: false });
    }
    errores(req, res) {
        res.json({ Errores: exports.listaErrores });
    }
    simbolos(req, res) {
        res.json({ Simbolos: tree.getSimbolos() });
    }
}
exports.indexController = new IndexController();
