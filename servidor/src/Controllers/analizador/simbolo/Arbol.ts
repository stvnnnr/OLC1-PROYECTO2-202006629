import tablaSimbolo from "./tablaSimbolos";
import { Instruccion } from "../abstracto/Instruccion";
import Errores from "../excepciones/Errores";
import RepSimbolos from "../reportes/RepSimbolo";
import Metodo from "../instrucciones/Metodo";
import Funcion from "../instrucciones/Funcion";

export default class Arbol {
    private instrucciones: Array<Instruccion>
    private funciones: Array<Instruccion>;
    private consola: string
    private tablaGlobal: tablaSimbolo
    private errores: Array<Errores>
    private simbolos: Array<RepSimbolos>;

    constructor(instrucciones: Array<Instruccion>) {
        this.instrucciones = instrucciones;
        this.funciones = new Array<Instruccion>();
        this.consola = "";
        this.tablaGlobal = new tablaSimbolo();
        this.errores = new Array<Errores>();
        this.simbolos = new Array<RepSimbolos>();
    }

    public getConsola(): string {
        return this.consola
    }

    public setConsola(console: string): void {
        this.consola = console
    }

    public Print(console: string): void {
        this.consola = `${this.consola}${console}`;
    }

    public Println(console: string): void {
        this.consola = `${this.consola}\n${console}`;
    }

    public getInstrucciones(): Array<Instruccion> {
        return this.instrucciones
    }

    public setInstrucciones(instrucciones: Array<Instruccion>): void {
        this.instrucciones = instrucciones
    }

    public getTablaGlobal(): tablaSimbolo {
        return this.tablaGlobal
    }

    public setTablaGlobal(tabla: tablaSimbolo) {
        this.tablaGlobal = tabla
    }

    public getErrores(): any {
        return this.errores
    }

    public getFunciones(): Array<Instruccion> {
        return this.funciones
    }

    public setFunciones(funciones: Array<Instruccion>): void {
        this.funciones = funciones;
    }

    public addFunciones(ins: Instruccion): void {
        this.funciones.push(ins)
    }

    public getFuncion(id: string) {
        id = id.toLowerCase();
        for (let i of this.getFunciones()) {
            if (i instanceof Metodo) {
                if (i.id == id) return i;
            }
            if (i instanceof Funcion) {
                if (i.id == id) return i;
            }
        }
        return null;
    }

    public addSimbolo(id: string, tipo: string, entorno: string, linea: number, col: number, val: any) {
        this.simbolos.push(new RepSimbolos(id, tipo, entorno, linea, col, val));
    }

    public updateSimbolo(id: string, entorno: string, val: any) {
        for (let i of this.simbolos) {
            if (i.id == id && i.entorno == entorno) {
                i.valor = val;
                break;
            }
        }
    }

    public getSimbolos() {
        return this.simbolos;
    }

}