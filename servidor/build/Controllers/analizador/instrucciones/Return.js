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
Object.defineProperty(exports, "__esModule", { value: true });
const Instruccion_1 = require("../abstracto/Instruccion");
const Tipo_1 = __importStar(require("../simbolo/Tipo"));
const indexController_1 = require("../../indexController");
class Return extends Instruccion_1.Instruccion {
    constructor(linea, col, valor) {
        super(new Tipo_1.default(Tipo_1.tipoDato.VOID), linea, col);
        this.value = null;
        this.valor = valor;
    }
    interpretar(arbol, tabla) {
        if (this.valor) {
            this.value = this.valor.interpretar(arbol, tabla);
            this.tipoDato = this.valor.tipoDato;
        }
        return this;
    }
    generarDot(anterior) {
        var _a;
        let cadena = "";
        if (this.tipoDato.getTipo() == Tipo_1.tipoDato.VOID) {
            let nodo1 = "n" + (indexController_1.numeroNodo.no + 1);
            let nodo2 = "n" + (indexController_1.numeroNodo.no + 2);
            let nodo3 = "n" + (indexController_1.numeroNodo.no + 3);
            indexController_1.numeroNodo.no += 3;
            cadena += nodo1 + "[label=\"TRETURN\"];\n";
            cadena += nodo2 + "[label=\"return\"];\n";
            cadena += nodo3 + "[label=\";\"];\n";
            cadena += anterior + "->" + nodo1 + ";\n";
            cadena += nodo1 + "->" + nodo2 + ";\n";
            cadena += nodo1 + "->" + nodo3 + ";\n";
            return cadena;
        }
        else {
            let nodo1 = "n" + (indexController_1.numeroNodo.no + 1);
            let nodo2 = "n" + (indexController_1.numeroNodo.no + 2);
            let nodo3 = "n" + (indexController_1.numeroNodo.no + 3);
            let nodo4 = "n" + (indexController_1.numeroNodo.no + 4);
            indexController_1.numeroNodo.no += 4;
            cadena += nodo1 + "[label=\"TRETURN\"];\n";
            cadena += nodo2 + "[label=\"return\"];\n";
            cadena += nodo3 + "[label=\"EXP\"];\n";
            cadena += nodo4 + "[label=\";\"];\n";
            cadena += anterior + "->" + nodo1 + ";\n";
            cadena += nodo1 + "->" + nodo2 + ";\n";
            cadena += nodo1 + "->" + nodo3 + ";\n";
            cadena += nodo1 + "->" + nodo4 + ";\n";
            cadena += (_a = this.valor) === null || _a === void 0 ? void 0 : _a.generarDot(nodo3);
            return cadena;
        }
    }
}
exports.default = Return;
