import { numeroNodo } from '../../indexController'
import { Instruccion } from '../abstracto/Instruccion'
import Errores from '../excepciones/Errores'
import Arbol from '../simbolo/Arbol'
import tablaSimbolo from '../simbolo/tablaSimbolos'
import Tipo, { tipoDato } from '../simbolo/Tipo'

export default class Ternario extends Instruccion {
    private cond: Instruccion;
    private exp1: Instruccion;
    private exp2: Instruccion;

    constructor(cond: Instruccion, exp1: Instruccion, exp2: Instruccion, linea: number, col: number) {
        super(new Tipo(tipoDato.VOID), linea, col);
        this.cond = cond;
        this.exp1 = exp1;
        this.exp2 = exp2;
    }

    interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        let condicion = this.cond.interpretar(arbol, tabla);
        if (condicion instanceof Errores) return condicion;

        if (this.cond.tipoDato.getTipo() != tipoDato.BOOL) return new Errores("Semantico", "La condicion debe de ser de tipo boolean", this.linea, this.col);

        if (Boolean(condicion)) {
            let valor1 = this.exp1.interpretar(arbol, tabla);
            if (valor1 instanceof Errores) return valor1;
            this.tipoDato.setTipo(this.exp1.tipoDato.getTipo())
            return valor1;
        } else {
            let valor2 = this.exp2.interpretar(arbol, tabla);
            if (valor2 instanceof Errores) return valor2;
            this.tipoDato.setTipo(this.exp2.tipoDato.getTipo())
            return valor2;
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

        cadena += nodo1 + "[label=\"TERNAR\"];\n";
        cadena += nodo2 + "[label=\"EXP\"];\n";
        cadena += nodo3 + "[label=\"?\"];\n";
        cadena += nodo4 + "[label=\"EXP\"];\n";
        cadena += nodo5 + "[label=\":\"];\n";
        cadena += nodo6 + "[label=\"EXP\"];\n";

        cadena += anterior + "->" + nodo1 + ";\n";
        cadena += nodo1 + "->" + nodo2 + ";\n";
        cadena += nodo1 + "->" + nodo3 + ";\n";
        cadena += nodo1 + "->" + nodo4 + ";\n";
        cadena += nodo1 + "->" + nodo5 + ";\n";
        cadena += nodo1 + "->" + nodo6 + ";\n";

        cadena += this.cond.generarDot(nodo2);
        cadena += this.exp1.generarDot(nodo4);
        cadena += this.exp2.generarDot(nodo6);
        return cadena;
    }
}