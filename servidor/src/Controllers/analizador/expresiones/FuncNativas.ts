import { numeroNodo } from "../../indexController";
import { Instruccion } from "../abstracto/Instruccion";
import Errores from "../excepciones/Errores";
import Arbol from "../simbolo/Arbol";
import Simbolo from "../simbolo/simbolo";
import tablaSimbolo from "../simbolo/tablaSimbolos";
import Tipo, { tipoDato } from "../simbolo/Tipo";
import AccesoVar from "./AccesoVar";

export default class FuncNativas extends Instruccion {
    private expresion: Instruccion;
    private funcion: Funciones;

    constructor(expresion: Instruccion, funcion: Funciones, linea: number, col: number) {
        super(new Tipo(tipoDato.VOID), linea, col);
        this.expresion = expresion;
        this.funcion = funcion;
    }

    interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        let verificacion = this.expresion.interpretar(arbol, tabla);
        if (verificacion instanceof Errores) return verificacion;
        switch (this.funcion) {
            case Funciones.TOCHARARRAY:
                return this.tochararray(verificacion);
            case Funciones.TOSTRING:
                return this.tostring(verificacion);
            case Funciones.TYPEOF:
                return this.typeoff(verificacion)
            case Funciones.LENGTH:
                return this.length(verificacion)
            case Funciones.ROUND:
                return this.roundd(verificacion)
            case Funciones.TOLOWER:
                return this.tolowerr(verificacion);
            case Funciones.TOUPPER:
                return this.toUpperr(verificacion);
            case Funciones.TRUNCATE:
                return this.truncatee(verificacion);
            default:
                return new Errores('Semantico', 'Funcion nativa no valida', this.linea, this.col);

        }
    }

    tochararray(verificacion: any) {
        if (this.expresion.tipoDato.getTipo() != tipoDato.CADENA) return new Errores('Semantico', 'Solo cadenas pueden convertirse en char array', this.linea, this.col);
        this.tipoDato.setTipo(tipoDato.CARACTER)
        return Array.from(verificacion);
    }

    tostring(verificacion: any) {
        if (this.expresion.tipoDato.getTipo() != tipoDato.ENTERO && this.expresion.tipoDato.getTipo() != tipoDato.DECIMAL && this.expresion.tipoDato.getTipo() != tipoDato.BOOL) return new Errores('Semantico', 'Tipo de dato no valido para funcion toString', this.linea, this.col);
        this.tipoDato.setTipo(tipoDato.CADENA);
        if (this.expresion.tipoDato.getTipo() == tipoDato.BOOL) {
            if (verificacion) return "true";
            return "false";
        } else {
            return "" + verificacion;
        }
    }

    typeoff(verificacion: any) {
        this.tipoDato.setTipo(tipoDato.CADENA);
        if (typeof verificacion == "object") return "vector"
        switch (this.expresion.tipoDato.getTipo()) {
            case tipoDato.ENTERO:
                return "int";
            case tipoDato.DECIMAL:
                return "double";
            case tipoDato.BOOL:
                return "boolean";
            case tipoDato.CARACTER:
                return "char";
            case tipoDato.CADENA:
                return "string";
            default:
                new Errores('Semantico', 'Tipo no valido en typeof', this.linea, this.col);
        }
    }

    length(verificacion: any) {
        this.tipoDato.setTipo(tipoDato.ENTERO);
        if (typeof verificacion == "object" || this.expresion.tipoDato.getTipo() == tipoDato.CADENA) return verificacion.length
    }

    roundd(verificacion: any) {
        if (this.expresion.tipoDato.getTipo() != tipoDato.DECIMAL) return new Errores('Semantico', 'Tipo de dato no valido para funcion round', this.linea, this.col);
        this.tipoDato.setTipo(tipoDato.ENTERO);
        return Math.round(verificacion);
    }

    tolowerr(verificacion: any) {
        if (this.expresion.tipoDato.getTipo() != tipoDato.CADENA) return new Errores('Semantico', 'Tipo de dato no valido para funcion toLower', this.linea, this.col);
        this.tipoDato.setTipo(tipoDato.CADENA);
        return verificacion.toLowerCase();
    }

    toUpperr(verificacion: any) {
        if (this.expresion.tipoDato.getTipo() != tipoDato.CADENA) return new Errores('Semantico', 'Tipo de dato no valido para funcion toUpper', this.linea, this.col);
        this.tipoDato.setTipo(tipoDato.CADENA);
        return verificacion.toUpperCase();
    }

    truncatee(verificacion: any) {
        if (this.expresion.tipoDato.getTipo() != tipoDato.DECIMAL) return new Errores('Semantico', 'Tipo de dato no valido para funcion truncate', this.linea, this.col);
        this.tipoDato.setTipo(tipoDato.ENTERO);
        return Math.trunc(verificacion);
    }

    generarDot(anterior: string) {
        let cadena = "";
        let nodo1 = "n" + (numeroNodo.no + 1);
        let nodo2 = "n" + (numeroNodo.no + 2);
        let nodo3 = "n" + (numeroNodo.no + 3);
        let nodo4 = "n" + (numeroNodo.no + 4);
        let nodo5 = "n" + (numeroNodo.no + 5)
        numeroNodo.no += 5;

        switch (this.funcion) {
            case Funciones.TOCHARARRAY:
                cadena += nodo1 + "[label=\"TOCHARARRAYY\"];\n";
                cadena += nodo2 + "[label=\"tochararray\"];\n";
                break;
            case Funciones.TOSTRING:
                cadena += nodo1 + "[label=\"TOSTRINGG\"];\n";
                cadena += nodo2 + "[label=\"tostring\"];\n";
                break;
            case Funciones.TYPEOF:
                cadena += nodo1 + "[label=\"TYPEOFF\"];\n";
                cadena += nodo2 + "[label=\"typeof\"];\n";
                break;
            case Funciones.LENGTH:
                cadena += nodo1 + "[label=\"LENGTHH\"];\n";
                cadena += nodo2 + "[label=\"length\"];\n";
                break;
            case Funciones.ROUND:
                cadena += nodo1 + "[label=\"ROUNDD\"];\n";
                cadena += nodo2 + "[label=\"round\"];\n";
                break;
            case Funciones.TOLOWER:
                cadena += nodo1 + "[label=\"TOLOW\"];\n";
                cadena += nodo2 + "[label=\"tolower\"];\n";
                break;
            case Funciones.TOUPPER:
                cadena += nodo1 + "[label=\"TOUP\"];\n";
                cadena += nodo2 + "[label=\"toupper\"];\n";
                break;
            case Funciones.TRUNCATE:
                cadena += nodo1 + "[label=\"TRUNC\"];\n";
                cadena += nodo2 + "[label=\"truncate\"];\n";
                break;
        }
        cadena += nodo3 + "[label=\"(\"];\n";
        cadena += nodo4 + "[label=\"EXP\"];\n";
        cadena += nodo5 + "[label=\")\"];\n";

        cadena += anterior + "->" + nodo1 + ";\n";
        cadena += nodo1 + "->" + nodo2 + ";\n";
        cadena += nodo1 + "->" + nodo3 + ";\n";
        cadena += nodo1 + "->" + nodo4 + ";\n";
        cadena += nodo1 + "->" + nodo5 + ";\n";
        cadena += this.expresion.generarDot(nodo4);
        return cadena;
    }

}

export enum Funciones {
    TOCHARARRAY,
    TOSTRING,
    TYPEOF,
    LENGTH,
    ROUND,
    TOLOWER,
    TOUPPER,
    TRUNCATE
}