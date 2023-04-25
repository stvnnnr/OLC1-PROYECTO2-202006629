import { Instruccion } from '../abstracto/Instruccion'
import Errores from '../excepciones/Errores'
import Arbol from '../simbolo/Arbol'
import tablaSimbolo from '../simbolo/tablaSimbolos'
import Tipo, { tipoDato } from '../simbolo/Tipo'
import { listaErrores, numeroNodo } from '../../indexController'
import BreakContinue, { Opcion } from './BreakContinue'
import Return from './Return'

export default class While extends Instruccion {
    private condicion: Instruccion;
    private expresiones: Instruccion[];

    constructor(condicion: Instruccion, expresion: Instruccion[], linea: number, col: number) {
        super(new Tipo(tipoDato.VOID), linea, col);
        this.condicion = condicion;
        this.expresiones = expresion;
    }

    interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        let cond1 = this.condicion.interpretar(arbol, tabla);
        if (cond1 instanceof Errores) return cond1;

        if (this.condicion.tipoDato.getTipo() != tipoDato.BOOL) return new Errores("Semantico", "La condicion debe de ser de tipo boolean", this.linea, this.col);


        while (this.condicion.interpretar(arbol, tabla)) {
            let NewTabla = new tablaSimbolo(tabla);
            NewTabla.setNombre(tabla.getNombre() + "WHILE-")
            let resultado;
            for (let i of this.expresiones) {
                resultado = i.interpretar(arbol, NewTabla);
                if (resultado instanceof Errores) listaErrores.push(resultado);
                if (resultado instanceof Return) return resultado;
                if (resultado instanceof BreakContinue) {
                    if (resultado.opcion == Opcion.BREAK) return;
                    if (resultado.opcion == Opcion.CONTINUE) break;
                }
                if (i instanceof BreakContinue) {
                    if (i.opcion == Opcion.BREAK) return;
                    if (i.opcion == Opcion.CONTINUE) break;
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
        let nodo6 = "n" + (numeroNodo.no + 6);
        let nodo7 = "n" + (numeroNodo.no + 7);
        let nodo8 = "n" + (numeroNodo.no + 8);
        numeroNodo.no += 8;

        cadena += nodo1 + "[label=\"CWHILE\"];\n";
        cadena += nodo2 + "[label=\"while\"];\n";
        cadena += nodo3 + "[label=\"(\"];\n";
        cadena += nodo4 + "[label=\"EXP\"];\n";
        cadena += nodo5 + "[label=\")\"];\n";
        cadena += nodo6 + "[label=\"{\"];\n";
        cadena += nodo7 + "[label=\"INSTRUCCIONES\"];\n";
        cadena += nodo8 + "[label=\"}\"];\n";

        cadena += anterior + "->" + nodo1 + ";\n";
        cadena += nodo1 + "->" + nodo2 + ";\n";
        cadena += nodo1 + "->" + nodo3 + ";\n";
        cadena += nodo1 + "->" + nodo4 + ";\n";
        cadena += nodo1 + "->" + nodo5 + ";\n";
        cadena += nodo1 + "->" + nodo6 + ";\n";
        cadena += nodo1 + "->" + nodo7 + ";\n";
        cadena += nodo1 + "->" + nodo8 + ";\n";

        cadena += this.condicion.generarDot(nodo4);

        for (let i of this.expresiones) {
            if (!(i instanceof Errores)) cadena += i.generarDot(nodo7);
        }
        return cadena;
    }
}