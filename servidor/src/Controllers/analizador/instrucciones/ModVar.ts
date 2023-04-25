import { numeroNodo } from '../../indexController'
import { Instruccion } from '../abstracto/Instruccion'
import Errores from '../excepciones/Errores'
import Arbol from '../simbolo/Arbol'
import Simbolo from '../simbolo/simbolo'
import tablaSimbolo from '../simbolo/tablaSimbolos'
import Tipo, { tipoDato } from '../simbolo/Tipo'

export default class ModVar extends Instruccion {
    private id: string;
    private expresion: Instruccion;

    constructor(id: string, expresion: Instruccion, linea: number, col: number) {
        super(new Tipo(tipoDato.VOID), linea, col);
        this.id = id;
        this.expresion = expresion;
    }

    interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        let NewValor = this.expresion.interpretar(arbol, tabla);
        if (NewValor instanceof Errores) return NewValor;

        let valor = tabla.getVariable(this.id.toLowerCase());
        if (valor == null) return new Errores("Semantico", "Variable no existente ", this.linea, this.col);

        if (this.expresion.tipoDato.getTipo() != valor.getTipo().getTipo()) return new Errores("Semantico", "Tipo de dato no compartible en la asignacion", this.linea, this.col);
        this.tipoDato = valor.getTipo();
        valor.setValor(NewValor);
        arbol.updateSimbolo(this.id, tabla.getEntorno(this.id), "" + NewValor);
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

        cadena += nodo1 + "[label=\"MODVAR\"];\n";
        cadena += nodo2 + "[label=\"ID\"];\n";
        cadena += nodo3 + "[label=\"=\"];\n";
        cadena += nodo4 + "[label=\"EXP\"];\n";
        cadena += nodo5 + "[label=\";\"];\n";
        cadena += nodo6 + "[label=\"" + this.id + "\"];\n";

        cadena += anterior + "->" + nodo1 + ";\n";
        cadena += nodo1 + "->" + nodo2 + ";\n";
        cadena += nodo1 + "->" + nodo3 + ";\n";
        cadena += nodo1 + "->" + nodo4 + ";\n";
        cadena += nodo1 + "->" + nodo5 + ";\n";
        cadena += nodo2 + "->" + nodo6 + ";\n";
        cadena += this.expresion.generarDot(nodo4);
        return cadena;
    }
}