"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Operadores = void 0;
const indexController_1 = require("../../indexController");
const Instruccion_1 = require("../abstracto/Instruccion");
const Errores_1 = __importDefault(require("../excepciones/Errores"));
const Tipo_1 = __importStar(require("../simbolo/Tipo"));
class Aritmeticas extends Instruccion_1.Instruccion {
    constructor(operador, fila, col, op1, op2) {
        super(new Tipo_1.default(Tipo_1.tipoDato.ENTERO), fila, col);
        this.operacion = operador;
        if (!op2)
            this.opU = op1;
        else {
            this.op1 = op1;
            this.op2 = op2;
        }
    }
    interpretar(arbol, tabla) {
        var _a, _b;
        let opIzq, opDer, Unico = null;
        if (this.opU != null) {
            Unico = this.opU.interpretar(arbol, tabla);
            if (Unico instanceof Errores_1.default)
                return Unico;
        }
        else {
            opIzq = (_a = this.op1) === null || _a === void 0 ? void 0 : _a.interpretar(arbol, tabla);
            if (opIzq instanceof Errores_1.default)
                return opIzq;
            opDer = (_b = this.op2) === null || _b === void 0 ? void 0 : _b.interpretar(arbol, tabla);
            if (opDer instanceof Errores_1.default)
                return opDer;
        }
        switch (this.operacion) {
            case Operadores.SUMA:
                return this.suma(opIzq, opDer);
            case Operadores.RESTA:
                return this.resta(opIzq, opDer);
            case Operadores.MULT:
                return this.multi(opIzq, opDer);
            case Operadores.DIV:
                return this.div(opIzq, opDer);
            case Operadores.MOD:
                return this.modul(opIzq, opDer);
            case Operadores.POW:
                return this.pow(opIzq, opDer);
            case Operadores.NEG:
                return this.neg(Unico);
            default:
                return new Errores_1.default('Semantico', 'Operador Aritmetico Invalido', this.linea, this.col);
        }
    }
    suma(op1, op2) {
        var _a, _b;
        let operando1 = (_a = this.op1) === null || _a === void 0 ? void 0 : _a.tipoDato.getTipo();
        let operando2 = (_b = this.op2) === null || _b === void 0 ? void 0 : _b.tipoDato.getTipo();
        switch (operando1) {
            case Tipo_1.tipoDato.ENTERO:
                switch (operando2) {
                    case Tipo_1.tipoDato.ENTERO:
                        this.tipoDato = new Tipo_1.default(Tipo_1.tipoDato.ENTERO);
                        return parseInt(op1) + parseInt(op2);
                    case Tipo_1.tipoDato.DECIMAL:
                        this.tipoDato = new Tipo_1.default(Tipo_1.tipoDato.DECIMAL);
                        return parseFloat(op1) + parseFloat(op2);
                    case Tipo_1.tipoDato.BOOL:
                        this.tipoDato = new Tipo_1.default(Tipo_1.tipoDato.ENTERO);
                        return op2 ? parseInt(op1) + 1 : parseInt(op1);
                    case Tipo_1.tipoDato.CARACTER:
                        this.tipoDato = new Tipo_1.default(Tipo_1.tipoDato.ENTERO);
                        let trans = op2 + '';
                        let res = trans.charCodeAt(0);
                        return parseInt(op1) + res;
                    case Tipo_1.tipoDato.CADENA:
                        this.tipoDato = new Tipo_1.default(Tipo_1.tipoDato.CADENA);
                        return op1 + '' + op2;
                    default:
                        return new Errores_1.default('Semantico', 'Tipo Dato Invalido', this.linea, this.col);
                }
            case Tipo_1.tipoDato.DECIMAL:
                switch (operando2) {
                    case Tipo_1.tipoDato.ENTERO:
                        this.tipoDato = new Tipo_1.default(Tipo_1.tipoDato.DECIMAL);
                        return parseFloat(op1) + parseFloat(op2);
                    case Tipo_1.tipoDato.DECIMAL:
                        this.tipoDato = new Tipo_1.default(Tipo_1.tipoDato.DECIMAL);
                        return parseFloat(op1) + parseFloat(op2);
                    case Tipo_1.tipoDato.BOOL:
                        this.tipoDato = new Tipo_1.default(Tipo_1.tipoDato.DECIMAL);
                        return op2 ? parseFloat(op1) + 1 : parseFloat(op1);
                    case Tipo_1.tipoDato.CARACTER:
                        this.tipoDato = new Tipo_1.default(Tipo_1.tipoDato.DECIMAL);
                        let trans = op2 + '';
                        let res = trans.charCodeAt(0);
                        return parseFloat(op1) + res;
                    case Tipo_1.tipoDato.CADENA:
                        this.tipoDato = new Tipo_1.default(Tipo_1.tipoDato.CADENA);
                        return op1 + '' + op2;
                    default:
                        return new Errores_1.default('Semantico', 'Tipo Dato Invalido', this.linea, this.col);
                }
            case Tipo_1.tipoDato.BOOL:
                switch (operando2) {
                    case Tipo_1.tipoDato.ENTERO:
                        this.tipoDato = new Tipo_1.default(Tipo_1.tipoDato.ENTERO);
                        return op2 ? parseInt(op2) + 1 : parseInt(op2);
                    case Tipo_1.tipoDato.DECIMAL:
                        this.tipoDato = new Tipo_1.default(Tipo_1.tipoDato.DECIMAL);
                        return op2 ? parseFloat(op2) + 1 : parseFloat(op2);
                    case Tipo_1.tipoDato.BOOL:
                        return new Errores_1.default('Semantico', 'La suma Boolean + Boolean no es permitida', this.linea, this.col);
                    case Tipo_1.tipoDato.CARACTER:
                        return new Errores_1.default('Semantico', 'La suma Boolean + Caracter no es permitida', this.linea, this.col);
                    case Tipo_1.tipoDato.CADENA:
                        this.tipoDato = new Tipo_1.default(Tipo_1.tipoDato.CADENA);
                        return op1 + '' + op2;
                    default:
                        return new Errores_1.default('Semantico', 'Tipo Dato Invalido', this.linea, this.col);
                }
            case Tipo_1.tipoDato.CARACTER:
                switch (operando2) {
                    case Tipo_1.tipoDato.ENTERO:
                        this.tipoDato = new Tipo_1.default(Tipo_1.tipoDato.ENTERO);
                        let trans = op1 + '';
                        let res = trans.charCodeAt(0);
                        return parseInt(op2) + res;
                    case Tipo_1.tipoDato.DECIMAL:
                        this.tipoDato = new Tipo_1.default(Tipo_1.tipoDato.DECIMAL);
                        let trans2 = op1 + '';
                        let res2 = trans2.charCodeAt(0);
                        return parseFloat(op2) + res2;
                    case Tipo_1.tipoDato.BOOL:
                        return new Errores_1.default('Semantico', 'La suma Caracter + Boolean no es permitida', this.linea, this.col);
                    case Tipo_1.tipoDato.CARACTER:
                        this.tipoDato = new Tipo_1.default(Tipo_1.tipoDato.CADENA);
                        return op1 + '' + op2;
                    case Tipo_1.tipoDato.CADENA:
                        this.tipoDato = new Tipo_1.default(Tipo_1.tipoDato.CADENA);
                        return op1 + '' + op2;
                    default:
                        return new Errores_1.default('Semantico', 'Tipo Dato Invalido', this.linea, this.col);
                }
            case Tipo_1.tipoDato.CADENA:
                switch (operando2) {
                    case Tipo_1.tipoDato.ENTERO:
                        this.tipoDato = new Tipo_1.default(Tipo_1.tipoDato.CADENA);
                        return op1 + '' + op2;
                    case Tipo_1.tipoDato.DECIMAL:
                        this.tipoDato = new Tipo_1.default(Tipo_1.tipoDato.CADENA);
                        return op1 + '' + op2;
                    case Tipo_1.tipoDato.BOOL:
                        this.tipoDato = new Tipo_1.default(Tipo_1.tipoDato.CADENA);
                        return op1 + '' + op2;
                    case Tipo_1.tipoDato.CARACTER:
                        this.tipoDato = new Tipo_1.default(Tipo_1.tipoDato.CADENA);
                        return op1 + '' + op2;
                    case Tipo_1.tipoDato.CADENA:
                        this.tipoDato = new Tipo_1.default(Tipo_1.tipoDato.CADENA);
                        return op1 + '' + op2;
                    default:
                        return new Errores_1.default('Semantico', 'Tipo Dato Invalido', this.linea, this.col);
                }
            default:
                return new Errores_1.default('Semantico', 'Tipo Dato Invalido', this.linea, this.col);
        }
    }
    resta(op1, op2) {
        var _a, _b;
        let operando1 = (_a = this.op1) === null || _a === void 0 ? void 0 : _a.tipoDato.getTipo();
        let operando2 = (_b = this.op2) === null || _b === void 0 ? void 0 : _b.tipoDato.getTipo();
        switch (operando1) {
            case Tipo_1.tipoDato.ENTERO:
                switch (operando2) {
                    case Tipo_1.tipoDato.ENTERO:
                        this.tipoDato = new Tipo_1.default(Tipo_1.tipoDato.ENTERO);
                        return parseInt(op1) - parseInt(op2);
                    case Tipo_1.tipoDato.DECIMAL:
                        this.tipoDato = new Tipo_1.default(Tipo_1.tipoDato.DECIMAL);
                        return parseFloat(op1) - parseFloat(op2);
                    case Tipo_1.tipoDato.BOOL:
                        this.tipoDato = new Tipo_1.default(Tipo_1.tipoDato.ENTERO);
                        return op2 ? parseInt(op1) - 1 : parseInt(op1);
                    case Tipo_1.tipoDato.CARACTER:
                        this.tipoDato = new Tipo_1.default(Tipo_1.tipoDato.ENTERO);
                        let trans = op2 + '';
                        let res = trans.charCodeAt(0);
                        return parseInt(op1) - res;
                    case Tipo_1.tipoDato.CADENA:
                        return new Errores_1.default('Semantico', 'La resta Entero - Cadena no es permitida', this.linea, this.col);
                    default:
                        return new Errores_1.default('Semantico', 'Tipo Dato Invalido', this.linea, this.col);
                }
            case Tipo_1.tipoDato.DECIMAL:
                switch (operando2) {
                    case Tipo_1.tipoDato.ENTERO:
                        this.tipoDato = new Tipo_1.default(Tipo_1.tipoDato.DECIMAL);
                        return parseFloat(op1) - parseFloat(op2);
                    case Tipo_1.tipoDato.DECIMAL:
                        this.tipoDato = new Tipo_1.default(Tipo_1.tipoDato.DECIMAL);
                        return parseFloat(op1) - parseFloat(op2);
                    case Tipo_1.tipoDato.BOOL:
                        this.tipoDato = new Tipo_1.default(Tipo_1.tipoDato.DECIMAL);
                        return op2 ? parseFloat(op1) - 1 : parseFloat(op1);
                    case Tipo_1.tipoDato.CARACTER:
                        this.tipoDato = new Tipo_1.default(Tipo_1.tipoDato.DECIMAL);
                        let trans = op2 + '';
                        let res = trans.charCodeAt(0);
                        return parseFloat(op1) - res;
                    case Tipo_1.tipoDato.CADENA:
                        return new Errores_1.default('Semantico', 'La resta Double - Cadena no es permitida', this.linea, this.col);
                    default:
                        return new Errores_1.default('Semantico', 'Tipo Dato Invalido', this.linea, this.col);
                }
            case Tipo_1.tipoDato.BOOL:
                switch (operando2) {
                    case Tipo_1.tipoDato.ENTERO:
                        this.tipoDato = new Tipo_1.default(Tipo_1.tipoDato.ENTERO);
                        return op2 ? parseInt(op2) - 1 : parseInt(op2);
                    case Tipo_1.tipoDato.DECIMAL:
                        this.tipoDato = new Tipo_1.default(Tipo_1.tipoDato.DECIMAL);
                        return op2 ? parseFloat(op2) - 1 : parseFloat(op2);
                    case Tipo_1.tipoDato.BOOL:
                        return new Errores_1.default('Semantico', 'La resta Boolean - Boolean no es permitida', this.linea, this.col);
                    case Tipo_1.tipoDato.CARACTER:
                        return new Errores_1.default('Semantico', 'La resta Boolean - Caracter no es permitida', this.linea, this.col);
                    case Tipo_1.tipoDato.CADENA:
                        return new Errores_1.default('Semantico', 'La resta Boolean - Cadena no es permitida', this.linea, this.col);
                    default:
                        return new Errores_1.default('Semantico', 'Tipo Dato Invalido', this.linea, this.col);
                }
            case Tipo_1.tipoDato.CARACTER:
                switch (operando2) {
                    case Tipo_1.tipoDato.ENTERO:
                        this.tipoDato = new Tipo_1.default(Tipo_1.tipoDato.ENTERO);
                        let trans = op1 + '';
                        let res = trans.charCodeAt(0);
                        return res - parseInt(op2);
                    case Tipo_1.tipoDato.DECIMAL:
                        this.tipoDato = new Tipo_1.default(Tipo_1.tipoDato.DECIMAL);
                        let trans2 = op1 + '';
                        let res2 = trans2.charCodeAt(0);
                        return res2 - parseFloat(op2);
                    case Tipo_1.tipoDato.BOOL:
                        return new Errores_1.default('Semantico', 'La resta Caracter - Boolean no es permitida', this.linea, this.col);
                    case Tipo_1.tipoDato.CARACTER:
                        return new Errores_1.default('Semantico', 'La resta Caracter - Caracter no es permitida', this.linea, this.col);
                    case Tipo_1.tipoDato.CADENA:
                        return new Errores_1.default('Semantico', 'La resta Caracter - Cadena no es permitida', this.linea, this.col);
                    default:
                        return new Errores_1.default('Semantico', 'Tipo Dato Invalido', this.linea, this.col);
                }
            case Tipo_1.tipoDato.CADENA:
                switch (operando2) {
                    case Tipo_1.tipoDato.ENTERO:
                        return new Errores_1.default('Semantico', 'La resta Cadena - Entero no es permitida', this.linea, this.col);
                    case Tipo_1.tipoDato.DECIMAL:
                        return new Errores_1.default('Semantico', 'La resta Cadena - Decimal no es permitida', this.linea, this.col);
                    case Tipo_1.tipoDato.BOOL:
                        return new Errores_1.default('Semantico', 'La resta Cadena - Boolean no es permitida', this.linea, this.col);
                    case Tipo_1.tipoDato.CARACTER:
                        return new Errores_1.default('Semantico', 'La resta Cadena - Caracter no es permitida', this.linea, this.col);
                    case Tipo_1.tipoDato.CADENA:
                        return new Errores_1.default('Semantico', 'La resta Cadena - Cadena no es permitida', this.linea, this.col);
                    default:
                        return new Errores_1.default('Semantico', 'Tipo Dato Invalido', this.linea, this.col);
                }
            default:
                return new Errores_1.default('Semantico', 'Tipo Dato Invalido', this.linea, this.col);
        }
    }
    multi(op1, op2) {
        var _a, _b;
        let operando1 = (_a = this.op1) === null || _a === void 0 ? void 0 : _a.tipoDato.getTipo();
        let operando2 = (_b = this.op2) === null || _b === void 0 ? void 0 : _b.tipoDato.getTipo();
        switch (operando1) {
            case Tipo_1.tipoDato.ENTERO:
                switch (operando2) {
                    case Tipo_1.tipoDato.ENTERO:
                        this.tipoDato = new Tipo_1.default(Tipo_1.tipoDato.ENTERO);
                        return parseInt(op1) * parseInt(op2);
                    case Tipo_1.tipoDato.DECIMAL:
                        this.tipoDato = new Tipo_1.default(Tipo_1.tipoDato.DECIMAL);
                        return parseFloat(op1) * parseFloat(op2);
                    case Tipo_1.tipoDato.BOOL:
                        return new Errores_1.default('Semantico', 'La multiplicacion Entero * Boolean no es permitida', this.linea, this.col);
                    case Tipo_1.tipoDato.CARACTER:
                        this.tipoDato = new Tipo_1.default(Tipo_1.tipoDato.ENTERO);
                        let trans = op2 + '';
                        let res = trans.charCodeAt(0);
                        return parseInt(op1) * res;
                    case Tipo_1.tipoDato.CADENA:
                        return new Errores_1.default('Semantico', 'La multiplicacion Entero * Cadena no es permitida', this.linea, this.col);
                    default:
                        return new Errores_1.default('Semantico', 'Tipo Dato Invalido', this.linea, this.col);
                }
            case Tipo_1.tipoDato.DECIMAL:
                switch (operando2) {
                    case Tipo_1.tipoDato.ENTERO:
                        this.tipoDato = new Tipo_1.default(Tipo_1.tipoDato.DECIMAL);
                        return parseFloat(op1) * parseFloat(op2);
                    case Tipo_1.tipoDato.DECIMAL:
                        this.tipoDato = new Tipo_1.default(Tipo_1.tipoDato.DECIMAL);
                        return parseFloat(op1) * parseFloat(op2);
                    case Tipo_1.tipoDato.BOOL:
                        return new Errores_1.default('Semantico', 'La multiplicacion Double * Boolean no es permitida', this.linea, this.col);
                    case Tipo_1.tipoDato.CARACTER:
                        this.tipoDato = new Tipo_1.default(Tipo_1.tipoDato.DECIMAL);
                        let trans = op2 + '';
                        let res = trans.charCodeAt(0);
                        return parseFloat(op1) * res;
                    case Tipo_1.tipoDato.CADENA:
                        return new Errores_1.default('Semantico', 'La multiplicacion Double * Cadena no es permitida', this.linea, this.col);
                    default:
                        return new Errores_1.default('Semantico', 'Tipo Dato Invalido', this.linea, this.col);
                }
            case Tipo_1.tipoDato.BOOL:
                switch (operando2) {
                    case Tipo_1.tipoDato.ENTERO:
                        return new Errores_1.default('Semantico', 'La multiplicacion Boolean * Entero no es permitida', this.linea, this.col);
                    case Tipo_1.tipoDato.DECIMAL:
                        return new Errores_1.default('Semantico', 'La multiplicacion Boolean * Double no es permitida', this.linea, this.col);
                    case Tipo_1.tipoDato.BOOL:
                        return new Errores_1.default('Semantico', 'La multiplicacion Boolean * Boolean no es permitida', this.linea, this.col);
                    case Tipo_1.tipoDato.CARACTER:
                        return new Errores_1.default('Semantico', 'La multiplicacion Boolean * Caracter no es permitida', this.linea, this.col);
                    case Tipo_1.tipoDato.CADENA:
                        return new Errores_1.default('Semantico', 'La multiplicacion Boolean * Cadena no es permitida', this.linea, this.col);
                    default:
                        return new Errores_1.default('Semantico', 'Tipo Dato Invalido', this.linea, this.col);
                }
            case Tipo_1.tipoDato.CARACTER:
                switch (operando2) {
                    case Tipo_1.tipoDato.ENTERO:
                        this.tipoDato = new Tipo_1.default(Tipo_1.tipoDato.ENTERO);
                        let trans = op1 + '';
                        let res = trans.charCodeAt(0);
                        return parseInt(op2) * res;
                    case Tipo_1.tipoDato.DECIMAL:
                        this.tipoDato = new Tipo_1.default(Tipo_1.tipoDato.DECIMAL);
                        let trans2 = op1 + '';
                        let res2 = trans2.charCodeAt(0);
                        return parseFloat(op2) * res2;
                    case Tipo_1.tipoDato.BOOL:
                        return new Errores_1.default('Semantico', 'La multiplicacion Caracter * Boolean no es permitida', this.linea, this.col);
                    case Tipo_1.tipoDato.CARACTER:
                        return new Errores_1.default('Semantico', 'La multiplicacion Caracter * Caracter no es permitida', this.linea, this.col);
                    case Tipo_1.tipoDato.CADENA:
                        return new Errores_1.default('Semantico', 'La multiplicacion Caracter * Cadena no es permitida', this.linea, this.col);
                    default:
                        return new Errores_1.default('Semantico', 'Tipo Dato Invalido', this.linea, this.col);
                }
            case Tipo_1.tipoDato.CADENA:
                switch (operando2) {
                    case Tipo_1.tipoDato.ENTERO:
                        return new Errores_1.default('Semantico', 'La multiplicacion Cadena * Entero no es permitida', this.linea, this.col);
                    case Tipo_1.tipoDato.DECIMAL:
                        return new Errores_1.default('Semantico', 'La multiplicacion Cadena * Double no es permitida', this.linea, this.col);
                    case Tipo_1.tipoDato.BOOL:
                        return new Errores_1.default('Semantico', 'La multiplicacion Cadena * Boolean no es permitida', this.linea, this.col);
                    case Tipo_1.tipoDato.CARACTER:
                        return new Errores_1.default('Semantico', 'La multiplicacion Cadena * Caracter no es permitida', this.linea, this.col);
                    case Tipo_1.tipoDato.CADENA:
                        return new Errores_1.default('Semantico', 'La multiplicacion Cadena * Cadena no es permitida', this.linea, this.col);
                    default:
                        return new Errores_1.default('Semantico', 'Tipo Dato Invalido', this.linea, this.col);
                }
            default:
                return new Errores_1.default('Semantico', 'Tipo Dato Invalido', this.linea, this.col);
        }
    }
    div(op1, op2) {
        var _a, _b;
        let operando1 = (_a = this.op1) === null || _a === void 0 ? void 0 : _a.tipoDato.getTipo();
        let operando2 = (_b = this.op2) === null || _b === void 0 ? void 0 : _b.tipoDato.getTipo();
        switch (operando1) {
            case Tipo_1.tipoDato.ENTERO:
                switch (operando2) {
                    case Tipo_1.tipoDato.ENTERO:
                        this.tipoDato = new Tipo_1.default(Tipo_1.tipoDato.DECIMAL);
                        return parseInt(op1) / parseInt(op2);
                    case Tipo_1.tipoDato.DECIMAL:
                        this.tipoDato = new Tipo_1.default(Tipo_1.tipoDato.DECIMAL);
                        return parseFloat(op1) / parseFloat(op2);
                    case Tipo_1.tipoDato.BOOL:
                        return new Errores_1.default('Semantico', 'La division Entero / Boolean no es permitida', this.linea, this.col);
                    case Tipo_1.tipoDato.CARACTER:
                        this.tipoDato = new Tipo_1.default(Tipo_1.tipoDato.DECIMAL);
                        let trans = op2 + '';
                        let res = trans.charCodeAt(0);
                        return parseInt(op1) / res;
                    case Tipo_1.tipoDato.CADENA:
                        return new Errores_1.default('Semantico', 'La division Entero / Cadena no es permitida', this.linea, this.col);
                    default:
                        return new Errores_1.default('Semantico', 'Tipo Dato Invalido', this.linea, this.col);
                }
            case Tipo_1.tipoDato.DECIMAL:
                switch (operando2) {
                    case Tipo_1.tipoDato.ENTERO:
                        this.tipoDato = new Tipo_1.default(Tipo_1.tipoDato.DECIMAL);
                        return parseFloat(op1) / parseFloat(op2);
                    case Tipo_1.tipoDato.DECIMAL:
                        this.tipoDato = new Tipo_1.default(Tipo_1.tipoDato.DECIMAL);
                        return parseFloat(op1) / parseFloat(op2);
                    case Tipo_1.tipoDato.BOOL:
                        return new Errores_1.default('Semantico', 'La division Double / Boolean no es permitida', this.linea, this.col);
                    case Tipo_1.tipoDato.CARACTER:
                        this.tipoDato = new Tipo_1.default(Tipo_1.tipoDato.DECIMAL);
                        let trans = op2 + '';
                        let res = trans.charCodeAt(0);
                        return parseFloat(op1) / res;
                    case Tipo_1.tipoDato.CADENA:
                        return new Errores_1.default('Semantico', 'La division Double / Cadena no es permitida', this.linea, this.col);
                    default:
                        return new Errores_1.default('Semantico', 'Tipo Dato Invalido', this.linea, this.col);
                }
            case Tipo_1.tipoDato.BOOL:
                switch (operando2) {
                    case Tipo_1.tipoDato.ENTERO:
                        return new Errores_1.default('Semantico', 'La division Boolean / Entero no es permitida', this.linea, this.col);
                    case Tipo_1.tipoDato.DECIMAL:
                        return new Errores_1.default('Semantico', 'La division Boolean / Double no es permitida', this.linea, this.col);
                    case Tipo_1.tipoDato.BOOL:
                        return new Errores_1.default('Semantico', 'La division Boolean / Boolean no es permitida', this.linea, this.col);
                    case Tipo_1.tipoDato.CARACTER:
                        return new Errores_1.default('Semantico', 'La division Boolean / Caracter no es permitida', this.linea, this.col);
                    case Tipo_1.tipoDato.CADENA:
                        return new Errores_1.default('Semantico', 'La division Boolean / Cadena no es permitida', this.linea, this.col);
                    default:
                        return new Errores_1.default('Semantico', 'Tipo Dato Invalido', this.linea, this.col);
                }
            case Tipo_1.tipoDato.CARACTER:
                switch (operando2) {
                    case Tipo_1.tipoDato.ENTERO:
                        this.tipoDato = new Tipo_1.default(Tipo_1.tipoDato.DECIMAL);
                        let trans = op1 + '';
                        let res = trans.charCodeAt(0);
                        return res / parseInt(op2);
                    case Tipo_1.tipoDato.DECIMAL:
                        this.tipoDato = new Tipo_1.default(Tipo_1.tipoDato.DECIMAL);
                        let trans2 = op1 + '';
                        let res2 = trans2.charCodeAt(0);
                        return res2 / parseFloat(op2);
                    case Tipo_1.tipoDato.BOOL:
                        return new Errores_1.default('Semantico', 'La division Caracter / Boolean no es permitida', this.linea, this.col);
                    case Tipo_1.tipoDato.CARACTER:
                        return new Errores_1.default('Semantico', 'La division Caracter / Caracter no es permitida', this.linea, this.col);
                    case Tipo_1.tipoDato.CADENA:
                        return new Errores_1.default('Semantico', 'La division Caracter / Cadena no es permitida', this.linea, this.col);
                    default:
                        return new Errores_1.default('Semantico', 'Tipo Dato Invalido', this.linea, this.col);
                }
            case Tipo_1.tipoDato.CADENA:
                switch (operando2) {
                    case Tipo_1.tipoDato.ENTERO:
                        return new Errores_1.default('Semantico', 'La division Cadena / Entero no es permitida', this.linea, this.col);
                    case Tipo_1.tipoDato.DECIMAL:
                        return new Errores_1.default('Semantico', 'La division Cadena / Double no es permitida', this.linea, this.col);
                    case Tipo_1.tipoDato.BOOL:
                        return new Errores_1.default('Semantico', 'La division Cadena / Boolean no es permitida', this.linea, this.col);
                    case Tipo_1.tipoDato.CARACTER:
                        return new Errores_1.default('Semantico', 'La division Cadena / Caracter no es permitida', this.linea, this.col);
                    case Tipo_1.tipoDato.CADENA:
                        return new Errores_1.default('Semantico', 'La division Cadena / Cadena no es permitida', this.linea, this.col);
                    default:
                        return new Errores_1.default('Semantico', 'Tipo Dato Invalido', this.linea, this.col);
                }
            default:
                return new Errores_1.default('Semantico', 'Tipo Dato Invalido', this.linea, this.col);
        }
    }
    modul(op1, op2) {
        var _a, _b;
        let operando1 = (_a = this.op1) === null || _a === void 0 ? void 0 : _a.tipoDato.getTipo();
        let operando2 = (_b = this.op2) === null || _b === void 0 ? void 0 : _b.tipoDato.getTipo();
        switch (operando1) {
            case Tipo_1.tipoDato.ENTERO:
                switch (operando2) {
                    case Tipo_1.tipoDato.ENTERO:
                        this.tipoDato = new Tipo_1.default(Tipo_1.tipoDato.DECIMAL);
                        return parseInt(op1) % parseInt(op2);
                    case Tipo_1.tipoDato.DECIMAL:
                        this.tipoDato = new Tipo_1.default(Tipo_1.tipoDato.DECIMAL);
                        return parseFloat(op1) % parseFloat(op2);
                    case Tipo_1.tipoDato.BOOL:
                        return new Errores_1.default('Semantico', 'El modulo Entero % Boolean no es permitida', this.linea, this.col);
                    case Tipo_1.tipoDato.CARACTER:
                        this.tipoDato = new Tipo_1.default(Tipo_1.tipoDato.DECIMAL);
                        let trans = op2 + '';
                        let res = trans.charCodeAt(0);
                        return parseInt(op1) % res;
                    case Tipo_1.tipoDato.CADENA:
                        return new Errores_1.default('Semantico', 'El modulo Entero % Cadena no es permitida', this.linea, this.col);
                    default:
                        return new Errores_1.default('Semantico', 'Tipo Dato Invalido', this.linea, this.col);
                }
            case Tipo_1.tipoDato.DECIMAL:
                switch (operando2) {
                    case Tipo_1.tipoDato.ENTERO:
                        this.tipoDato = new Tipo_1.default(Tipo_1.tipoDato.DECIMAL);
                        return parseFloat(op1) % parseFloat(op2);
                    case Tipo_1.tipoDato.DECIMAL:
                        this.tipoDato = new Tipo_1.default(Tipo_1.tipoDato.DECIMAL);
                        return parseFloat(op1) % parseFloat(op2);
                    case Tipo_1.tipoDato.BOOL:
                        return new Errores_1.default('Semantico', 'El modulo Double % Boolean no es permitida', this.linea, this.col);
                    case Tipo_1.tipoDato.CARACTER:
                        this.tipoDato = new Tipo_1.default(Tipo_1.tipoDato.DECIMAL);
                        let trans = op2 + '';
                        let res = trans.charCodeAt(0);
                        return parseFloat(op1) % res;
                    case Tipo_1.tipoDato.CADENA:
                        return new Errores_1.default('Semantico', 'El modulo Double % Cadena no es permitida', this.linea, this.col);
                    default:
                        return new Errores_1.default('Semantico', 'Tipo Dato Invalido', this.linea, this.col);
                }
            case Tipo_1.tipoDato.BOOL:
                switch (operando2) {
                    case Tipo_1.tipoDato.ENTERO:
                        return new Errores_1.default('Semantico', 'El modulo Boolean % Entero no es permitida', this.linea, this.col);
                    case Tipo_1.tipoDato.DECIMAL:
                        return new Errores_1.default('Semantico', 'El modulo Boolean % Double no es permitida', this.linea, this.col);
                    case Tipo_1.tipoDato.BOOL:
                        return new Errores_1.default('Semantico', 'El modulo Boolean % Boolean no es permitida', this.linea, this.col);
                    case Tipo_1.tipoDato.CARACTER:
                        return new Errores_1.default('Semantico', 'El modulo Boolean % Caracter no es permitida', this.linea, this.col);
                    case Tipo_1.tipoDato.CADENA:
                        return new Errores_1.default('Semantico', 'El modulo Boolean % Cadena no es permitida', this.linea, this.col);
                    default:
                        return new Errores_1.default('Semantico', 'Tipo Dato Invalido', this.linea, this.col);
                }
            case Tipo_1.tipoDato.CARACTER:
                switch (operando2) {
                    case Tipo_1.tipoDato.ENTERO:
                        this.tipoDato = new Tipo_1.default(Tipo_1.tipoDato.DECIMAL);
                        let trans = op1 + '';
                        let res = trans.charCodeAt(0);
                        return res % parseInt(op2);
                    case Tipo_1.tipoDato.DECIMAL:
                        this.tipoDato = new Tipo_1.default(Tipo_1.tipoDato.DECIMAL);
                        let trans2 = op1 + '';
                        let res2 = trans2.charCodeAt(0);
                        return res2 % parseFloat(op2);
                    case Tipo_1.tipoDato.BOOL:
                        return new Errores_1.default('Semantico', 'El modulo Caracter % Boolean no es permitida', this.linea, this.col);
                    case Tipo_1.tipoDato.CARACTER:
                        return new Errores_1.default('Semantico', 'El modulo Caracter % Caracter no es permitida', this.linea, this.col);
                    case Tipo_1.tipoDato.CADENA:
                        return new Errores_1.default('Semantico', 'El modulo Caracter % Cadena no es permitida', this.linea, this.col);
                    default:
                        return new Errores_1.default('Semantico', 'Tipo Dato Invalido', this.linea, this.col);
                }
            case Tipo_1.tipoDato.CADENA:
                switch (operando2) {
                    case Tipo_1.tipoDato.ENTERO:
                        return new Errores_1.default('Semantico', 'El modulo Cadena % Entero no es permitida', this.linea, this.col);
                    case Tipo_1.tipoDato.DECIMAL:
                        return new Errores_1.default('Semantico', 'El modulo Cadena % Double no es permitida', this.linea, this.col);
                    case Tipo_1.tipoDato.BOOL:
                        return new Errores_1.default('Semantico', 'El modulo Cadena % Boolean no es permitida', this.linea, this.col);
                    case Tipo_1.tipoDato.CARACTER:
                        return new Errores_1.default('Semantico', 'El modulo Cadena % Caracter no es permitida', this.linea, this.col);
                    case Tipo_1.tipoDato.CADENA:
                        return new Errores_1.default('Semantico', 'El modulo Cadena % Cadena no es permitida', this.linea, this.col);
                    default:
                        return new Errores_1.default('Semantico', 'Tipo Dato Invalido', this.linea, this.col);
                }
            default:
                return new Errores_1.default('Semantico', 'Tipo Dato Invalido', this.linea, this.col);
        }
    }
    pow(op1, op2) {
        var _a, _b;
        let operando1 = (_a = this.op1) === null || _a === void 0 ? void 0 : _a.tipoDato.getTipo();
        let operando2 = (_b = this.op2) === null || _b === void 0 ? void 0 : _b.tipoDato.getTipo();
        switch (operando1) {
            case Tipo_1.tipoDato.ENTERO:
                switch (operando2) {
                    case Tipo_1.tipoDato.ENTERO:
                        this.tipoDato = new Tipo_1.default(Tipo_1.tipoDato.ENTERO);
                        return Math.pow(parseInt(op1), parseInt(op2));
                    case Tipo_1.tipoDato.DECIMAL:
                        this.tipoDato = new Tipo_1.default(Tipo_1.tipoDato.DECIMAL);
                        return Math.pow(parseFloat(op1), parseFloat(op2));
                    case Tipo_1.tipoDato.BOOL:
                        return new Errores_1.default('Semantico', 'La potencia Entero ^ Boolean no es permitida', this.linea, this.col);
                    case Tipo_1.tipoDato.CARACTER:
                        return new Errores_1.default('Semantico', 'La potencia Entero ^ Caracter no es permitida', this.linea, this.col);
                    case Tipo_1.tipoDato.CADENA:
                        return new Errores_1.default('Semantico', 'La potencia Entero ^ Cadena no es permitida', this.linea, this.col);
                    default:
                        return new Errores_1.default('Semantico', 'Tipo Dato Invalido', this.linea, this.col);
                }
            case Tipo_1.tipoDato.DECIMAL:
                switch (operando2) {
                    case Tipo_1.tipoDato.ENTERO:
                        this.tipoDato = new Tipo_1.default(Tipo_1.tipoDato.DECIMAL);
                        return Math.pow(parseFloat(op1), parseFloat(op2));
                    case Tipo_1.tipoDato.DECIMAL:
                        this.tipoDato = new Tipo_1.default(Tipo_1.tipoDato.DECIMAL);
                        return Math.pow(parseFloat(op1), parseFloat(op2));
                    case Tipo_1.tipoDato.BOOL:
                        return new Errores_1.default('Semantico', 'La potencia Double ^ Boolean no es permitida', this.linea, this.col);
                    case Tipo_1.tipoDato.CARACTER:
                        return new Errores_1.default('Semantico', 'La potencia Double ^ Caracter no es permitida', this.linea, this.col);
                    case Tipo_1.tipoDato.CADENA:
                        return new Errores_1.default('Semantico', 'La potencia Double ^ Cadena no es permitida', this.linea, this.col);
                    default:
                        return new Errores_1.default('Semantico', 'Tipo Dato Invalido', this.linea, this.col);
                }
            case Tipo_1.tipoDato.BOOL:
                switch (operando2) {
                    case Tipo_1.tipoDato.ENTERO:
                        return new Errores_1.default('Semantico', 'La potencia Boolean ^ Entero no es permitida', this.linea, this.col);
                    case Tipo_1.tipoDato.DECIMAL:
                        return new Errores_1.default('Semantico', 'La potencia Boolean ^ Double no es permitida', this.linea, this.col);
                    case Tipo_1.tipoDato.BOOL:
                        return new Errores_1.default('Semantico', 'La potencia Boolean ^ Boolean no es permitida', this.linea, this.col);
                    case Tipo_1.tipoDato.CARACTER:
                        return new Errores_1.default('Semantico', 'La potencia Boolean ^ Caracter no es permitida', this.linea, this.col);
                    case Tipo_1.tipoDato.CADENA:
                        return new Errores_1.default('Semantico', 'La potencia Boolean ^ Cadena no es permitida', this.linea, this.col);
                    default:
                        return new Errores_1.default('Semantico', 'Tipo Dato Invalido', this.linea, this.col);
                }
            case Tipo_1.tipoDato.CARACTER:
                switch (operando2) {
                    case Tipo_1.tipoDato.ENTERO:
                        return new Errores_1.default('Semantico', 'La potencia Caracter ^ Entero no es permitida', this.linea, this.col);
                    case Tipo_1.tipoDato.DECIMAL:
                        return new Errores_1.default('Semantico', 'La potencia Caracter ^ Double no es permitida', this.linea, this.col);
                    case Tipo_1.tipoDato.BOOL:
                        return new Errores_1.default('Semantico', 'La potencia Caracter ^ Boolean no es permitida', this.linea, this.col);
                    case Tipo_1.tipoDato.CARACTER:
                        return new Errores_1.default('Semantico', 'La potencia Caracter ^ Caracter no es permitida', this.linea, this.col);
                    case Tipo_1.tipoDato.CADENA:
                        return new Errores_1.default('Semantico', 'La potencia Caracter ^ Cadena no es permitida', this.linea, this.col);
                    default:
                        return new Errores_1.default('Semantico', 'Tipo Dato Invalido', this.linea, this.col);
                }
            case Tipo_1.tipoDato.CADENA:
                switch (operando2) {
                    case Tipo_1.tipoDato.ENTERO:
                        return new Errores_1.default('Semantico', 'La potencia Cadena ^ Entero no es permitida', this.linea, this.col);
                    case Tipo_1.tipoDato.DECIMAL:
                        return new Errores_1.default('Semantico', 'La potencia Cadena ^ Double no es permitida', this.linea, this.col);
                    case Tipo_1.tipoDato.BOOL:
                        return new Errores_1.default('Semantico', 'La potencia Cadena ^ Boolean no es permitida', this.linea, this.col);
                    case Tipo_1.tipoDato.CARACTER:
                        return new Errores_1.default('Semantico', 'La potencia Cadena ^ Caracter no es permitida', this.linea, this.col);
                    case Tipo_1.tipoDato.CADENA:
                        return new Errores_1.default('Semantico', 'La potencia Cadena ^ Cadena no es permitida', this.linea, this.col);
                    default:
                        return new Errores_1.default('Semantico', 'Tipo Dato Invalido', this.linea, this.col);
                }
            default:
                return new Errores_1.default('Semantico', 'Tipo Dato Invalido', this.linea, this.col);
        }
    }
    neg(apU) {
        var _a;
        let operandoUnico = (_a = this.opU) === null || _a === void 0 ? void 0 : _a.tipoDato.getTipo();
        switch (operandoUnico) {
            case Tipo_1.tipoDato.ENTERO:
                this.tipoDato = new Tipo_1.default(Tipo_1.tipoDato.ENTERO);
                return apU * -1;
            case Tipo_1.tipoDato.DECIMAL:
                this.tipoDato = new Tipo_1.default(Tipo_1.tipoDato.DECIMAL);
                return apU * -1;
            case Tipo_1.tipoDato.BOOL:
                return new Errores_1.default('Semantico', 'Negacion Unaria invalida', this.linea, this.col);
            case Tipo_1.tipoDato.CARACTER:
                return new Errores_1.default('Semantico', 'Negacion Unaria invalida ', this.linea, this.col);
            case Tipo_1.tipoDato.CADENA:
                return new Errores_1.default('Semantico', 'Negacion Unaria invalida ', this.linea, this.col);
            default:
                return new Errores_1.default('Semantico', 'Tipo Dato Invalido', this.linea, this.col);
        }
    }
    generarDot(anterior) {
        var _a, _b;
        let cadena = "";
        if (this.opU != null) {
            let nodo1 = "n" + (indexController_1.numeroNodo.no + 1);
            let nodo2 = "n" + (indexController_1.numeroNodo.no + 2);
            indexController_1.numeroNodo.no += 2;
            cadena += nodo1 + "[label=\"-\"];\n";
            cadena += nodo2 + "[label=\"EXP\"];\n";
            cadena += anterior + "->" + nodo1 + ";\n";
            cadena += anterior + "->" + nodo2 + ";\n";
            cadena += this.opU.generarDot(nodo2);
            return cadena;
        }
        else {
            let nodo1 = "n" + (indexController_1.numeroNodo.no + 1);
            let nodo2 = "n" + (indexController_1.numeroNodo.no + 2);
            let nodo3 = "n" + (indexController_1.numeroNodo.no + 3);
            indexController_1.numeroNodo.no += 3;
            cadena += nodo1 + "[label=\"EXP\"];\n";
            switch (this.operacion) {
                case Operadores.SUMA:
                    cadena += nodo2 + "[label=\"+\"];\n";
                    break;
                case Operadores.RESTA:
                    cadena += nodo2 + "[label=\"-\"];\n";
                    break;
                case Operadores.MULT:
                    cadena += nodo2 + "[label=\"*\"];\n";
                    break;
                case Operadores.DIV:
                    cadena += nodo2 + "[label=\"/\"];\n";
                    break;
                case Operadores.POW:
                    cadena += nodo2 + "[label=\"^\"];\n";
                    break;
                case Operadores.MOD:
                    cadena += nodo2 + "[label=\"%\"];\n";
                    break;
            }
            cadena += nodo3 + "[label=\"EXP\"];\n";
            cadena += anterior + "->" + nodo1 + ";\n";
            cadena += anterior + "->" + nodo2 + ";\n";
            cadena += anterior + "->" + nodo3 + ";\n";
            cadena += (_a = this.op1) === null || _a === void 0 ? void 0 : _a.generarDot(nodo1);
            cadena += (_b = this.op2) === null || _b === void 0 ? void 0 : _b.generarDot(nodo3);
            return cadena;
        }
    }
}
exports.default = Aritmeticas;
var Operadores;
(function (Operadores) {
    Operadores[Operadores["SUMA"] = 0] = "SUMA";
    Operadores[Operadores["RESTA"] = 1] = "RESTA";
    Operadores[Operadores["MULT"] = 2] = "MULT";
    Operadores[Operadores["DIV"] = 3] = "DIV";
    Operadores[Operadores["POW"] = 4] = "POW";
    Operadores[Operadores["MOD"] = 5] = "MOD";
    Operadores[Operadores["NEG"] = 6] = "NEG";
})(Operadores = exports.Operadores || (exports.Operadores = {}));
