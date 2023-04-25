import { numeroNodo } from "../../indexController";
import { Instruccion } from "../abstracto/Instruccion";
import Errores from "../excepciones/Errores";
import Arbol from "../simbolo/Arbol";
import Simbolo from "../simbolo/simbolo";
import tablaSimbolo from "../simbolo/tablaSimbolos";
import Tipo, { tipoDato } from "../simbolo/Tipo";

export default class AccesoVec extends Instruccion {
    public id: string
    public dimension: number;
    public index1: Instruccion;
    public index2: Instruccion | undefined;

    constructor(id: string, dimension: number, index1: Instruccion, linea: number, col: number, index2?: Instruccion) {
        super(new Tipo(tipoDato.VOID), linea, col);
        this.id = id.toLowerCase();
        this.dimension = dimension;
        this.index1 = index1;
        this.index2 = index2;
    }

    interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        let arreglo = tabla.getVariable(this.id);
        if (arreglo == null) return new Errores("Semantico", "Variable no existente ", this.linea, this.col);
        this.tipoDato.setTipo(arreglo.getTipo().getTipo());
        if (this.dimension == 1) {
            let indice1 = this.index1.interpretar(arbol, tabla);
            if (indice1 instanceof Errores) return indice1;
            if (this.index1.tipoDato.getTipo() != tipoDato.ENTERO) return new Errores("Semantico", "Los indices de los arreglos deben de ser enteros", this.linea, this.col);
            let valor = arreglo.getValor();
            if (valor[parseInt(indice1)] == undefined) return new Errores("Semantico", "Index fuera del rango", this.linea, this.col);
            return valor[parseInt(indice1)];
        } else {
            if (!this.index2) return new Errores("Semantico", "Index Invalido", this.linea, this.col);
            else {
                let indice1 = this.index1.interpretar(arbol, tabla);
                if (indice1 instanceof Errores) return indice1;
                if (this.index1.tipoDato.getTipo() != tipoDato.ENTERO) return new Errores("Semantico", "Los indices de los arreglos deben de ser enteros", this.linea, this.col);

                let indice2 = this.index2.interpretar(arbol, tabla);
                if (indice2 instanceof Errores) return indice2;
                if (this.index2.tipoDato.getTipo() != tipoDato.ENTERO) return new Errores("Semantico", "Los indices de los arreglos deben de ser enteros", this.linea, this.col);
                let valor = arreglo.getValor();
                try {
                    if (valor[parseInt(indice1)][parseInt(indice2)] == undefined) return new Errores("Semantico", "Index fuera del rango", this.linea, this.col);
                    return valor[parseInt(indice1)][parseInt(indice2)];
                } catch (err) {
                    return new Errores("Semantico", "Index fuera del rango", this.linea, this.col);
                }
            }
        }
    }

    generarDot(anterior: string) {
        let cadena = "";

        if (this.dimension == 1) {
            let nodo1 = "n" + (numeroNodo.no + 1);
            let nodo2 = "n" + (numeroNodo.no + 2);
            let nodo3 = "n" + (numeroNodo.no + 3);
            let nodo4 = "n" + (numeroNodo.no + 4);
            let nodo5 = "n" + (numeroNodo.no + 5);

            numeroNodo.no += 5;
            cadena += nodo1 + "[label=\"ID\"];\n";
            cadena += nodo2 + "[label=\"[\"];\n";
            cadena += nodo3 + "[label=\"EXP\"];\n";
            cadena += nodo4 + "[label=\"]\"];\n";
            cadena += nodo5 + "[label=\""+this.id+"\"];\n";
            cadena += anterior + "->" + nodo1 + ";\n";
            cadena += anterior + "->" + nodo2 + ";\n";
            cadena += anterior + "->" + nodo3 + ";\n";
            cadena += anterior + "->" + nodo4 + ";\n";
            cadena += nodo1 + "->" + nodo5 + ";\n";

            cadena += this.index1.generarDot(nodo3);
            return cadena;
        } else {
            let nodo1 = "n" + (numeroNodo.no + 1);
            let nodo2 = "n" + (numeroNodo.no + 2);
            let nodo3 = "n" + (numeroNodo.no + 3);
            let nodo4 = "n" + (numeroNodo.no + 4);
            let nodo5 = "n" + (numeroNodo.no + 5);
            let nodo6 = "n" + (numeroNodo.no + 6);
            let nodo7 = "n" + (numeroNodo.no + 7);
            numeroNodo.no += 7;
            cadena += nodo1 + "[label=\"ID\"];\n";
            cadena += nodo2 + "[label=\"[\"];\n";
            cadena += nodo3 + "[label=\"EXP\"];\n";
            cadena += nodo4 + "[label=\"]\"];\n";
            cadena += nodo5 + "[label=\"[\"];\n";
            cadena += nodo6 + "[label=\"EXP\"];\n";
            cadena += nodo7 + "[label=\"]\"];\n";
            cadena += anterior + "->" + nodo1 + ";\n";
            cadena += anterior + "->" + nodo2 + ";\n";
            cadena += anterior + "->" + nodo3 + ";\n";
            cadena += anterior + "->" + nodo4 + ";\n";
            cadena += anterior + "->" + nodo5 + ";\n";
            cadena += anterior + "->" + nodo6 + ";\n";
            cadena += anterior + "->" + nodo7 + ";\n";
            cadena += this.index1.generarDot(nodo3);
            if (this.index2 != undefined) cadena += this.index2.generarDot(nodo3);
            return cadena;
        }
    }
}
