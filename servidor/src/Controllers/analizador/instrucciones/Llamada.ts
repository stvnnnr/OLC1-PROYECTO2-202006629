import { Instruccion } from '../abstracto/Instruccion'
import Errores from '../excepciones/Errores'
import Arbol from '../simbolo/Arbol'
import tablaSimbolo from '../simbolo/tablaSimbolos'
import Tipo, { tipoDato } from '../simbolo/Tipo'
import { numeroNodo } from '../../indexController'
import DeclaracionVar from './DeclaracionVar'
import Metodo from './Metodo'
import Funcion from './Funcion'
import Nativo from '../expresiones/Nativo'

export default class Llamada extends Instruccion {
    private id: string;
    private parametros: Instruccion[];

    constructor(id: string, linea: number, col: number, params: Instruccion[]) {
        super(new Tipo(tipoDato.VOID), linea, col);
        this.id = id;
        this.parametros = params;
    }


    interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        let busqueda = arbol.getFuncion(this.id);
        if (busqueda == null) return new Errores("Semantico", "Funcion No Existente", this.linea, this.col);

        if (busqueda instanceof Metodo) {
            let NewTabla = new tablaSimbolo(arbol.getTablaGlobal());
            NewTabla.setNombre(arbol.getTablaGlobal().getNombre() + "METODO-" + this.id + "-")

            if (busqueda.parametros.length != this.parametros.length) return new Errores("Semantico", "Cantidad de parametros invalida", this.linea, this.col);

            for (let i = 0; i < busqueda.parametros.length; i++) {
                let resultado = this.parametros[i].interpretar(arbol, tabla);
                if (resultado instanceof Errores) return resultado;
                if (busqueda.parametros[i].tipo.getTipo() != this.parametros[i].tipoDato.getTipo()) return new Errores("Semantico", "Discrepancia entre tipo de dato del parametro", this.linea, this.col);
                let decla = new DeclaracionVar(busqueda.parametros[i].tipo, this.linea, this.col, [busqueda.parametros[i].id], undefined);
                let resultado2 = decla.interpretar(arbol, NewTabla);
                if (resultado2 instanceof Errores) return resultado2;

                let variable = NewTabla.getVariable(busqueda.parametros[i].id);
                if (variable == null) return new Errores("Semantico", "Variable no existente " + busqueda.parametros[i].id, this.linea, this.col);
                if (variable.getTipo().getTipo() != busqueda.parametros[i].tipo.getTipo()) return new Errores("Semantico", "Discrepancia entre tipo de dato del parametro", this.linea, this.col);
                variable.setValor(resultado);
                arbol.addSimbolo(busqueda.parametros[i].id, "PARAMETRO", NewTabla.getNombre(), this.linea, this.col, resultado)
            }
            //id vector
            let FuncionI = busqueda.interpretar(arbol, NewTabla);
            if (FuncionI instanceof Errores) return FuncionI;
        } else if (busqueda instanceof Funcion) {
            let NewTabla = new tablaSimbolo(arbol.getTablaGlobal());
            NewTabla.setNombre(arbol.getTablaGlobal().getNombre() + "FUNCION-" + this.id + "-")

            if (busqueda.parametros.length != this.parametros.length) return new Errores("Semantico", "Cantidad de parametros invalida", this.linea, this.col);

            for (let i = 0; i < busqueda.parametros.length; i++) {
                let resultado = this.parametros[i].interpretar(arbol, tabla);
                if (resultado instanceof Errores) return resultado;
                if (busqueda.parametros[i].tipo.getTipo() != this.parametros[i].tipoDato.getTipo()) return new Errores("Semantico", "Discrepancia entre tipo de dato del parametro", this.linea, this.col);
                let decla = new DeclaracionVar(busqueda.parametros[i].tipo, this.linea, this.col, [busqueda.parametros[i].id], undefined);
                let resultado2 = decla.interpretar(arbol, NewTabla);
                if (resultado2 instanceof Errores) return resultado2;

                let variable = NewTabla.getVariable(busqueda.parametros[i].id);
                if (variable == null) return new Errores("Semantico", "Variable no existente " + busqueda.parametros[i].id, this.linea, this.col);
                if (variable.getTipo().getTipo() != busqueda.parametros[i].tipo.getTipo()) return new Errores("Semantico", "Discrepancia entre tipo de dato del parametro", this.linea, this.col);
                variable.setValor(resultado);
                arbol.addSimbolo(busqueda.parametros[i].id, "PARAMETRO", NewTabla.getNombre(), this.linea, this.col, resultado)
            }

            let FuncionI = busqueda.interpretar(arbol, NewTabla);
            this.tipoDato = busqueda.tipoDato;
            return FuncionI

        } else return new Errores("Semantico", "Cantidad de parametros invalida", this.linea, this.col);
    }

    generarDot(anterior: string) {
        let cadena = "";
        if (this.parametros.length > 0) {
            let nodo1 = "n" + (numeroNodo.no + 1);
            let nodo2 = "n" + (numeroNodo.no + 2);
            let nodo3 = "n" + (numeroNodo.no + 3);
            let nodo4 = "n" + (numeroNodo.no + 4);
            let nodo5 = "n" + (numeroNodo.no + 5);
            let nodo6 = "n" + (numeroNodo.no + 6);
            numeroNodo.no += 6;

            cadena += nodo1 + "[label=\"LLAMADA\"];\n";
            cadena += nodo2 + "[label=\"ID\"];\n";
            cadena += nodo3 + "[label=\"(\"];\n";
            cadena += nodo4 + "[label=\"PARAMSCALL\"];\n";
            cadena += nodo5 + "[label=\")\"];\n";
            cadena += nodo6 + "[label=\"" + this.id + "\"];\n";

            cadena += anterior + "->" + nodo1 + ";\n";
            cadena += nodo1 + "->" + nodo2 + ";\n";
            cadena += nodo1 + "->" + nodo3 + ";\n";
            cadena += nodo1 + "->" + nodo4 + ";\n";
            cadena += nodo1 + "->" + nodo5 + ";\n";
            cadena += nodo2 + "->" + nodo6 + ";\n";


            let index = 0;
            for (let i of this.parametros) {
                if (index == 0) {
                    let nodo9 = "n" + (numeroNodo.no + 1);
                    numeroNodo.no += 1;

                    cadena += nodo9 + "[label=\"EXP\"];\n";
                    cadena += nodo4 + "->" + nodo9 + ";\n";
                    cadena += i.generarDot(nodo9);
                } else {
                    let nodo9 = "n" + (numeroNodo.no + 1);
                    let nodo10 = "n" + (numeroNodo.no + 1);
                    numeroNodo.no += 2;

                    cadena += nodo9 + "[label=\",\"];\n";
                    cadena += nodo9 + "[label=\"EXP\"];\n";
                    cadena += nodo4 + "->" + nodo10 + ";\n";
                    cadena += nodo4 + "->" + nodo9 + ";\n";
                    cadena += i.generarDot(nodo9);
                }
                index++;
            }
            return cadena;
        } else {
            let nodo1 = "n" + (numeroNodo.no + 1);
            let nodo2 = "n" + (numeroNodo.no + 2);
            let nodo3 = "n" + (numeroNodo.no + 3);
            let nodo4 = "n" + (numeroNodo.no + 4);
            let nodo5 = "n" + (numeroNodo.no + 5);
            let nodo6 = "n" + (numeroNodo.no + 6);
            numeroNodo.no += 6;

            cadena += nodo1 + "[label=\"LLAMADA\"];\n";
            cadena += nodo2 + "[label=\"ID\"];\n";
            cadena += nodo3 + "[label=\"(\"];\n";
            cadena += nodo5 + "[label=\")\"];\n";
            cadena += nodo6 + "[label=\"" + this.id + "\"];\n";

            cadena += anterior + "->" + nodo1 + ";\n";
            cadena += nodo1 + "->" + nodo2 + ";\n";
            cadena += nodo1 + "->" + nodo3 + ";\n";
            cadena += nodo1 + "->" + nodo5 + ";\n";
            cadena += nodo2 + "->" + nodo6 + ";\n";
            return cadena;
        }

    }

}