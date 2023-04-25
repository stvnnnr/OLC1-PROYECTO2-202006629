import { numeroNodo } from '../../indexController'
import { Instruccion } from '../abstracto/Instruccion'
import Errores from '../excepciones/Errores'
import Arbol from '../simbolo/Arbol'
import tablaSimbolo from '../simbolo/tablaSimbolos'
import Tipo, { tipoDato } from '../simbolo/Tipo'

export default class Casteo extends Instruccion {
    private expresion: Instruccion;

    constructor(expresion: Instruccion, tipo: Tipo, linea: number, col: number) {
        super(tipo, linea, col);
        this.expresion = expresion;
    }

    interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        let valor = this.expresion.interpretar(arbol, tabla);
        if (valor instanceof Errores) return valor;

        switch (this.tipoDato.getTipo()) {
            case tipoDato.ENTERO:
                switch (this.expresion.tipoDato.getTipo()) {
                    case tipoDato.DECIMAL:
                        return parseInt(valor);
                    case tipoDato.CARACTER:
                        let trans = valor + '';
                        let res = trans.charCodeAt(0);
                        return res;
                    default:
                        return new Errores("Semantico", "Casteo Invalido", this.linea, this.col);
                }
            case tipoDato.DECIMAL:
                switch (this.expresion.tipoDato.getTipo()) {
                    case tipoDato.ENTERO:
                        return parseFloat(valor);
                    case tipoDato.CARACTER:
                        let trans = valor + '';
                        let res = trans.charCodeAt(0);
                        return res;
                    default:
                        return new Errores("Semantico", "Casteo Invalido", this.linea, this.col);
                }
            case tipoDato.BOOL:
                return new Errores("Semantico", "Casteo Invalido", this.linea, this.col);
            case tipoDato.CARACTER:
                switch (this.expresion.tipoDato.getTipo()) {
                    case tipoDato.ENTERO:
                        return String.fromCharCode(parseInt(valor));
                    default:
                        return new Errores("Semantico", "Casteo Invalido", this.linea, this.col);
                }
            case tipoDato.CADENA:
                switch (this.expresion.tipoDato.getTipo()) {
                    case tipoDato.ENTERO:
                        return "" + valor;
                    case tipoDato.DECIMAL:
                        return "" + valor;
                    default:
                        return new Errores("Semantico", "Casteo Invalido", this.linea, this.col);
                }
            default:
                return new Errores("Semantico", "Tipo de dato invalido", this.linea, this.col);
        }
    }

    generarDot(anterior: string) {
        let cadena = "";
        let nodo1 = "n" + (numeroNodo.no + 1);
        let nodo2 = "n" + (numeroNodo.no + 2);
        let nodo3 = "n" + (numeroNodo.no + 3);
        let nodo4 = "n" + (numeroNodo.no + 4);
        let nodo5 = "n" + (numeroNodo.no + 5);
        let nodo6 = "n" + (numeroNodo.no + 6);
        numeroNodo.no += 6;
        cadena += nodo1 + "[label=\"(\"];\n";
        cadena += nodo2 + "[label=\"TIPO\"];\n";
        switch (this.tipoDato.getTipo()) {
            case tipoDato.ENTERO:
                cadena += nodo3 + "[label=\"int\"];\n";
                break;
            case tipoDato.DECIMAL:
                cadena += nodo3 + "[label=\"double\"];\n";
                break;
            case tipoDato.CARACTER:
                cadena += nodo3 + "[label=\"char\"];\n";
                break;
            case tipoDato.CADENA:
                cadena += nodo3 + "[label=\"string\"];\n";
                break;
        }
        cadena += nodo4 + "[label=\")\"];\n";
        cadena += nodo5 + "[label=\"EXP\"];\n";
        cadena += nodo6 + "[label=\";\"];\n";

        cadena += anterior + "->" + nodo1 + ";\n";
        cadena += anterior + "->" + nodo2 + ";\n";
        cadena += nodo2 + "->" + nodo3 + ";\n";
        cadena += anterior + "->" + nodo4 + ";\n";
        cadena += anterior + "->" + nodo5 + ";\n";
        cadena += anterior + "->" + nodo6 + ";\n";
        cadena += this.expresion.generarDot(nodo5);
        return cadena;

    }
}