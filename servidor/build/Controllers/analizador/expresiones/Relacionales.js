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
exports.Relacional = void 0;
const indexController_1 = require("../../indexController");
const Instruccion_1 = require("../abstracto/Instruccion");
const Errores_1 = __importDefault(require("../excepciones/Errores"));
const Tipo_1 = __importStar(require("../simbolo/Tipo"));
class Relacionales extends Instruccion_1.Instruccion {
    constructor(relacional, fila, col, cond1, cond2) {
        super(new Tipo_1.default(Tipo_1.tipoDato.BOOL), fila, col);
        this.relacional = relacional;
        this.cond1 = cond1;
        this.cond2 = cond2;
    }
    interpretar(arbol, tabla) {
        var _a, _b;
        let conIzq, conDer = null;
        conIzq = (_a = this.cond1) === null || _a === void 0 ? void 0 : _a.interpretar(arbol, tabla);
        if (conIzq instanceof Errores_1.default)
            return conIzq;
        conDer = (_b = this.cond2) === null || _b === void 0 ? void 0 : _b.interpretar(arbol, tabla);
        if (conDer instanceof Errores_1.default)
            return conDer;
        switch (this.relacional) {
            case Relacional.EQUALS:
                return this.equals(conIzq, conDer);
            case Relacional.NOTEQUAL:
                let verificacion = this.equals(conIzq, conDer);
                if (verificacion instanceof Errores_1.default)
                    return verificacion;
                return !verificacion;
            case Relacional.MENOR:
                return this.menor(conIzq, conDer);
            case Relacional.MENOREQ:
                return this.menorIgual(conIzq, conDer);
            case Relacional.MAYOR:
                return this.mayor(conIzq, conDer);
            case Relacional.MAYOREQ:
                return this.mayorIgual(conIzq, conDer);
            default:
                return new Errores_1.default('Semantico', 'Relacional Invalido', this.linea, this.col);
        }
    }
    equals(comp1, comp2) {
        var _a, _b;
        let comparando1 = (_a = this.cond1) === null || _a === void 0 ? void 0 : _a.tipoDato.getTipo();
        let comparando2 = (_b = this.cond2) === null || _b === void 0 ? void 0 : _b.tipoDato.getTipo();
        switch (comparando1) {
            case Tipo_1.tipoDato.ENTERO:
                switch (comparando2) {
                    case Tipo_1.tipoDato.ENTERO:
                        return parseInt(comp1) == parseInt(comp2);
                    case Tipo_1.tipoDato.DECIMAL:
                        return parseFloat(comp1) == parseInt(comp2);
                    case Tipo_1.tipoDato.BOOL:
                        return new Errores_1.default('Semantico', 'No se puede comparar Entero con Boolean', this.linea, this.col);
                    case Tipo_1.tipoDato.CARACTER:
                        let trans = comp2 + '';
                        let res = trans.charCodeAt(0);
                        return parseInt(comp1) == res;
                    case Tipo_1.tipoDato.CADENA:
                        return new Errores_1.default('Semantico', 'No se puede comparar Entero con Cadena', this.linea, this.col);
                    default:
                        return new Errores_1.default('Semantico', 'Tipo Dato Invalido', this.linea, this.col);
                }
            case Tipo_1.tipoDato.DECIMAL:
                switch (comparando2) {
                    case Tipo_1.tipoDato.ENTERO:
                        return parseFloat(comp1) == parseFloat(comp2);
                    case Tipo_1.tipoDato.DECIMAL:
                        return parseFloat(comp1) == parseFloat(comp2);
                    case Tipo_1.tipoDato.BOOL:
                        return new Errores_1.default('Semantico', 'No se puede comparar Double con Boolean', this.linea, this.col);
                    case Tipo_1.tipoDato.CARACTER:
                        let trans = comp2 + '';
                        let res = trans.charCodeAt(0);
                        return parseFloat(comp1) == res;
                    case Tipo_1.tipoDato.CADENA:
                        return new Errores_1.default('Semantico', 'No se puede comparar Double con Cadena', this.linea, this.col);
                    default:
                        return new Errores_1.default('Semantico', 'Tipo Dato Invalido', this.linea, this.col);
                }
            case Tipo_1.tipoDato.BOOL:
                switch (comparando2) {
                    case Tipo_1.tipoDato.ENTERO:
                        return new Errores_1.default('Semantico', 'No se puede comparar Boolean con Entero', this.linea, this.col);
                    case Tipo_1.tipoDato.DECIMAL:
                        return new Errores_1.default('Semantico', 'No se puede comparar Boolean con Double', this.linea, this.col);
                    case Tipo_1.tipoDato.BOOL:
                        return comp1 == comp2;
                    case Tipo_1.tipoDato.CARACTER:
                        return new Errores_1.default('Semantico', 'No se puede comparar Boolean con Caracter', this.linea, this.col);
                    case Tipo_1.tipoDato.CADENA:
                        return new Errores_1.default('Semantico', 'No se puede comparar Boolean con Cadena', this.linea, this.col);
                    default:
                        return new Errores_1.default('Semantico', 'Tipo Dato Invalido', this.linea, this.col);
                }
            case Tipo_1.tipoDato.CARACTER:
                switch (comparando2) {
                    case Tipo_1.tipoDato.ENTERO:
                        let trans = comp1 + '';
                        let res = trans.charCodeAt(0);
                        return parseInt(comp2) == res;
                    case Tipo_1.tipoDato.DECIMAL:
                        let trans2 = comp1 + '';
                        let res2 = trans2.charCodeAt(0);
                        return parseFloat(comp2) == res2;
                    case Tipo_1.tipoDato.BOOL:
                        return new Errores_1.default('Semantico', 'No se puede comparar Caracter con Boolean', this.linea, this.col);
                    case Tipo_1.tipoDato.CARACTER:
                        //conversion primer dato
                        let trans11 = comp1 + '';
                        let res11 = trans11.charCodeAt(0);
                        //conversion segundo dato
                        let trans22 = comp2 + '';
                        let res22 = trans22.charCodeAt(0);
                        return res11 == res22;
                    case Tipo_1.tipoDato.CADENA:
                        return new Errores_1.default('Semantico', 'No se puede comparar Caracter con Cadena', this.linea, this.col);
                    default:
                        return new Errores_1.default('Semantico', 'Tipo Dato Invalido', this.linea, this.col);
                }
            case Tipo_1.tipoDato.CADENA:
                switch (comparando2) {
                    case Tipo_1.tipoDato.ENTERO:
                        return new Errores_1.default('Semantico', 'No se puede comparar Cadena con Entero', this.linea, this.col);
                    case Tipo_1.tipoDato.DECIMAL:
                        return new Errores_1.default('Semantico', 'No se puede comparar Cadena con Decimal', this.linea, this.col);
                    case Tipo_1.tipoDato.BOOL:
                        return new Errores_1.default('Semantico', 'No se puede comparar Cadena con Boolean', this.linea, this.col);
                    case Tipo_1.tipoDato.CARACTER:
                        return new Errores_1.default('Semantico', 'No se puede comparar Cadena con Caracter', this.linea, this.col);
                    case Tipo_1.tipoDato.CADENA:
                        return comp1 == comp2;
                    default:
                        return new Errores_1.default('Semantico', 'Tipo Dato Invalido', this.linea, this.col);
                }
            default:
                return new Errores_1.default('Semantico', 'Tipo Dato Invalido', this.linea, this.col);
        }
    }
    menor(comp1, comp2) {
        var _a, _b;
        let comparando1 = (_a = this.cond1) === null || _a === void 0 ? void 0 : _a.tipoDato.getTipo();
        let comparando2 = (_b = this.cond2) === null || _b === void 0 ? void 0 : _b.tipoDato.getTipo();
        switch (comparando1) {
            case Tipo_1.tipoDato.ENTERO:
                switch (comparando2) {
                    case Tipo_1.tipoDato.ENTERO:
                        return parseInt(comp1) < parseInt(comp2);
                    case Tipo_1.tipoDato.DECIMAL:
                        return parseFloat(comp1) < parseInt(comp2);
                    case Tipo_1.tipoDato.BOOL:
                        return new Errores_1.default('Semantico', 'No se puede comparar Entero con Boolean', this.linea, this.col);
                    case Tipo_1.tipoDato.CARACTER:
                        let trans = comp2 + '';
                        let res = trans.charCodeAt(0);
                        return parseInt(comp1) < res;
                    case Tipo_1.tipoDato.CADENA:
                        return new Errores_1.default('Semantico', 'No se puede comparar Entero con Cadena', this.linea, this.col);
                    default:
                        return new Errores_1.default('Semantico', 'Tipo Dato Invalido', this.linea, this.col);
                }
            case Tipo_1.tipoDato.DECIMAL:
                switch (comparando2) {
                    case Tipo_1.tipoDato.ENTERO:
                        return parseFloat(comp1) < parseFloat(comp2);
                    case Tipo_1.tipoDato.DECIMAL:
                        return parseFloat(comp1) < parseFloat(comp2);
                    case Tipo_1.tipoDato.BOOL:
                        return new Errores_1.default('Semantico', 'No se puede comparar Double con Boolean', this.linea, this.col);
                    case Tipo_1.tipoDato.CARACTER:
                        let trans = comp2 + '';
                        let res = trans.charCodeAt(0);
                        return parseFloat(comp1) < res;
                    case Tipo_1.tipoDato.CADENA:
                        return new Errores_1.default('Semantico', 'No se puede comparar Double con Cadena', this.linea, this.col);
                    default:
                        return new Errores_1.default('Semantico', 'Tipo Dato Invalido', this.linea, this.col);
                }
            case Tipo_1.tipoDato.BOOL:
                switch (comparando2) {
                    case Tipo_1.tipoDato.ENTERO:
                        return new Errores_1.default('Semantico', 'No se puede comparar Boolean con Entero', this.linea, this.col);
                    case Tipo_1.tipoDato.DECIMAL:
                        return new Errores_1.default('Semantico', 'No se puede comparar Boolean con Double', this.linea, this.col);
                    case Tipo_1.tipoDato.BOOL:
                        return comp1 < comp2;
                    case Tipo_1.tipoDato.CARACTER:
                        return new Errores_1.default('Semantico', 'No se puede comparar Boolean con Caracter', this.linea, this.col);
                    case Tipo_1.tipoDato.CADENA:
                        return new Errores_1.default('Semantico', 'No se puede comparar Boolean con Cadena', this.linea, this.col);
                    default:
                        return new Errores_1.default('Semantico', 'Tipo Dato Invalido', this.linea, this.col);
                }
            case Tipo_1.tipoDato.CARACTER:
                switch (comparando2) {
                    case Tipo_1.tipoDato.ENTERO:
                        let trans = comp1 + '';
                        let res = trans.charCodeAt(0);
                        return parseInt(comp2) > res;
                    case Tipo_1.tipoDato.DECIMAL:
                        let trans2 = comp1 + '';
                        let res2 = trans2.charCodeAt(0);
                        return parseFloat(comp2) > res2;
                    case Tipo_1.tipoDato.BOOL:
                        return new Errores_1.default('Semantico', 'No se puede comparar Caracter con Boolean', this.linea, this.col);
                    case Tipo_1.tipoDato.CARACTER:
                        //conversion primer dato
                        let trans11 = comp1 + '';
                        let res11 = trans11.charCodeAt(0);
                        //conversion segundo dato
                        let trans22 = comp2 + '';
                        let res22 = trans22.charCodeAt(0);
                        return res11 < res22;
                    case Tipo_1.tipoDato.CADENA:
                        return new Errores_1.default('Semantico', 'No se puede comparar Caracter con Cadena', this.linea, this.col);
                    default:
                        return new Errores_1.default('Semantico', 'Tipo Dato Invalido', this.linea, this.col);
                }
            case Tipo_1.tipoDato.CADENA:
                switch (comparando2) {
                    case Tipo_1.tipoDato.ENTERO:
                        return new Errores_1.default('Semantico', 'No se puede comparar Cadena con Entero', this.linea, this.col);
                    case Tipo_1.tipoDato.DECIMAL:
                        return new Errores_1.default('Semantico', 'No se puede comparar Cadena con Decimal', this.linea, this.col);
                    case Tipo_1.tipoDato.BOOL:
                        return new Errores_1.default('Semantico', 'No se puede comparar Cadena con Boolean', this.linea, this.col);
                    case Tipo_1.tipoDato.CARACTER:
                        return new Errores_1.default('Semantico', 'No se puede comparar Cadena con Caracter', this.linea, this.col);
                    case Tipo_1.tipoDato.CADENA:
                        return comp1 < comp2;
                    default:
                        return new Errores_1.default('Semantico', 'Tipo Dato Invalido', this.linea, this.col);
                }
            default:
                return new Errores_1.default('Semantico', 'Tipo Dato Invalido', this.linea, this.col);
        }
    }
    menorIgual(comp1, comp2) {
        var _a, _b;
        let comparando1 = (_a = this.cond1) === null || _a === void 0 ? void 0 : _a.tipoDato.getTipo();
        let comparando2 = (_b = this.cond2) === null || _b === void 0 ? void 0 : _b.tipoDato.getTipo();
        switch (comparando1) {
            case Tipo_1.tipoDato.ENTERO:
                switch (comparando2) {
                    case Tipo_1.tipoDato.ENTERO:
                        return parseInt(comp1) <= parseInt(comp2);
                    case Tipo_1.tipoDato.DECIMAL:
                        return parseFloat(comp1) <= parseInt(comp2);
                    case Tipo_1.tipoDato.BOOL:
                        return new Errores_1.default('Semantico', 'No se puede comparar Entero con Boolean', this.linea, this.col);
                    case Tipo_1.tipoDato.CARACTER:
                        let trans = comp2 + '';
                        let res = trans.charCodeAt(0);
                        return parseInt(comp1) <= res;
                    case Tipo_1.tipoDato.CADENA:
                        return new Errores_1.default('Semantico', 'No se puede comparar Entero con Cadena', this.linea, this.col);
                    default:
                        return new Errores_1.default('Semantico', 'Tipo Dato Invalido', this.linea, this.col);
                }
            case Tipo_1.tipoDato.DECIMAL:
                switch (comparando2) {
                    case Tipo_1.tipoDato.ENTERO:
                        return parseFloat(comp1) <= parseFloat(comp2);
                    case Tipo_1.tipoDato.DECIMAL:
                        return parseFloat(comp1) <= parseFloat(comp2);
                    case Tipo_1.tipoDato.BOOL:
                        return new Errores_1.default('Semantico', 'No se puede comparar Double con Boolean', this.linea, this.col);
                    case Tipo_1.tipoDato.CARACTER:
                        let trans = comp2 + '';
                        let res = trans.charCodeAt(0);
                        return parseFloat(comp1) <= res;
                    case Tipo_1.tipoDato.CADENA:
                        return new Errores_1.default('Semantico', 'No se puede comparar Double con Cadena', this.linea, this.col);
                    default:
                        return new Errores_1.default('Semantico', 'Tipo Dato Invalido', this.linea, this.col);
                }
            case Tipo_1.tipoDato.BOOL:
                switch (comparando2) {
                    case Tipo_1.tipoDato.ENTERO:
                        return new Errores_1.default('Semantico', 'No se puede comparar Boolean con Entero', this.linea, this.col);
                    case Tipo_1.tipoDato.DECIMAL:
                        return new Errores_1.default('Semantico', 'No se puede comparar Boolean con Double', this.linea, this.col);
                    case Tipo_1.tipoDato.BOOL:
                        return comp1 <= comp2;
                    case Tipo_1.tipoDato.CARACTER:
                        return new Errores_1.default('Semantico', 'No se puede comparar Boolean con Caracter', this.linea, this.col);
                    case Tipo_1.tipoDato.CADENA:
                        return new Errores_1.default('Semantico', 'No se puede comparar Boolean con Cadena', this.linea, this.col);
                    default:
                        return new Errores_1.default('Semantico', 'Tipo Dato Invalido', this.linea, this.col);
                }
            case Tipo_1.tipoDato.CARACTER:
                switch (comparando2) {
                    case Tipo_1.tipoDato.ENTERO:
                        let trans = comp1 + '';
                        let res = trans.charCodeAt(0);
                        return parseInt(comp2) >= res;
                    case Tipo_1.tipoDato.DECIMAL:
                        let trans2 = comp1 + '';
                        let res2 = trans2.charCodeAt(0);
                        return parseFloat(comp2) >= res2;
                    case Tipo_1.tipoDato.BOOL:
                        return new Errores_1.default('Semantico', 'No se puede comparar Caracter con Boolean', this.linea, this.col);
                    case Tipo_1.tipoDato.CARACTER:
                        //conversion primer dato
                        let trans11 = comp1 + '';
                        let res11 = trans11.charCodeAt(0);
                        //conversion segundo dato
                        let trans22 = comp2 + '';
                        let res22 = trans22.charCodeAt(0);
                        return res11 <= res22;
                    case Tipo_1.tipoDato.CADENA:
                        return new Errores_1.default('Semantico', 'No se puede comparar Caracter con Cadena', this.linea, this.col);
                    default:
                        return new Errores_1.default('Semantico', 'Tipo Dato Invalido', this.linea, this.col);
                }
            case Tipo_1.tipoDato.CADENA:
                switch (comparando2) {
                    case Tipo_1.tipoDato.ENTERO:
                        return new Errores_1.default('Semantico', 'No se puede comparar Cadena con Entero', this.linea, this.col);
                    case Tipo_1.tipoDato.DECIMAL:
                        return new Errores_1.default('Semantico', 'No se puede comparar Cadena con Decimal', this.linea, this.col);
                    case Tipo_1.tipoDato.BOOL:
                        return new Errores_1.default('Semantico', 'No se puede comparar Cadena con Boolean', this.linea, this.col);
                    case Tipo_1.tipoDato.CARACTER:
                        return new Errores_1.default('Semantico', 'No se puede comparar Cadena con Caracter', this.linea, this.col);
                    case Tipo_1.tipoDato.CADENA:
                        return comp1 <= comp2;
                    default:
                        return new Errores_1.default('Semantico', 'Tipo Dato Invalido', this.linea, this.col);
                }
            default:
                return new Errores_1.default('Semantico', 'Tipo Dato Invalido', this.linea, this.col);
        }
    }
    mayor(comp1, comp2) {
        var _a, _b;
        let comparando1 = (_a = this.cond1) === null || _a === void 0 ? void 0 : _a.tipoDato.getTipo();
        let comparando2 = (_b = this.cond2) === null || _b === void 0 ? void 0 : _b.tipoDato.getTipo();
        switch (comparando1) {
            case Tipo_1.tipoDato.ENTERO:
                switch (comparando2) {
                    case Tipo_1.tipoDato.ENTERO:
                        return parseInt(comp1) > parseInt(comp2);
                    case Tipo_1.tipoDato.DECIMAL:
                        return parseFloat(comp1) > parseInt(comp2);
                    case Tipo_1.tipoDato.BOOL:
                        return new Errores_1.default('Semantico', 'No se puede comparar Entero con Boolean', this.linea, this.col);
                    case Tipo_1.tipoDato.CARACTER:
                        let trans = comp2 + '';
                        let res = trans.charCodeAt(0);
                        return parseInt(comp1) > res;
                    case Tipo_1.tipoDato.CADENA:
                        return new Errores_1.default('Semantico', 'No se puede comparar Entero con Cadena', this.linea, this.col);
                    default:
                        return new Errores_1.default('Semantico', 'Tipo Dato Invalido', this.linea, this.col);
                }
            case Tipo_1.tipoDato.DECIMAL:
                switch (comparando2) {
                    case Tipo_1.tipoDato.ENTERO:
                        return parseFloat(comp1) > parseFloat(comp2);
                    case Tipo_1.tipoDato.DECIMAL:
                        return parseFloat(comp1) > parseFloat(comp2);
                    case Tipo_1.tipoDato.BOOL:
                        return new Errores_1.default('Semantico', 'No se puede comparar Double con Boolean', this.linea, this.col);
                    case Tipo_1.tipoDato.CARACTER:
                        let trans = comp2 + '';
                        let res = trans.charCodeAt(0);
                        return parseFloat(comp1) > res;
                    case Tipo_1.tipoDato.CADENA:
                        return new Errores_1.default('Semantico', 'No se puede comparar Double con Cadena', this.linea, this.col);
                    default:
                        return new Errores_1.default('Semantico', 'Tipo Dato Invalido', this.linea, this.col);
                }
            case Tipo_1.tipoDato.BOOL:
                switch (comparando2) {
                    case Tipo_1.tipoDato.ENTERO:
                        return new Errores_1.default('Semantico', 'No se puede comparar Boolean con Entero', this.linea, this.col);
                    case Tipo_1.tipoDato.DECIMAL:
                        return new Errores_1.default('Semantico', 'No se puede comparar Boolean con Double', this.linea, this.col);
                    case Tipo_1.tipoDato.BOOL:
                        return comp1 > comp2;
                    case Tipo_1.tipoDato.CARACTER:
                        return new Errores_1.default('Semantico', 'No se puede comparar Boolean con Caracter', this.linea, this.col);
                    case Tipo_1.tipoDato.CADENA:
                        return new Errores_1.default('Semantico', 'No se puede comparar Boolean con Cadena', this.linea, this.col);
                    default:
                        return new Errores_1.default('Semantico', 'Tipo Dato Invalido', this.linea, this.col);
                }
            case Tipo_1.tipoDato.CARACTER:
                switch (comparando2) {
                    case Tipo_1.tipoDato.ENTERO:
                        let trans = comp1 + '';
                        let res = trans.charCodeAt(0);
                        return parseInt(comp2) < res;
                    case Tipo_1.tipoDato.DECIMAL:
                        let trans2 = comp1 + '';
                        let res2 = trans2.charCodeAt(0);
                        return parseFloat(comp2) < res2;
                    case Tipo_1.tipoDato.BOOL:
                        return new Errores_1.default('Semantico', 'No se puede comparar Caracter con Boolean', this.linea, this.col);
                    case Tipo_1.tipoDato.CARACTER:
                        //conversion primer dato
                        let trans11 = comp1 + '';
                        let res11 = trans11.charCodeAt(0);
                        //conversion segundo dato
                        let trans22 = comp2 + '';
                        let res22 = trans22.charCodeAt(0);
                        return res11 > res22;
                    case Tipo_1.tipoDato.CADENA:
                        return new Errores_1.default('Semantico', 'No se puede comparar Caracter con Cadena', this.linea, this.col);
                    default:
                        return new Errores_1.default('Semantico', 'Tipo Dato Invalido', this.linea, this.col);
                }
            case Tipo_1.tipoDato.CADENA:
                switch (comparando2) {
                    case Tipo_1.tipoDato.ENTERO:
                        return new Errores_1.default('Semantico', 'No se puede comparar Cadena con Entero', this.linea, this.col);
                    case Tipo_1.tipoDato.DECIMAL:
                        return new Errores_1.default('Semantico', 'No se puede comparar Cadena con Decimal', this.linea, this.col);
                    case Tipo_1.tipoDato.BOOL:
                        return new Errores_1.default('Semantico', 'No se puede comparar Cadena con Boolean', this.linea, this.col);
                    case Tipo_1.tipoDato.CARACTER:
                        return new Errores_1.default('Semantico', 'No se puede comparar Cadena con Caracter', this.linea, this.col);
                    case Tipo_1.tipoDato.CADENA:
                        return comp1 > comp2;
                    default:
                        return new Errores_1.default('Semantico', 'Tipo Dato Invalido', this.linea, this.col);
                }
            default:
                return new Errores_1.default('Semantico', 'Tipo Dato Invalido', this.linea, this.col);
        }
    }
    mayorIgual(comp1, comp2) {
        var _a, _b;
        let comparando1 = (_a = this.cond1) === null || _a === void 0 ? void 0 : _a.tipoDato.getTipo();
        let comparando2 = (_b = this.cond2) === null || _b === void 0 ? void 0 : _b.tipoDato.getTipo();
        switch (comparando1) {
            case Tipo_1.tipoDato.ENTERO:
                switch (comparando2) {
                    case Tipo_1.tipoDato.ENTERO:
                        return parseInt(comp1) >= parseInt(comp2);
                    case Tipo_1.tipoDato.DECIMAL:
                        return parseFloat(comp1) >= parseInt(comp2);
                    case Tipo_1.tipoDato.BOOL:
                        return new Errores_1.default('Semantico', 'No se puede comparar Entero con Boolean', this.linea, this.col);
                    case Tipo_1.tipoDato.CARACTER:
                        let trans = comp2 + '';
                        let res = trans.charCodeAt(0);
                        return parseInt(comp1) >= res;
                    case Tipo_1.tipoDato.CADENA:
                        return new Errores_1.default('Semantico', 'No se puede comparar Entero con Cadena', this.linea, this.col);
                    default:
                        return new Errores_1.default('Semantico', 'Tipo Dato Invalido', this.linea, this.col);
                }
            case Tipo_1.tipoDato.DECIMAL:
                switch (comparando2) {
                    case Tipo_1.tipoDato.ENTERO:
                        return parseFloat(comp1) >= parseFloat(comp2);
                    case Tipo_1.tipoDato.DECIMAL:
                        return parseFloat(comp1) >= parseFloat(comp2);
                    case Tipo_1.tipoDato.BOOL:
                        return new Errores_1.default('Semantico', 'No se puede comparar Double con Boolean', this.linea, this.col);
                    case Tipo_1.tipoDato.CARACTER:
                        let trans = comp2 + '';
                        let res = trans.charCodeAt(0);
                        return parseFloat(comp1) >= res;
                    case Tipo_1.tipoDato.CADENA:
                        return new Errores_1.default('Semantico', 'No se puede comparar Double con Cadena', this.linea, this.col);
                    default:
                        return new Errores_1.default('Semantico', 'Tipo Dato Invalido', this.linea, this.col);
                }
            case Tipo_1.tipoDato.BOOL:
                switch (comparando2) {
                    case Tipo_1.tipoDato.ENTERO:
                        return new Errores_1.default('Semantico', 'No se puede comparar Boolean con Entero', this.linea, this.col);
                    case Tipo_1.tipoDato.DECIMAL:
                        return new Errores_1.default('Semantico', 'No se puede comparar Boolean con Double', this.linea, this.col);
                    case Tipo_1.tipoDato.BOOL:
                        return comp1 >= comp2;
                    case Tipo_1.tipoDato.CARACTER:
                        return new Errores_1.default('Semantico', 'No se puede comparar Boolean con Caracter', this.linea, this.col);
                    case Tipo_1.tipoDato.CADENA:
                        return new Errores_1.default('Semantico', 'No se puede comparar Boolean con Cadena', this.linea, this.col);
                    default:
                        return new Errores_1.default('Semantico', 'Tipo Dato Invalido', this.linea, this.col);
                }
            case Tipo_1.tipoDato.CARACTER:
                switch (comparando2) {
                    case Tipo_1.tipoDato.ENTERO:
                        let trans = comp1 + '';
                        let res = trans.charCodeAt(0);
                        return parseInt(comp2) <= res;
                    case Tipo_1.tipoDato.DECIMAL:
                        let trans2 = comp1 + '';
                        let res2 = trans2.charCodeAt(0);
                        return parseFloat(comp2) <= res2;
                    case Tipo_1.tipoDato.BOOL:
                        return new Errores_1.default('Semantico', 'No se puede comparar Caracter con Boolean', this.linea, this.col);
                    case Tipo_1.tipoDato.CARACTER:
                        //conversion primer dato
                        let trans11 = comp1 + '';
                        let res11 = trans11.charCodeAt(0);
                        //conversion segundo dato
                        let trans22 = comp2 + '';
                        let res22 = trans22.charCodeAt(0);
                        return res11 >= res22;
                    case Tipo_1.tipoDato.CADENA:
                        return new Errores_1.default('Semantico', 'No se puede comparar Caracter con Cadena', this.linea, this.col);
                    default:
                        return new Errores_1.default('Semantico', 'Tipo Dato Invalido', this.linea, this.col);
                }
            case Tipo_1.tipoDato.CADENA:
                switch (comparando2) {
                    case Tipo_1.tipoDato.ENTERO:
                        return new Errores_1.default('Semantico', 'No se puede comparar Cadena con Entero', this.linea, this.col);
                    case Tipo_1.tipoDato.DECIMAL:
                        return new Errores_1.default('Semantico', 'No se puede comparar Cadena con Decimal', this.linea, this.col);
                    case Tipo_1.tipoDato.BOOL:
                        return new Errores_1.default('Semantico', 'No se puede comparar Cadena con Boolean', this.linea, this.col);
                    case Tipo_1.tipoDato.CARACTER:
                        return new Errores_1.default('Semantico', 'No se puede comparar Cadena con Caracter', this.linea, this.col);
                    case Tipo_1.tipoDato.CADENA:
                        return comp1 >= comp2;
                    default:
                        return new Errores_1.default('Semantico', 'Tipo Dato Invalido', this.linea, this.col);
                }
            default:
                return new Errores_1.default('Semantico', 'Tipo Dato Invalido', this.linea, this.col);
        }
    }
    generarDot(anterior) {
        var _a, _b;
        let cadena = "";
        let nodo1 = "n" + (indexController_1.numeroNodo.no + 1);
        let nodo2 = "n" + (indexController_1.numeroNodo.no + 2);
        let nodo3 = "n" + (indexController_1.numeroNodo.no + 3);
        indexController_1.numeroNodo.no += 3;
        cadena += nodo1 + "[label=\"EXP\"];\n";
        switch (this.relacional) {
            case Relacional.EQUALS:
                cadena += nodo2 + "[label=\"==\"];\n";
                break;
            case Relacional.NOTEQUAL:
                cadena += nodo2 + "[label=\"!=\"];\n";
                break;
            case Relacional.MENOR:
                cadena += nodo2 + "[label=\"<\"];\n";
                break;
            case Relacional.MENOREQ:
                cadena += nodo2 + "[label=\"<=\"];\n";
                break;
            case Relacional.MAYOR:
                cadena += nodo2 + "[label=\">\"];\n";
                break;
            case Relacional.MAYOREQ:
                cadena += nodo2 + "[label=\">=\"];\n";
                break;
        }
        cadena += nodo3 + "[label=\"EXP\"];\n";
        cadena += anterior + "->" + nodo1 + ";\n";
        cadena += anterior + "->" + nodo2 + ";\n";
        cadena += anterior + "->" + nodo3 + ";\n";
        cadena += (_a = this.cond1) === null || _a === void 0 ? void 0 : _a.generarDot(nodo1);
        cadena += (_b = this.cond2) === null || _b === void 0 ? void 0 : _b.generarDot(nodo3);
        return cadena;
    }
}
exports.default = Relacionales;
var Relacional;
(function (Relacional) {
    Relacional[Relacional["EQUALS"] = 0] = "EQUALS";
    Relacional[Relacional["NOTEQUAL"] = 1] = "NOTEQUAL";
    Relacional[Relacional["MENOR"] = 2] = "MENOR";
    Relacional[Relacional["MENOREQ"] = 3] = "MENOREQ";
    Relacional[Relacional["MAYOR"] = 4] = "MAYOR";
    Relacional[Relacional["MAYOREQ"] = 5] = "MAYOREQ";
})(Relacional = exports.Relacional || (exports.Relacional = {}));
