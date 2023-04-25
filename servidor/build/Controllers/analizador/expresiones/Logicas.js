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
exports.Logica = void 0;
const indexController_1 = require("../../indexController");
const Instruccion_1 = require("../abstracto/Instruccion");
const Errores_1 = __importDefault(require("../excepciones/Errores"));
const Tipo_1 = __importStar(require("../simbolo/Tipo"));
class Logicas extends Instruccion_1.Instruccion {
    constructor(logica, fila, col, log1, log2) {
        super(new Tipo_1.default(Tipo_1.tipoDato.BOOL), fila, col);
        this.logica = logica;
        if (!log2)
            this.logicU = log1;
        else {
            this.logic1 = log1;
            this.logic2 = log2;
        }
    }
    interpretar(arbol, tabla) {
        var _a, _b;
        let logIzq, logDer, Unico = null;
        if (this.logicU != null) {
            Unico = this.logicU.interpretar(arbol, tabla);
            if (Unico instanceof Errores_1.default)
                return Unico;
        }
        else {
            logIzq = (_a = this.logic1) === null || _a === void 0 ? void 0 : _a.interpretar(arbol, tabla);
            if (logIzq instanceof Errores_1.default)
                return logIzq;
            logDer = (_b = this.logic2) === null || _b === void 0 ? void 0 : _b.interpretar(arbol, tabla);
            if (logDer instanceof Errores_1.default)
                return logDer;
        }
        switch (this.logica) {
            case Logica.OR:
                return this.or(logIzq, logDer);
            case Logica.AND:
                return this.and(logIzq, logDer);
            case Logica.NOT:
                return this.not(Unico);
            default:
                return new Errores_1.default('Semantico', 'Operador Logico Invalido', this.linea, this.col);
        }
    }
    or(log1, log2) {
        var _a, _b;
        let logicando1 = (_a = this.logic1) === null || _a === void 0 ? void 0 : _a.tipoDato.getTipo();
        let logicando2 = (_b = this.logic2) === null || _b === void 0 ? void 0 : _b.tipoDato.getTipo();
        if (logicando1 != Tipo_1.tipoDato.BOOL || logicando2 != Tipo_1.tipoDato.BOOL) {
            return new Errores_1.default('Semantico', 'Solo Booleanos se pueden comparar logicamente', this.linea, this.col);
        }
        else {
            return log1 || log2;
        }
    }
    and(log1, log2) {
        var _a, _b;
        let logicando1 = (_a = this.logic1) === null || _a === void 0 ? void 0 : _a.tipoDato.getTipo();
        let logicando2 = (_b = this.logic2) === null || _b === void 0 ? void 0 : _b.tipoDato.getTipo();
        if (logicando1 != Tipo_1.tipoDato.BOOL || logicando2 != Tipo_1.tipoDato.BOOL) {
            return new Errores_1.default('Semantico', 'Solo Booleanos se pueden comparar logicamente', this.linea, this.col);
        }
        else {
            return log1 && log2;
        }
    }
    not(logU) {
        var _a;
        let logicandoUnico = (_a = this.logicU) === null || _a === void 0 ? void 0 : _a.tipoDato.getTipo();
        if (logicandoUnico != Tipo_1.tipoDato.BOOL)
            return new Errores_1.default('Semantico', 'Solo Booleanos se pueden comparar logicamente', this.linea, this.col);
        else {
            return !logU;
        }
    }
    generarDot(anterior) {
        var _a, _b;
        let cadena = "";
        if (this.logicU != null) {
            let nodo1 = "n" + (indexController_1.numeroNodo.no + 1);
            let nodo2 = "n" + (indexController_1.numeroNodo.no + 2);
            indexController_1.numeroNodo.no += 2;
            cadena += nodo1 + "[label=\"!\"];\n";
            cadena += nodo2 + "[label=\"EXP\"];\n";
            cadena += anterior + "->" + nodo1 + ";\n";
            cadena += anterior + "->" + nodo2 + ";\n";
            cadena += this.logicU.generarDot(nodo2);
            return cadena;
        }
        else {
            let nodo1 = "n" + (indexController_1.numeroNodo.no + 1);
            let nodo2 = "n" + (indexController_1.numeroNodo.no + 2);
            let nodo3 = "n" + (indexController_1.numeroNodo.no + 3);
            indexController_1.numeroNodo.no += 3;
            cadena += nodo1 + "[label=\"EXP\"];\n";
            switch (this.logica) {
                case Logica.AND:
                    cadena += nodo2 + "[label=\"&&\"];\n";
                    break;
                case Logica.OR:
                    cadena += nodo2 + "[label=\"||\"];\n";
                    break;
            }
            cadena += nodo3 + "[label=\"EXP\"];\n";
            cadena += anterior + "->" + nodo1 + ";\n";
            cadena += anterior + "->" + nodo2 + ";\n";
            cadena += anterior + "->" + nodo3 + ";\n";
            cadena += (_a = this.logic1) === null || _a === void 0 ? void 0 : _a.generarDot(nodo1);
            cadena += (_b = this.logic2) === null || _b === void 0 ? void 0 : _b.generarDot(nodo3);
            return cadena;
        }
    }
}
exports.default = Logicas;
var Logica;
(function (Logica) {
    Logica[Logica["OR"] = 0] = "OR";
    Logica[Logica["AND"] = 1] = "AND";
    Logica[Logica["NOT"] = 2] = "NOT";
})(Logica = exports.Logica || (exports.Logica = {}));
