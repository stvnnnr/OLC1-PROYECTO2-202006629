import { Instruccion } from '../abstracto/Instruccion'
import Errores from '../excepciones/Errores'
import Arbol from '../simbolo/Arbol'
import tablaSimbolo from '../simbolo/tablaSimbolos'
import Tipo, { tipoDato } from '../simbolo/Tipo'
import { listaErrores, numeroNodo } from '../../indexController'
import BreakContinue, { Opcion } from './BreakContinue'

export default class For extends Instruccion {
    private variable: Instruccion;

    private condicion: Instruccion;
    private actualizacion: Instruccion;
    private expresiones: Instruccion[];

    constructor(variable: Instruccion, condicion: Instruccion, actualizacion: Instruccion, expresiones: Instruccion[], linea: number, col: number) {
        super(new Tipo(tipoDato.VOID), linea, col);
        this.variable = variable;
        this.condicion = condicion;
        this.actualizacion = actualizacion;
        this.expresiones = expresiones;
    }

    interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        let NewTabla = new tablaSimbolo(tabla);
        NewTabla.setNombre(tabla.getNombre() + "FOR-")
        let declaracion = this.variable.interpretar(arbol, NewTabla);
        if (declaracion instanceof Errores) return declaracion;

        let cond = this.condicion.interpretar(arbol, NewTabla);
        if (cond instanceof Errores) return cond;
        if (this.condicion.tipoDato.getTipo() != tipoDato.BOOL) return new Errores("Semantico", "La condicion debe de ser de tipo boolean", this.linea, this.col);

        while (this.condicion.interpretar(arbol, NewTabla)) {
            let NewTabla2 = new tablaSimbolo(NewTabla);
            NewTabla2.setNombre(NewTabla.getNombre() + "FOR_INSIDE-")
            let resultado;
            for (let i of this.expresiones) {
                resultado = i.interpretar(arbol, NewTabla2);
                if (resultado instanceof Errores) listaErrores.push(resultado);
                if (resultado instanceof BreakContinue) {
                    if (resultado.opcion == Opcion.BREAK) return;
                    if (resultado.opcion == Opcion.CONTINUE) break;
                }
                if (i instanceof BreakContinue) {
                    if (i.opcion == Opcion.BREAK) return;
                    if (i.opcion == Opcion.CONTINUE) break;
                }
            }

            let actualiza = this.actualizacion.interpretar(arbol, NewTabla);
            if (actualiza instanceof Errores) return actualiza;
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
        let nodo9 = "n" + (numeroNodo.no + 9);
        let nodo10 = "n" + (numeroNodo.no + 10);
        let nodo11 = "n" + (numeroNodo.no + 11);
        numeroNodo.no += 11;

        cadena += nodo1 + "[label=\"CFOR\"];\n";
        cadena += nodo2 + "[label=\"for\"];\n";
        cadena += nodo3 + "[label=\"(\"];\n";
        cadena += nodo4 + "[label=\"S_DEC_ASI\"];\n";
        cadena += nodo5 + "[label=\"EXP\"];\n";
        cadena += nodo6 + "[label=\";\"];\n";
        cadena += nodo7 + "[label=\"ACTUALIZACION\"];\n";
        cadena += nodo8 + "[label=\")\"];\n";
        cadena += nodo9 + "[label=\"{\"];\n";
        cadena += nodo10 + "[label=\"INSTRUCCIONES\"];\n";
        cadena += nodo11 + "[label=\"}\"];\n";

        cadena += anterior + "->" + nodo1 + ";\n";
        cadena += nodo1 + "->" + nodo2 + ";\n";
        cadena += nodo1 + "->" + nodo3 + ";\n";
        cadena += nodo1 + "->" + nodo4 + ";\n";
        cadena += nodo1 + "->" + nodo5 + ";\n";
        cadena += nodo1 + "->" + nodo6 + ";\n";
        cadena += nodo1 + "->" + nodo7 + ";\n";
        cadena += nodo1 + "->" + nodo8 + ";\n";
        cadena += nodo1 + "->" + nodo9 + ";\n";
        cadena += nodo1 + "->" + nodo10 + ";\n";
        cadena += nodo1 + "->" + nodo11 + ";\n";

        cadena += this.variable.generarDot(nodo4);
        cadena += this.condicion.generarDot(nodo5);
        cadena += this.actualizacion.generarDot(nodo7);

        for (let i of this.expresiones) {
            if (!(i instanceof Errores)) cadena += i.generarDot(nodo10);
        }
        return cadena;


    }
}
