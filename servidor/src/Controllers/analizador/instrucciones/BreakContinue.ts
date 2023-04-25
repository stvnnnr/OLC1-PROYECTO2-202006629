import { Instruccion } from '../abstracto/Instruccion'
import Errores from '../excepciones/Errores'
import Arbol from '../simbolo/Arbol'
import tablaSimbolo from '../simbolo/tablaSimbolos'
import Tipo, { tipoDato } from '../simbolo/Tipo'
import { listaErrores, numeroNodo } from '../../indexController'

export default class BreakContinue extends Instruccion {
    public opcion: Opcion
    constructor(option: Opcion, linea: number, col: number) {
        super(new Tipo(tipoDato.VOID), linea, col);
        this.opcion = option
    }

    interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        return;
    }

    generarDot(anterior: string) {
        let cadena = "";
        let nodo1 = "n" + (numeroNodo.no + 1);
        let nodo2 = "n" + (numeroNodo.no + 2);
        let nodo3 = "n" + (numeroNodo.no + 3);
        numeroNodo.no += 3;

        if (this.opcion == Opcion.BREAK) {
            cadena += nodo1 + "[label=\"TBREAK\"];\n";
            cadena += nodo2 + "[label=\"break\"];\n";
        } else {
            cadena += nodo1 + "[label=\"TCONTINUE\"];\n";
            cadena += nodo2 + "[label=\"continue\"];\n";
        }
        cadena += nodo3 + "[label=\";\"];\n"
        cadena += anterior + "->" + nodo1 + ";\n";
        cadena += nodo1 + "->" + nodo2 + ";\n";
        cadena += nodo1 + "->" + nodo3 + ";\n";
        return cadena;
    }
}

export enum Opcion {
    BREAK,
    CONTINUE
}