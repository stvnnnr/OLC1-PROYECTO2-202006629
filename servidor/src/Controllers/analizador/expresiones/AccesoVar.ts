import { numeroNodo } from "../../indexController";
import { Instruccion } from "../abstracto/Instruccion";
import Errores from "../excepciones/Errores";
import Arbol from "../simbolo/Arbol";
import Simbolo from "../simbolo/simbolo";
import tablaSimbolo from "../simbolo/tablaSimbolos";
import Tipo, { tipoDato } from "../simbolo/Tipo";

export default class AccesoVar extends Instruccion {
    public id: string;

    constructor(id: string, linea: number, col: number) {
        super(new Tipo(tipoDato.VOID), linea, col);
        this.id = id.toLowerCase();

    }

    interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        let valor = tabla.getVariable(this.id);
        if (valor == null) return new Errores("Semantico", "Variable no existente "+this.id, this.linea, this.col);
        this.tipoDato = valor.getTipo();
        return valor.getValor();
    }
    generarDot(anterior: string) {
        let cadena = "";
        let nodo1 = "n" + (numeroNodo.no + 1);
        let nodo2 = "n" + (numeroNodo.no + 2);
        numeroNodo.no += 2;

        cadena += nodo1 + "[label=\"ID\"];\n";
        cadena += nodo2 + "[label=\""+this.id+"\"];\n";
        cadena += anterior + "->" + nodo1 + ";\n";
        cadena += nodo1 + "->" + nodo2 + ";\n";

        return cadena;

    }
}