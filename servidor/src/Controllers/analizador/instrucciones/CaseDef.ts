import { Instruccion } from '../abstracto/Instruccion'
import Errores from '../excepciones/Errores'
import Arbol from '../simbolo/Arbol'
import tablaSimbolo from '../simbolo/tablaSimbolos'
import Tipo, { tipoDato } from '../simbolo/Tipo'
import { listaErrores, numeroNodo } from '../../indexController'

export default class CaseDef extends Instruccion {
    private def: boolean;
    private caso: Instruccion | undefined;
    private expresiones: Instruccion[];

    constructor(def: boolean, exp: Instruccion[], linea: number, col: number, cond?: Instruccion) {
        super(new Tipo(tipoDato.VOID), linea, col);
        this.caso = cond;
        this.expresiones = exp;
        this.def = def;
    }

    interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        if (this.caso) {
            let resultado = this.caso?.interpretar(arbol, tabla);
            this.tipoDato.setTipo(this.caso?.tipoDato.getTipo())
            return resultado
        }
    }

    public getExpresiones() {
        return this.expresiones;
    }

    generarDot(anterior: string) {
        let cadena = "";

        if (this.def) {
            let nodo1 = "n" + (numeroNodo.no + 1);
            let nodo2 = "n" + (numeroNodo.no + 2);
            let nodo3 = "n" + (numeroNodo.no + 3);
            let nodo4 = "n" + (numeroNodo.no + 4);
            numeroNodo.no += 4;

            cadena += nodo1 + "[label=\"SDEF\"];\n";
            cadena += nodo2 + "[label=\"default\"];\n";
            cadena += nodo3 + "[label=\":\"];\n";
            cadena += nodo4 + "[label=\"INSTRUCCIONES\"];\n";

            cadena += anterior + "->" + nodo1 + ";\n";
            cadena += nodo1 + "->" + nodo2 + ";\n";
            cadena += nodo1 + "->" + nodo3 + ";\n";
            cadena += nodo1 + "->" + nodo4 + ";\n";

            for (let i of this.expresiones) {
                if (!(i instanceof Errores)) {
                    cadena += i.generarDot(nodo4);
                }
            }
            return cadena;
        } else {
            let nodo1 = "n" + (numeroNodo.no + 1);
            let nodo2 = "n" + (numeroNodo.no + 2);
            let nodo3 = "n" + (numeroNodo.no + 3);
            let nodo4 = "n" + (numeroNodo.no + 4);
            let nodo5 = "n" + (numeroNodo.no + 5);
            numeroNodo.no += 5;

            cadena += nodo1 + "[label=\"SCASE\"];\n";
            cadena += nodo2 + "[label=\"case\"];\n";
            cadena += nodo3 + "[label=\"EXP\"];\n";
            cadena += nodo4 + "[label=\":\"];\n";
            cadena += nodo5 + "[label=\"INSTRUCCIONES\"];\n";

            cadena += anterior + "->" + nodo1 + ";\n";
            cadena += nodo1 + "->" + nodo2 + ";\n";
            cadena += nodo1 + "->" + nodo3 + ";\n";
            cadena += nodo1 + "->" + nodo4 + ";\n";
            cadena += nodo1 + "->" + nodo5 + ";\n";

            cadena += this.caso?.generarDot(nodo3);

            for (let i of this.expresiones) {
                if (!(i instanceof Errores)) {
                    cadena += i.generarDot(nodo5);
                }
            }
            return cadena;
        }
    }
}