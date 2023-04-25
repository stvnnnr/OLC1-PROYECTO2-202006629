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
exports.Funciones = void 0;
const indexController_1 = require("../../indexController");
const Instruccion_1 = require("../abstracto/Instruccion");
const Errores_1 = __importDefault(require("../excepciones/Errores"));
const Tipo_1 = __importStar(require("../simbolo/Tipo"));
class FuncNativas extends Instruccion_1.Instruccion {
    constructor(expresion, funcion, linea, col) {
        super(new Tipo_1.default(Tipo_1.tipoDato.VOID), linea, col);
        this.expresion = expresion;
        this.funcion = funcion;
    }
    interpretar(arbol, tabla) {
        let verificacion = this.expresion.interpretar(arbol, tabla);
        if (verificacion instanceof Errores_1.default)
            return verificacion;
        switch (this.funcion) {
            case Funciones.TOCHARARRAY:
                return this.tochararray(verificacion);
            case Funciones.TOSTRING:
                return this.tostring(verificacion);
            case Funciones.TYPEOF:
                return this.typeoff(verificacion);
            case Funciones.LENGTH:
                return this.length(verificacion);
            case Funciones.ROUND:
                return this.roundd(verificacion);
            case Funciones.TOLOWER:
                return this.tolowerr(verificacion);
            case Funciones.TOUPPER:
                return this.toUpperr(verificacion);
            default:
                return new Errores_1.default('Semantico', 'Funcion nativa no valida', this.linea, this.col);
        }
    }
    tochararray(verificacion) {
        if (this.expresion.tipoDato.getTipo() != Tipo_1.tipoDato.CADENA)
            return new Errores_1.default('Semantico', 'Solo cadenas pueden convertirse en char array', this.linea, this.col);
        this.tipoDato.setTipo(Tipo_1.tipoDato.CARACTER);
        return Array.from(verificacion);
    }
    tostring(verificacion) {
        if (this.expresion.tipoDato.getTipo() != Tipo_1.tipoDato.ENTERO && this.expresion.tipoDato.getTipo() != Tipo_1.tipoDato.DECIMAL && this.expresion.tipoDato.getTipo() != Tipo_1.tipoDato.BOOL)
            return new Errores_1.default('Semantico', 'Tipo de dato no valido para funcion toString', this.linea, this.col);
        this.tipoDato.setTipo(Tipo_1.tipoDato.CADENA);
        if (this.expresion.tipoDato.getTipo() == Tipo_1.tipoDato.BOOL) {
            if (verificacion)
                return "true";
            return "false";
        }
        else {
            return "" + verificacion;
        }
    }
    typeoff(verificacion) {
        this.tipoDato.setTipo(Tipo_1.tipoDato.CADENA);
        if (typeof verificacion == "object")
            return "vector";
        switch (this.expresion.tipoDato.getTipo()) {
            case Tipo_1.tipoDato.ENTERO:
                return "int";
            case Tipo_1.tipoDato.DECIMAL:
                return "double";
            case Tipo_1.tipoDato.BOOL:
                return "boolean";
            case Tipo_1.tipoDato.CARACTER:
                return "char";
            case Tipo_1.tipoDato.CADENA:
                return "string";
            default:
                new Errores_1.default('Semantico', 'Tipo no valido en typeof', this.linea, this.col);
        }
    }
    length(verificacion) {
        this.tipoDato.setTipo(Tipo_1.tipoDato.ENTERO);
        if (typeof verificacion == "object" || this.expresion.tipoDato.getTipo() == Tipo_1.tipoDato.CADENA)
            return verificacion.length;
    }
    roundd(verificacion) {
        if (this.expresion.tipoDato.getTipo() != Tipo_1.tipoDato.DECIMAL)
            return new Errores_1.default('Semantico', 'Tipo de dato no valido para funcion round', this.linea, this.col);
        this.tipoDato.setTipo(Tipo_1.tipoDato.ENTERO);
        return Math.round(verificacion);
    }
    tolowerr(verificacion) {
        if (this.expresion.tipoDato.getTipo() != Tipo_1.tipoDato.CADENA)
            return new Errores_1.default('Semantico', 'Tipo de dato no valido para funcion toLower', this.linea, this.col);
        this.tipoDato.setTipo(Tipo_1.tipoDato.CADENA);
        return verificacion.toLowerCase();
    }
    toUpperr(verificacion) {
        if (this.expresion.tipoDato.getTipo() != Tipo_1.tipoDato.CADENA)
            return new Errores_1.default('Semantico', 'Tipo de dato no valido para funcion toUpper', this.linea, this.col);
        this.tipoDato.setTipo(Tipo_1.tipoDato.CADENA);
        return verificacion.toUpperCase();
    }
    generarDot(anterior) {
        let cadena = "";
        let nodo1 = "n" + (indexController_1.numeroNodo.no + 1);
        let nodo2 = "n" + (indexController_1.numeroNodo.no + 2);
        let nodo3 = "n" + (indexController_1.numeroNodo.no + 3);
        let nodo4 = "n" + (indexController_1.numeroNodo.no + 4);
        let nodo5 = "n" + (indexController_1.numeroNodo.no + 5);
        indexController_1.numeroNodo.no += 5;
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
exports.default = FuncNativas;
var Funciones;
(function (Funciones) {
    Funciones[Funciones["TOCHARARRAY"] = 0] = "TOCHARARRAY";
    Funciones[Funciones["TOSTRING"] = 1] = "TOSTRING";
    Funciones[Funciones["TYPEOF"] = 2] = "TYPEOF";
    Funciones[Funciones["LENGTH"] = 3] = "LENGTH";
    Funciones[Funciones["ROUND"] = 4] = "ROUND";
    Funciones[Funciones["TOLOWER"] = 5] = "TOLOWER";
    Funciones[Funciones["TOUPPER"] = 6] = "TOUPPER";
})(Funciones = exports.Funciones || (exports.Funciones = {}));
