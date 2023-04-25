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
const Instruccion_1 = require("../abstracto/Instruccion");
const Errores_1 = __importDefault(require("../excepciones/Errores"));
const Tipo_1 = __importStar(require("../simbolo/Tipo"));
const indexController_1 = require("../../indexController");
class CaseDef extends Instruccion_1.Instruccion {
    constructor(def, exp, linea, col, cond) {
        super(new Tipo_1.default(Tipo_1.tipoDato.VOID), linea, col);
        this.caso = cond;
        this.expresiones = exp;
        this.def = def;
    }
    interpretar(arbol, tabla) {
        var _a, _b;
        if (this.caso) {
            let resultado = (_a = this.caso) === null || _a === void 0 ? void 0 : _a.interpretar(arbol, tabla);
            this.tipoDato.setTipo((_b = this.caso) === null || _b === void 0 ? void 0 : _b.tipoDato.getTipo());
            return resultado;
        }
    }
    getExpresiones() {
        return this.expresiones;
    }
    generarDot(anterior) {
        var _a;
        let cadena = "";
        if (this.def) {
            let nodo1 = "n" + (indexController_1.numeroNodo.no + 1);
            let nodo2 = "n" + (indexController_1.numeroNodo.no + 2);
            let nodo3 = "n" + (indexController_1.numeroNodo.no + 3);
            let nodo4 = "n" + (indexController_1.numeroNodo.no + 4);
            indexController_1.numeroNodo.no += 4;
            cadena += nodo1 + "[label=\"SDEF\"];\n";
            cadena += nodo2 + "[label=\"default\"];\n";
            cadena += nodo3 + "[label=\":\"];\n";
            cadena += nodo4 + "[label=\"INSTRUCCIONES\"];\n";
            cadena += anterior + "->" + nodo1 + ";\n";
            cadena += nodo1 + "->" + nodo2 + ";\n";
            cadena += nodo1 + "->" + nodo3 + ";\n";
            cadena += nodo1 + "->" + nodo4 + ";\n";
            for (let i of this.expresiones) {
                if (!(i instanceof Errores_1.default)) {
                    cadena += i.generarDot(nodo4);
                }
            }
            return cadena;
        }
        else {
            let nodo1 = "n" + (indexController_1.numeroNodo.no + 1);
            let nodo2 = "n" + (indexController_1.numeroNodo.no + 2);
            let nodo3 = "n" + (indexController_1.numeroNodo.no + 3);
            let nodo4 = "n" + (indexController_1.numeroNodo.no + 4);
            let nodo5 = "n" + (indexController_1.numeroNodo.no + 5);
            indexController_1.numeroNodo.no += 5;
            cadena += nodo1 + "[label=\"SCASE\"];\n";
            cadena += nodo2 + "[label=\"case\"];\n";
            cadena += nodo3 + "[label=\"EXP\"];\n";
            cadena += nodo4 + "[label=\":\"];\n";
            cadena += nodo5 + "[label=\"INSTRUCCIONES\"];\n";
            cadena += anterior + "->" + nodo1 + ";\n";
            cadena += nodo1 + "->" + nodo2 + ";\n";
            cadena += nodo1 + "->" + nodo3 + ";\n";
            cadena += nodo1 + "->" + nodo4 + ";\n";
            cadena += nodo1 + "->" + nodo5 + ";\n";
            cadena += (_a = this.caso) === null || _a === void 0 ? void 0 : _a.generarDot(nodo3);
            for (let i of this.expresiones) {
                if (!(i instanceof Errores_1.default)) {
                    cadena += i.generarDot(nodo5);
                }
            }
            return cadena;
        }
    }
}
exports.default = CaseDef;
