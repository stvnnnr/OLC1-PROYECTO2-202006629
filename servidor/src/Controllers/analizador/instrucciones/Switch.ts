import { Instruccion } from '../abstracto/Instruccion'
import Errores from '../excepciones/Errores'
import Arbol from '../simbolo/Arbol'
import tablaSimbolo from '../simbolo/tablaSimbolos'
import Tipo, { tipoDato } from '../simbolo/Tipo'
import { listaErrores, numeroNodo } from '../../indexController'
import CaseDef from './CaseDef'
import BreakContinue, { Opcion } from './BreakContinue'
import Return from './Return'

export default class Switch extends Instruccion {
    private condicion: Instruccion;
    private cases: Instruccion[] | undefined;
    private def: Instruccion | undefined;

    constructor(cond: Instruccion, cases: Instruccion[] | undefined, linea: number, col: number, def?: Instruccion | undefined) {
        super(new Tipo(tipoDato.VOID), linea, col);
        this.condicion = cond;
        this.cases = cases;
        this.def = def;
    }

    interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        let cond = this.condicion.interpretar(arbol, tabla);
        if (cond instanceof Errores) return cond;
        let bandera = true;


        //Evaluando casa caso
        if (this.cases) {
            for (let i of this.cases) {
                let condCase = i.interpretar(arbol, tabla);
                if (condCase instanceof Errores) return condCase;

                if (i.tipoDato.getTipo() != this.condicion.tipoDato.getTipo()) return new Errores("Semantico", "Comparacion entre tipos de datos no iguales", this.linea, this.col);

                if (i instanceof CaseDef) {
                    if (condCase == cond) {
                        let listaInstrucciones = i.getExpresiones();
                        let NewTabla = new tablaSimbolo(tabla);
                        NewTabla.setNombre(tabla.getNombre() + "CASE " + condCase + "-")
                        for (let j of listaInstrucciones) {
                            let resultado = j.interpretar(arbol, NewTabla);
                            if (resultado instanceof Errores) listaErrores.push(resultado);
                            if (resultado instanceof Return) return resultado;
                            if (j instanceof BreakContinue) {
                                if (j.opcion == Opcion.BREAK) {
                                    bandera = false;
                                    break;
                                } else return new Errores("Semantico", "Sentencia continue no valida para switch", this.linea, this.col);
                            }
                        }
                    }

                } else return new Errores("Semantico", "Se esperaba un case", this.linea, this.col);
                if (bandera == false) { break };
            }
        }
        if (bandera==true && this.def instanceof CaseDef) {
            let listaInstrucciones = this.def.getExpresiones();
            let NewTabla = new tablaSimbolo(tabla);
            NewTabla.setNombre(tabla.getNombre() + "DEFAULT- ")
            for (let i of listaInstrucciones) {
                let resultado = i.interpretar(arbol, NewTabla);
                if (resultado instanceof Errores) listaErrores.push(resultado);
                if (resultado instanceof Return) return resultado;
                if (i instanceof BreakContinue) {
                    if (i.opcion == Opcion.BREAK) {
                        break;
                    } else return new Errores("Semantico", "Sentencia continue no valida para switch", this.linea, this.col);
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
        numeroNodo.no += 6;

        cadena += nodo1 + "[label=\"SSWITCH\"];\n";
        cadena += nodo2 + "[label=\"switch\"];\n";
        cadena += nodo3 + "[label=\"(\"];\n";
        cadena += nodo4 + "[label=\"EXP\"];\n";
        cadena += nodo5 + "[label=\")\"];\n";
        cadena += nodo6 + "[label=\"{\"];\n";

        cadena += anterior + "->" + nodo1 + ";\n";
        cadena += nodo1 + "->" + nodo2 + ";\n";
        cadena += nodo1 + "->" + nodo3 + ";\n";
        cadena += nodo1 + "->" + nodo4 + ";\n";
        cadena += nodo1 + "->" + nodo5 + ";\n";
        cadena += nodo1 + "->" + nodo6 + ";\n";


        if (this.cases) {
            let nodo7 = "n" + (numeroNodo.no + 1);
            numeroNodo.no += 1;

            cadena += nodo7 + "[label=\"LISTCASE\"];\n";
            cadena += nodo1 + "->" + nodo7 + ";\n";

            for (let i of this.cases) {
                if (!(i instanceof Errores)) cadena += i.generarDot(nodo7);
            }

            if (this.def) {
                cadena += this.def.generarDot(nodo1);
            }

        } else {
            if (this.def) {
                cadena += this.def.generarDot(nodo1);
            }
        }
        return cadena;
    }

}