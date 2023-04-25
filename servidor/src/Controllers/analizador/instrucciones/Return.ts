import { Instruccion } from '../abstracto/Instruccion'
import Errores from '../excepciones/Errores'
import Arbol from '../simbolo/Arbol'
import tablaSimbolo from '../simbolo/tablaSimbolos'
import Tipo, { tipoDato } from '../simbolo/Tipo'
import { listaErrores, numeroNodo } from '../../indexController'
import BreakContinue, { Opcion } from './BreakContinue'

export default class Return extends Instruccion {
    public valor: Instruccion | undefined;
    public value = null;

    constructor(linea: number, col: number, valor?: Instruccion) {
        super(new Tipo(tipoDato.VOID), linea, col);
        this.valor = valor;
    }

    interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        if (this.valor) {
            this.value = this.valor.interpretar(arbol, tabla);
            this.tipoDato = this.valor.tipoDato;
        }
        return this;
    }

    generarDot(anterior: string) {
        let cadena = "";
        if (this.tipoDato.getTipo() == tipoDato.VOID) {
            let nodo1 = "n" + (numeroNodo.no + 1);
            let nodo2 = "n" + (numeroNodo.no + 2);
            let nodo3 = "n" + (numeroNodo.no + 3);
            numeroNodo.no += 3;
            cadena += nodo1 + "[label=\"TRETURN\"];\n";
            cadena += nodo2 + "[label=\"return\"];\n";
            cadena += nodo3 + "[label=\";\"];\n";

            cadena += anterior + "->" + nodo1 + ";\n";
            cadena += nodo1 + "->" + nodo2 + ";\n";
            cadena += nodo1 + "->" + nodo3 + ";\n";
            return cadena;
        } else {
            let nodo1 = "n" + (numeroNodo.no + 1);
            let nodo2 = "n" + (numeroNodo.no + 2);
            let nodo3 = "n" + (numeroNodo.no + 3);
            let nodo4 = "n" + (numeroNodo.no + 4);
            numeroNodo.no += 4;

            cadena += nodo1 + "[label=\"TRETURN\"];\n";
            cadena += nodo2 + "[label=\"return\"];\n";
            cadena += nodo3 + "[label=\"EXP\"];\n";
            cadena += nodo4 + "[label=\";\"];\n";

            cadena += anterior + "->" + nodo1 + ";\n";
            cadena += nodo1 + "->" + nodo2 + ";\n";
            cadena += nodo1 + "->" + nodo3 + ";\n";
            cadena += nodo1 + "->" + nodo4 + ";\n";
            cadena += this.valor?.generarDot(nodo3);

            return cadena;
        }
    }

}