import { Instruccion } from '../abstracto/Instruccion'
import Errores from '../excepciones/Errores'
import Arbol from '../simbolo/Arbol'
import tablaSimbolo from '../simbolo/tablaSimbolos'
import Tipo, { tipoDato } from '../simbolo/Tipo'
import { listaErrores, numeroNodo } from '../../indexController'
import BreakContinue from './BreakContinue'
import Return from './Return'

export default class If extends Instruccion {
    private condicion1: Instruccion;
    private InsIf: Instruccion[];
    private InsElse: Instruccion[] | Instruccion | undefined;

    constructor(cond1: Instruccion, ins1: Instruccion[], linea: number, col: number, ins2?: Instruccion[] | Instruccion) {
        super(new Tipo(tipoDato.VOID), linea, col);
        this.condicion1 = cond1;
        this.InsIf = ins1;
        this.InsElse = ins2;
    }

    interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        let cond1 = this.condicion1.interpretar(arbol, tabla);
        if (cond1 instanceof Errores) return cond1;
        if (this.condicion1.tipoDato.getTipo() != tipoDato.BOOL) return new Errores("Semantico", "La condicion debe de ser de tipo boolean", this.linea, this.col);

        if (!this.InsElse) {
            let NewTabla = new tablaSimbolo(tabla);
            NewTabla.setNombre(tabla.getNombre() + "IF-")
            if (cond1) {
                for (let i of this.InsIf) {
                    let resultado = i.interpretar(arbol, NewTabla);
                    if (resultado instanceof Errores) listaErrores.push(resultado);
                    if (i instanceof BreakContinue) return i;
                    if (resultado instanceof BreakContinue) return resultado;
                    if (resultado instanceof Return) return resultado;
                }
            }
        } else {
            let NewTabla1 = new tablaSimbolo(tabla);
            NewTabla1.setNombre(tabla.getNombre() + "IF-");

            if (cond1) {
                for (let i of this.InsIf) {
                    let resultado = i.interpretar(arbol, NewTabla1);
                    if (resultado instanceof Errores) listaErrores.push(resultado);
                    if (i instanceof BreakContinue) return i;
                    if (resultado instanceof Return) return resultado;
                }
            } else {
                if(this.InsElse){
                    if (!Array.isArray(this.InsElse)) {
                    let resultado = this.InsElse.interpretar(arbol, tabla);
                    if (resultado instanceof Errores) listaErrores.push(resultado);
                    if (resultado instanceof Return) return resultado;
                }
                else {
                    let NewTabla2 = new tablaSimbolo(tabla);
                    NewTabla2.setNombre(tabla.getNombre() + "ELSE-");
                    for (let i of this.InsElse) {
                        let resultado = i.interpretar(arbol, NewTabla1);
                        if (resultado instanceof Errores) listaErrores.push(resultado);
                        if (i instanceof BreakContinue) return i;
                        if (resultado instanceof BreakContinue) return resultado;
                        if (resultado instanceof Return) return resultado;
                    }
                }
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

        cadena += nodo1 + "[label=\"SIF\"];\n";
        cadena += nodo2 + "[label=\"if\"];\n";
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
        cadena += this.condicion1.generarDot(nodo4);
        for (let i of this.InsIf) {
            if (!(i instanceof Errores)) cadena += i.generarDot(nodo7);
        }

        if (!this.InsElse) {
            return cadena;
        } else if (!Array.isArray(this.InsElse)) {
            let nodo9 = "n" + (numeroNodo.no + 1);
            let nodo10 = "n" + (numeroNodo.no + 2);
            numeroNodo.no += 2;

            cadena += nodo9 + "[label=\"ELSE\"];\n";
            cadena += nodo10 + "[label=\"SIF\"];\n";


            cadena += nodo1 + "->" + nodo9 + ";\n";
            cadena += nodo1 + "->" + nodo10 + ";\n";

            cadena += this.InsElse.generarDot(nodo10);
            return cadena;
        } else {
            let nodo9 = "n" + (numeroNodo.no + 1);
            let nodo10 = "n" + (numeroNodo.no + 2);
            let nodo11 = "n" + (numeroNodo.no + 3);
            let nodo12 = "n" + (numeroNodo.no + 4);
            numeroNodo.no += 4;

            cadena += nodo9 + "[label=\"ELSE\"];\n";
            cadena += nodo10 + "[label=\"{\"];\n";
            cadena += nodo11 + "[label=\"INSTRUCCIONES\"];\n";
            cadena += nodo12 + "[label=\"}\"];\n";

            cadena += nodo1 + "->" + nodo9 + ";\n";
            cadena += nodo1 + "->" + nodo10 + ";\n";
            cadena += nodo1 + "->" + nodo11 + ";\n";
            cadena += nodo1 + "->" + nodo12 + ";\n";

            for (let i of this.InsElse) {
                if (!(i instanceof Errores)) cadena += i.generarDot(nodo11);
            }
            return cadena;
        }
    }
}

/*
si InsElse es undefined 
    significa que viene un if simple [IF(EXP){INS}]
Si InsElse no es undefined
    Si InsElse es no es Instancia de If
        Arreglo de Instrucciones en el else[]
    Si No
        instancia de IF
*/