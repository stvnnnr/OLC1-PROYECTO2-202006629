"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const indexController_1 = require("../../indexController");
const Instruccion_1 = require("../abstracto/Instruccion");
const Errores_1 = __importDefault(require("../excepciones/Errores"));
const Tipo_1 = require("../simbolo/Tipo");
class Casteo extends Instruccion_1.Instruccion {
    constructor(expresion, tipo, linea, col) {
        super(tipo, linea, col);
        this.expresion = expresion;
    }
    interpretar(arbol, tabla) {
        let valor = this.expresion.interpretar(arbol, tabla);
        if (valor instanceof Errores_1.default)
            return valor;
        switch (this.tipoDato.getTipo()) {
            case Tipo_1.tipoDato.ENTERO:
                switch (this.expresion.tipoDato.getTipo()) {
                    case Tipo_1.tipoDato.DECIMAL:
                        return parseInt(valor);
                    case Tipo_1.tipoDato.CARACTER:
                        let trans = valor + '';
                        let res = trans.charCodeAt(0);
                        return res;
                    default:
                        return new Errores_1.default("Semantico", "Casteo Invalido", this.linea, this.col);
                }
            case Tipo_1.tipoDato.DECIMAL:
                switch (this.expresion.tipoDato.getTipo()) {
                    case Tipo_1.tipoDato.ENTERO:
                        return parseFloat(valor);
                    case Tipo_1.tipoDato.CARACTER:
                        let trans = valor + '';
                        let res = trans.charCodeAt(0);
                        return res;
                    default:
                        return new Errores_1.default("Semantico", "Casteo Invalido", this.linea, this.col);
                }
            case Tipo_1.tipoDato.BOOL:
                return new Errores_1.default("Semantico", "Casteo Invalido", this.linea, this.col);
            case Tipo_1.tipoDato.CARACTER:
                switch (this.expresion.tipoDato.getTipo()) {
                    case Tipo_1.tipoDato.ENTERO:
                        return String.fromCharCode(parseInt(valor));
                    default:
                        return new Errores_1.default("Semantico", "Casteo Invalido", this.linea, this.col);
                }
            case Tipo_1.tipoDato.CADENA:
                switch (this.expresion.tipoDato.getTipo()) {
                    case Tipo_1.tipoDato.ENTERO:
                        return "" + valor;
                    case Tipo_1.tipoDato.DECIMAL:
                        return "" + valor;
                    default:
                        return new Errores_1.default("Semantico", "Casteo Invalido", this.linea, this.col);
                }
            default:
                return new Errores_1.default("Semantico", "Tipo de dato invalido", this.linea, this.col);
        }
    }
    generarDot(anterior) {
        let cadena = "";
        let nodo1 = "n" + (indexController_1.numeroNodo.no + 1);
        let nodo2 = "n" + (indexController_1.numeroNodo.no + 2);
        let nodo3 = "n" + (indexController_1.numeroNodo.no + 3);
        let nodo4 = "n" + (indexController_1.numeroNodo.no + 4);
        let nodo5 = "n" + (indexController_1.numeroNodo.no + 5);
        let nodo6 = "n" + (indexController_1.numeroNodo.no + 6);
        indexController_1.numeroNodo.no += 6;
        cadena += nodo1 + "[label=\"(\"];\n";
        cadena += nodo2 + "[label=\"TIPO\"];\n";
        switch (this.tipoDato.getTipo()) {
            case Tipo_1.tipoDato.ENTERO:
                cadena += nodo3 + "[label=\"int\"];\n";
                break;
            case Tipo_1.tipoDato.DECIMAL:
                cadena += nodo3 + "[label=\"double\"];\n";
                break;
            case Tipo_1.tipoDato.CARACTER:
                cadena += nodo3 + "[label=\"char\"];\n";
                break;
            case Tipo_1.tipoDato.CADENA:
                cadena += nodo3 + "[label=\"string\"];\n";
                break;
        }
        cadena += nodo4 + "[label=\")\"];\n";
        cadena += nodo5 + "[label=\"EXP\"];\n";
        cadena += nodo6 + "[label=\";\"];\n";
        cadena += anterior + "->" + nodo1 + ";\n";
        cadena += anterior + "->" + nodo2 + ";\n";
        cadena += nodo2 + "->" + nodo3 + ";\n";
        cadena += anterior + "->" + nodo4 + ";\n";
        cadena += anterior + "->" + nodo5 + ";\n";
        cadena += anterior + "->" + nodo6 + ";\n";
        cadena += this.expresion.generarDot(nodo5);
        return cadena;
    }
}
exports.default = Casteo;
