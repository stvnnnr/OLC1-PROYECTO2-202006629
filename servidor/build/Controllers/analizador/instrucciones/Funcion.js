"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Instruccion_1 = require("../abstracto/Instruccion");
const Errores_1 = __importDefault(require("../excepciones/Errores"));
const Tipo_1 = require("../simbolo/Tipo");
const indexController_1 = require("../../indexController");
const Return_1 = __importDefault(require("./Return"));
class Funcion extends Instruccion_1.Instruccion {
    constructor(id, tipo, expresiones, linea, col, params) {
        super(tipo, linea, col);
        this.id = id;
        this.expresiones = expresiones;
        this.parametros = params;
    }
    interpretar(arbol, tabla) {
        for (let i of this.expresiones) {
            let resultado = i.interpretar(arbol, tabla);
            if (resultado instanceof Errores_1.default)
                return resultado;
            if (resultado instanceof Return_1.default) {
                if (resultado.value != null) {
                    if (this.tipoDato.getTipo() == resultado.tipoDato.getTipo())
                        return resultado.value;
                    else
                        return new Errores_1.default("Semantico", "Tipo de retorno y de funcion diferentes", this.linea, this.col);
                }
                else
                    return new Errores_1.default("Semantico", "Return invalido", this.linea, this.col);
            }
        }
    }
    generarDot(anterior) {
        let cadena = "";
        if (this.parametros.length > 0) {
            let nodo1 = "n" + (indexController_1.numeroNodo.no + 1);
            let nodo2 = "n" + (indexController_1.numeroNodo.no + 2);
            let nodo3 = "n" + (indexController_1.numeroNodo.no + 3);
            let nodo4 = "n" + (indexController_1.numeroNodo.no + 4);
            let nodo5 = "n" + (indexController_1.numeroNodo.no + 5);
            let nodo6 = "n" + (indexController_1.numeroNodo.no + 6);
            let nodo7 = "n" + (indexController_1.numeroNodo.no + 7);
            let nodo8 = "n" + (indexController_1.numeroNodo.no + 8);
            let nodo9 = "n" + (indexController_1.numeroNodo.no + 9);
            let nodo10 = "n" + (indexController_1.numeroNodo.no + 10);
            let nodo11 = "n" + (indexController_1.numeroNodo.no + 11);
            let nodo12 = "n" + (indexController_1.numeroNodo.no + 12);
            indexController_1.numeroNodo.no += 12;
            cadena += nodo1 + "[label=\"FUNCS\"];\n";
            cadena += nodo2 + "[label=\"ID\"];\n";
            cadena += nodo3 + "[label=\"(\"];\n";
            cadena += nodo4 + "[label=\"PARAMS\"];\n";
            cadena += nodo5 + "[label=\")\"];\n";
            cadena += nodo6 + "[label=\":\"];\n";
            cadena += nodo7 + "[label=\"TIPO\"];\n";
            cadena += nodo8 + "[label=\"{\"];\n";
            cadena += nodo9 + "[label=\"INSTRUCCIONES\"];\n";
            cadena += nodo10 + "[label=\"}\"];\n";
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
            cadena += nodo11 + "[label=\"" + this.id + "\"];\n";
            cadena += nodo2 + "->" + nodo11 + ";\n";
            //tipos
            switch (this.tipoDato.getTipo()) {
                case Tipo_1.tipoDato.ENTERO:
                    cadena += nodo12 + "[label=\"int\"];\n";
                    cadena += nodo7 + "->" + nodo12 + ";\n";
                    break;
                case Tipo_1.tipoDato.DECIMAL:
                    cadena += nodo12 + "[label=\"double\"];\n";
                    cadena += nodo7 + "->" + nodo12 + ";\n";
                    break;
                case Tipo_1.tipoDato.BOOL:
                    cadena += nodo12 + "[label=\"boolean\"];\n";
                    cadena += nodo7 + "->" + nodo12 + ";\n";
                    break;
                case Tipo_1.tipoDato.CARACTER:
                    cadena += nodo12 + "[label=\"char\"];\n";
                    cadena += nodo7 + "->" + nodo12 + ";\n";
                    break;
                case Tipo_1.tipoDato.CADENA:
                    cadena += nodo12 + "[label=\"string\"];\n";
                    cadena += nodo7 + "->" + nodo12 + ";\n";
                    break;
            }
            //parametros lista de json {tipo:__,id:__}
            let index = 0;
            for (let i of this.parametros) {
                if (index == 0) {
                    let nodo13 = "n" + (indexController_1.numeroNodo.no + 1);
                    let nodo14 = "n" + (indexController_1.numeroNodo.no + 2);
                    let nodo15 = "n" + (indexController_1.numeroNodo.no + 3);
                    let nodo16 = "n" + (indexController_1.numeroNodo.no + 4);
                    indexController_1.numeroNodo.no += 4;
                    cadena += nodo13 + "[label=\"TIPO\"];\n";
                    cadena += nodo14 + "[label=\"ID\"];\n";
                    cadena += nodo4 + "->" + nodo13 + ";\n";
                    cadena += nodo4 + "->" + nodo14 + ";\n";
                    switch (i.tipo.tipo) {
                        case Tipo_1.tipoDato.ENTERO:
                            cadena += nodo15 + "[label=\"int\"];\n";
                            cadena += nodo13 + "->" + nodo15 + ";\n";
                            break;
                        case Tipo_1.tipoDato.DECIMAL:
                            cadena += nodo15 + "[label=\"double\"];\n";
                            cadena += nodo13 + "->" + nodo15 + ";\n";
                            break;
                        case Tipo_1.tipoDato.BOOL:
                            cadena += nodo15 + "[label=\"boolean\"];\n";
                            cadena += nodo13 + "->" + nodo15 + ";\n";
                            break;
                        case Tipo_1.tipoDato.CARACTER:
                            cadena += nodo15 + "[label=\"char\"];\n";
                            cadena += nodo13 + "->" + nodo15 + ";\n";
                            break;
                        case Tipo_1.tipoDato.CADENA:
                            cadena += nodo15 + "[label=\"string\"];\n";
                            cadena += nodo13 + "->" + nodo15 + ";\n";
                            break;
                    }
                    cadena += nodo16 + "[label=\"" + i.id + "\"];\n";
                    cadena += nodo14 + "->" + nodo16 + ";\n";
                }
                else {
                    let nodo13 = "n" + (indexController_1.numeroNodo.no + 1);
                    let nodo14 = "n" + (indexController_1.numeroNodo.no + 2);
                    let nodo15 = "n" + (indexController_1.numeroNodo.no + 3);
                    let nodo16 = "n" + (indexController_1.numeroNodo.no + 4);
                    let nodo17 = "n" + (indexController_1.numeroNodo.no + 5);
                    indexController_1.numeroNodo.no += 5;
                    cadena += nodo17 + "[label=\",\"];\n";
                    cadena += nodo13 + "[label=\"TIPO\"];\n";
                    cadena += nodo14 + "[label=\"ID\"];\n";
                    cadena += nodo4 + "->" + nodo17 + ";\n";
                    cadena += nodo4 + "->" + nodo13 + ";\n";
                    cadena += nodo4 + "->" + nodo14 + ";\n";
                    switch (i.tipo.tipo) {
                        case Tipo_1.tipoDato.ENTERO:
                            cadena += nodo15 + "[label=\"int\"];\n";
                            cadena += nodo13 + "->" + nodo15 + ";\n";
                            break;
                        case Tipo_1.tipoDato.DECIMAL:
                            cadena += nodo15 + "[label=\"double\"];\n";
                            cadena += nodo13 + "->" + nodo15 + ";\n";
                            break;
                        case Tipo_1.tipoDato.BOOL:
                            cadena += nodo15 + "[label=\"boolean\"];\n";
                            cadena += nodo13 + "->" + nodo15 + ";\n";
                            break;
                        case Tipo_1.tipoDato.CARACTER:
                            cadena += nodo15 + "[label=\"char\"];\n";
                            cadena += nodo13 + "->" + nodo15 + ";\n";
                            break;
                        case Tipo_1.tipoDato.CADENA:
                            cadena += nodo15 + "[label=\"string\"];\n";
                            cadena += nodo13 + "->" + nodo15 + ";\n";
                            break;
                    }
                    cadena += nodo16 + "[label=\"" + i.id + "\"];\n";
                    cadena += nodo14 + "->" + nodo16 + ";\n";
                }
                index++;
            }
            //instrucciones
            for (let i of this.expresiones) {
                if (!(i instanceof Errores_1.default))
                    cadena += i.generarDot(nodo9);
            }
            return cadena;
        }
        else {
            let nodo1 = "n" + (indexController_1.numeroNodo.no + 1);
            let nodo2 = "n" + (indexController_1.numeroNodo.no + 2);
            let nodo3 = "n" + (indexController_1.numeroNodo.no + 3);
            let nodo4 = "n" + (indexController_1.numeroNodo.no + 4);
            let nodo5 = "n" + (indexController_1.numeroNodo.no + 5);
            let nodo6 = "n" + (indexController_1.numeroNodo.no + 6);
            let nodo7 = "n" + (indexController_1.numeroNodo.no + 7);
            let nodo8 = "n" + (indexController_1.numeroNodo.no + 8);
            let nodo9 = "n" + (indexController_1.numeroNodo.no + 9);
            let nodo10 = "n" + (indexController_1.numeroNodo.no + 10);
            let nodo11 = "n" + (indexController_1.numeroNodo.no + 11);
            let nodo12 = "n" + (indexController_1.numeroNodo.no + 12);
            indexController_1.numeroNodo.no += 12;
            cadena += nodo1 + "[label=\"FUNCS\"];\n";
            cadena += nodo2 + "[label=\"ID\"];\n";
            cadena += nodo3 + "[label=\"(\"];\n";
            ;
            cadena += nodo5 + "[label=\")\"];\n";
            cadena += nodo6 + "[label=\":\"];\n";
            cadena += nodo7 + "[label=\"TIPO\"];\n";
            cadena += nodo8 + "[label=\"{\"];\n";
            cadena += nodo9 + "[label=\"INSTRUCCIONES\"];\n";
            cadena += nodo10 + "[label=\"}\"];\n";
            cadena += anterior + "->" + nodo1 + ";\n";
            cadena += nodo1 + "->" + nodo2 + ";\n";
            cadena += nodo1 + "->" + nodo3 + ";\n";
            cadena += nodo1 + "->" + nodo5 + ";\n";
            cadena += nodo1 + "->" + nodo6 + ";\n";
            cadena += nodo1 + "->" + nodo7 + ";\n";
            cadena += nodo1 + "->" + nodo8 + ";\n";
            cadena += nodo1 + "->" + nodo9 + ";\n";
            cadena += nodo1 + "->" + nodo10 + ";\n";
            cadena += nodo11 + "[label=\"" + this.id + "\"];\n";
            cadena += nodo2 + "->" + nodo11 + ";\n";
            //tipos
            switch (this.tipoDato.getTipo()) {
                case Tipo_1.tipoDato.ENTERO:
                    cadena += nodo12 + "[label=\"int\"];\n";
                    cadena += nodo7 + "->" + nodo12 + ";\n";
                    break;
                case Tipo_1.tipoDato.DECIMAL:
                    cadena += nodo12 + "[label=\"double\"];\n";
                    cadena += nodo7 + "->" + nodo12 + ";\n";
                    break;
                case Tipo_1.tipoDato.BOOL:
                    cadena += nodo12 + "[label=\"boolean\"];\n";
                    cadena += nodo7 + "->" + nodo12 + ";\n";
                    break;
                case Tipo_1.tipoDato.CARACTER:
                    cadena += nodo12 + "[label=\"char\"];\n";
                    cadena += nodo7 + "->" + nodo12 + ";\n";
                    break;
                case Tipo_1.tipoDato.CADENA:
                    cadena += nodo12 + "[label=\"string\"];\n";
                    cadena += nodo7 + "->" + nodo12 + ";\n";
                    break;
            }
            //instrucciones
            for (let i of this.expresiones) {
                if (!(i instanceof Errores_1.default))
                    cadena += i.generarDot(nodo9);
            }
            return cadena;
        }
    }
}
exports.default = Funcion;
