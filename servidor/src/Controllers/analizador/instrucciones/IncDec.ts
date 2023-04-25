import { Instruccion } from "../abstracto/Instruccion";
import Errores from "../excepciones/Errores";
import Arbol from "../simbolo/Arbol";
import tablaSimbolo from "../simbolo/tablaSimbolos";
import Tipo, { tipoDato } from "../simbolo/Tipo";
import AccesoVar from "../expresiones/AccesoVar";
import AccesoVec from "../expresiones/AccesoVec";
import { numeroNodo } from "../../indexController";

export default class IncDec extends Instruccion {
    private expresion: Instruccion;
    private operacion: number;
    //1 para incremento - 0 para decremento

    constructor(expresion: Instruccion, operacion: number, linea: number, col: number) {
        super(new Tipo(tipoDato.VOID), linea, col);
        this.expresion = expresion;
        this.operacion = operacion;

    }

    interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        if (this.expresion instanceof AccesoVar) {
            let variable = tabla.getVariable(this.expresion.id);

            if (variable == null) return new Errores("Semantico", "La variable" + this.expresion + " no existe", this.linea, this.col);
            if (variable.getTipo().getTipo() != tipoDato.ENTERO && variable.getTipo().getTipo() != tipoDato.DECIMAL) return new Errores("Semantico", "La variable" + this.expresion + " debe ser numerica (int o double)", this.linea, this.col);

            this.tipoDato.setTipo(variable.getTipo().getTipo())
            let valor = variable.getValor();
            if (this.operacion == 0) {
                valor--;
            } else {
                valor++;
            }
            variable.setValor(valor);
            arbol.updateSimbolo(this.expresion.id, tabla.getNombre(), "" + valor)
            return valor;
        } else if (this.expresion instanceof AccesoVec) {
            let variable = tabla.getVariable(this.expresion.id);
            if (variable == null) return new Errores("Semantico", "La variable " + this.expresion + " no existe", this.linea, this.col);
            if (variable.getTipo().getTipo() != tipoDato.ENTERO && variable.getTipo().getTipo() != tipoDato.DECIMAL) return new Errores("Semantico", "La variable" + this.expresion + " debe ser numerica (int o double)", this.linea, this.col);

            if (this.expresion.dimension == 1) {
                let indice1 = this.expresion.index1.interpretar(arbol, tabla);
                if (indice1 instanceof Errores) return indice1;
                if (this.expresion.index1.tipoDato.getTipo() != tipoDato.ENTERO) return new Errores("Semantico", "Los indices de los arreglos deben de ser enteros", this.linea, this.col);
                let valor = variable.getValor();
                if (valor[parseInt(indice1)] == undefined) return new Errores("Semantico", "Index fuera del rango", this.linea, this.col);
                if (this.operacion == 0) {
                    valor[parseInt(indice1)]--;
                } else {
                    valor[parseInt(indice1)]++;
                }
                variable.setValor(valor);
                arbol.updateSimbolo(this.expresion.id, tabla.getNombre(), "[" + valor.toString() + "]")
                return valor[parseInt(indice1)];
            } else {
                if (!this.expresion.index2) return new Errores("Semantico", "Index Invalido", this.linea, this.col);
                else {
                    let indice1 = this.expresion.index1.interpretar(arbol, tabla);
                    if (indice1 instanceof Errores) return indice1;
                    if (this.expresion.index1.tipoDato.getTipo() != tipoDato.ENTERO) return new Errores("Semantico", "Los indices de los arreglos deben de ser enteros", this.linea, this.col);

                    let indice2 = this.expresion.index2.interpretar(arbol, tabla);
                    if (indice2 instanceof Errores) return indice2;
                    if (this.expresion.index2.tipoDato.getTipo() != tipoDato.ENTERO) return new Errores("Semantico", "Los indices de los arreglos deben de ser enteros", this.linea, this.col);
                    let valor = variable.getValor();
                    try {
                        if (valor[parseInt(indice1)][parseInt(indice2)] == undefined) return new Errores("Semantico", "Index fuera del rango", this.linea, this.col);
                        if (this.operacion == 0) {
                            valor[parseInt(indice1)][parseInt(indice2)]--;
                        } else {
                            valor[parseInt(indice1)][parseInt(indice2)]++;
                        }
                        variable.setValor(valor);
                        let valorAux = "[";
                        for (let i = 0; i < valor.length; i++) {
                            let aux = [];
                            for (let j = 0; j < valor[0].length; j++) {
                                aux.push(valor[i][j]);
                            }
                            if (i == 0) valorAux = valorAux + "[" + aux.toString() + "]";
                            else valorAux = valorAux + ",[" + aux.toString() + "]";
                        }
                        valorAux += "]";
                        arbol.updateSimbolo(this.expresion.id, tabla.getNombre(), valorAux)
                        return valor[parseInt(indice1)][parseInt(indice2)];
                    } catch (err) {
                        return new Errores("Semantico", "Index fuera del rango", this.linea, this.col);
                    }
                }
            }
        } else {
            return new Errores("Semantico", "Variable no valida", this.linea, this.col);
        }

    }

    generarDot(anterior: string) {
        let cadena = "";
        let nodo1 = "n" + (numeroNodo.no + 1);
        let nodo2 = "n" + (numeroNodo.no + 2);
        let nodo3 = "n" + (numeroNodo.no + 3);
        let nodo4 = "n" + (numeroNodo.no + 4);
        let nodo5 = "n" + (numeroNodo.no + 5);
        numeroNodo.no += 5;

        if (this.operacion == 0) {
            cadena += nodo1 + "[label=\"DECREMENTO\"];\n";
            cadena += nodo2 + "[label=\"EXP\"];\n";
            cadena += nodo3 + "[label=\"DECREMENT\"];\n";
            cadena += nodo4 + "[label=\";\"];\n";
            cadena += nodo5 + "[label=\"--\"];\n";
        } else {
            cadena += nodo1 + "[label=\"INCREMENTO\"];\n";
            cadena += nodo2 + "[label=\"EXP\"];\n";
            cadena += nodo3 + "[label=\"INCREMENT\"];\n";
            cadena += nodo4 + "[label=\";\"];\n";
            cadena += nodo5 + "[label=\"++\"];\n";

        }

        cadena += anterior + "->" + nodo1 + ";\n";
        cadena += nodo1 + "->" + nodo2 + ";\n";
        cadena += nodo1 + "->" + nodo3 + ";\n";
        cadena += nodo1 + "->" + nodo4 + ";\n";
        cadena += nodo3 + "->" + nodo5 + ";\n";
        cadena += this.expresion.generarDot(nodo2);
        return cadena;
    }
}
/*
operacion 0 es --
operacion 1 es -++
*/
