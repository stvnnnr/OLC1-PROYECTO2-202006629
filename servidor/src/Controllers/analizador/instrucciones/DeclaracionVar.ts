import { numeroNodo } from '../../indexController'
import { Instruccion } from '../abstracto/Instruccion'
import Errores from '../excepciones/Errores'
import Arbol from '../simbolo/Arbol'
import Simbolo from '../simbolo/simbolo'
import tablaSimbolo from '../simbolo/tablaSimbolos'
import Tipo, { tipoDato } from '../simbolo/Tipo'

export default class DeclaracionVar extends Instruccion {
    private identificadores: string[];
    private valor: Instruccion | undefined;

    constructor(tipo: Tipo, linea: number, col: number, ids: string[], val: Instruccion | undefined) {
        super(tipo, linea, col);
        this.identificadores = ids;
        this.valor = val;
    }


    interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        if (!this.valor) {
            switch (this.tipoDato.getTipo()) {
                case tipoDato.ENTERO:
                    for (let i = 0; i < this.identificadores.length; i++) {
                        if (!(tabla.setVariable(new Simbolo(this.tipoDato, this.identificadores[i], 0)))) return new Errores("Semantico", "Declaracion de variable '" + this.identificadores[i] + "' ya existente en el ambito", this.linea, this.col);
                        arbol.addSimbolo(this.identificadores[i], "ENTERO", tabla.getNombre(), this.linea, this.col, "0");
                    }

                    break;
                case tipoDato.DECIMAL:
                    for (let i = 0; i < this.identificadores.length; i++) {
                        if (!(tabla.setVariable(new Simbolo(this.tipoDato, this.identificadores[i], 0.0)))) return new Errores("Semantico", "Declaracion de variable '" + this.identificadores[i] + "' ya existente en el ambito", this.linea, this.col);
                        arbol.addSimbolo(this.identificadores[i], "DOUBLE", tabla.getNombre(), this.linea, this.col, "0.0");
                    }
                    break;
                case tipoDato.BOOL:
                    for (let i = 0; i < this.identificadores.length; i++) {
                        if (!(tabla.setVariable(new Simbolo(this.tipoDato, this.identificadores[i], true)))) return new Errores("Semantico", "Declaracion de variable '" + this.identificadores[i] + "' ya existente en el ambito", this.linea, this.col);
                        arbol.addSimbolo(this.identificadores[i], "BOOLEAN", tabla.getNombre(), this.linea, this.col, "true");
                    }
                    break;
                case tipoDato.CARACTER:
                    for (let i = 0; i < this.identificadores.length; i++) {
                        if (!(tabla.setVariable(new Simbolo(this.tipoDato, this.identificadores[i], '\u0000')))) return new Errores("Semantico", "Declaracion de variable '" + this.identificadores[i] + "' ya existente en el ambito", this.linea, this.col);
                        arbol.addSimbolo(this.identificadores[i], "CHAR", tabla.getNombre(), this.linea, this.col, '\u0000');
                    }
                    break;
                case tipoDato.CADENA:
                    for (let i = 0; i < this.identificadores.length; i++) {
                        if (!(tabla.setVariable(new Simbolo(this.tipoDato, this.identificadores[i], "")))) return new Errores("Semantico", "Declaracion de variable '" + this.identificadores[i] + "' ya existente en el ambito", this.linea, this.col);
                        arbol.addSimbolo(this.identificadores[i], "STRING", tabla.getNombre(), this.linea, this.col, "");
                    }
                    break;
                default:
                    return new Errores("Semantico", "Asigancion de no valida", this.linea, this.col);
            }
        } else {
            let valorInterpretado = this.valor.interpretar(arbol, tabla);
            if (valorInterpretado instanceof Errores) return valorInterpretado;
            if (this.tipoDato.getTipo() != this.valor.tipoDato.getTipo()) return new Errores("Semantico", "Tipo de variable y de valor diferentes", this.linea, this.col);
            else {
                switch (this.tipoDato.getTipo()) {
                    case tipoDato.ENTERO:
                        for (let i = 0; i < this.identificadores.length; i++) {
                            if (!(tabla.setVariable(new Simbolo(this.tipoDato, this.identificadores[i], parseInt(valorInterpretado))))) return new Errores("Semantico", "Declaracion de variable '" + this.identificadores[i] + "' ya existente en el ambito", this.linea, this.col);
                            arbol.addSimbolo(this.identificadores[i], "ENTERO", tabla.getNombre(), this.linea, this.col, valorInterpretado);
                        }
                        break;
                    case tipoDato.DECIMAL:
                        for (let i = 0; i < this.identificadores.length; i++) {
                            if (!(tabla.setVariable(new Simbolo(this.tipoDato, this.identificadores[i], parseFloat(valorInterpretado))))) return new Errores("Semantico", "Declaracion de variable '" + this.identificadores[i] + "' ya existente en el ambito", this.linea, this.col);
                            arbol.addSimbolo(this.identificadores[i], "DOUBLE", tabla.getNombre(), this.linea, this.col, valorInterpretado);
                        }
                        break;
                    case tipoDato.BOOL:
                        for (let i = 0; i < this.identificadores.length; i++) {
                            if (!(tabla.setVariable(new Simbolo(this.tipoDato, this.identificadores[i], valorInterpretado)))) return new Errores("Semantico", "Declaracion de variable '" + this.identificadores[i] + "' ya existente en el ambito", this.linea, this.col);
                            arbol.addSimbolo(this.identificadores[i], "BOOLEAN", tabla.getNombre(), this.linea, this.col, "" + valorInterpretado);
                        }
                        break;
                    case tipoDato.CARACTER:
                        for (let i = 0; i < this.identificadores.length; i++) {
                            if (!(tabla.setVariable(new Simbolo(this.tipoDato, this.identificadores[i], valorInterpretado)))) return new Errores("Semantico", "Declaracion de variable '" + this.identificadores[i] + "' ya existente en el ambito", this.linea, this.col);
                            arbol.addSimbolo(this.identificadores[i], "CHAR", tabla.getNombre(), this.linea, this.col, valorInterpretado);
                        }
                        break;
                    case tipoDato.CADENA:
                        for (let i = 0; i < this.identificadores.length; i++) {
                            if (!(tabla.setVariable(new Simbolo(this.tipoDato, this.identificadores[i], valorInterpretado)))) return new Errores("Semantico", "Declaracion de variable '" + this.identificadores[i] + "' ya existente en el ambito", this.linea, this.col);
                            arbol.addSimbolo(this.identificadores[i], "STRING", tabla.getNombre(), this.linea, this.col, valorInterpretado);
                        }
                        break;
                    default:
                        return new Errores("Semantico", "Asigancion de no valida", this.linea, this.col);
                }
            }
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
        cadena += nodo1 + "[label=\"DECLARACION\"];\n";
        cadena += nodo2 + "[label=\"TIPO\"];\n";
        cadena += nodo3 + "[label=\"LISTD\"];\n";
        cadena += nodo4 + "[label=\"DEC2\"];\n";

        cadena += anterior + "->" + nodo1 + ";\n";
        cadena += nodo1 + "->" + nodo2 + ";\n";
        cadena += nodo1 + "->" + nodo3 + ";\n";
        cadena += nodo1 + "->" + nodo4 + ";\n";

        switch (this.tipoDato.getTipo()) {
            case tipoDato.ENTERO:
                cadena += nodo5 + "[label=\"int\"];\n";
                cadena += nodo2 + "->" + nodo5 + ";\n";
                break;
            case tipoDato.DECIMAL:
                cadena += nodo5 + "[label=\"double\"];\n";
                cadena += nodo2 + "->" + nodo5 + ";\n";
                break;
            case tipoDato.BOOL:
                cadena += nodo5 + "[label=\"boolean\"];\n";
                cadena += nodo2 + "->" + nodo5 + ";\n";
                break;
            case tipoDato.CARACTER:
                cadena += nodo5 + "[label=\"char\"];\n";
                cadena += nodo2 + "->" + nodo5 + ";\n";
                break;
            case tipoDato.CADENA:
                cadena += nodo5 + "[label=\"string\"];\n";
                cadena += nodo2 + "->" + nodo5 + ";\n";
                break;
        }

        for (let i = 0; i < this.identificadores.length; i++) {
            if (i == 0) {
                let nodo6 = "n" + (numeroNodo.no + 1);
                let nodo7 = "n" + (numeroNodo.no + 2);
                numeroNodo.no += 2;

                cadena += nodo6 + "[label=\"ID\"];\n";
                cadena += nodo7 + "[label=\"" + this.identificadores[i] + "\"];\n";

                cadena += nodo3 + "->" + nodo6 + ";\n";
                cadena += nodo6 + "->" + nodo7 + ";\n";


            } else {
                let nodo6 = "n" + (numeroNodo.no + 1);
                let nodo7 = "n" + (numeroNodo.no + 2);
                let nodo8 = "n" + (numeroNodo.no + 3);
                numeroNodo.no += 3;

                cadena += nodo7 + "[label=\",\"];\n";
                cadena += nodo6 + "[label=\"ID\"];\n";
                cadena += nodo8 + "[label=\"" + this.identificadores[i] + "\"];\n";

                cadena += nodo3 + "->" + nodo7 + ";\n";
                cadena += nodo3 + "->" + nodo6 + ";\n";
                cadena += nodo6 + "->" + nodo8 + ";\n";
            }
        }

        if (!this.valor) {
            let nodo9 = "n" + (numeroNodo.no + 1);
            numeroNodo.no += 1;
            cadena += nodo9 + "[label=\";\"];\n";
            cadena += nodo4 + "->" + nodo9 + ";\n";
            return cadena;
        } else {
            let nodo9 = "n" + (numeroNodo.no + 1);
            let nodo10 = "n" + (numeroNodo.no + 2);
            let nodo11 = "n" + (numeroNodo.no + 3);
            numeroNodo.no += 3;

            cadena += nodo9 + "[label=\"=\"];\n";
            cadena += nodo10 + "[label=\"EXP\"];\n";
            cadena += nodo11 + "[label=\";\"];\n";

            cadena += nodo4 + "->" + nodo9 + ";\n";
            cadena += nodo4 + "->" + nodo10 + ";\n";
            cadena += nodo4 + "->" + nodo11 + ";\n";
            cadena += this.valor.generarDot(nodo10);
            return cadena;
        }
    }
}
