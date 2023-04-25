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
exports.Opcion = void 0;
const Instruccion_1 = require("../abstracto/Instruccion");
const Tipo_1 = __importStar(require("../simbolo/Tipo"));
const indexController_1 = require("../../indexController");
class BreakContinue extends Instruccion_1.Instruccion {
    constructor(option, linea, col) {
        super(new Tipo_1.default(Tipo_1.tipoDato.VOID), linea, col);
        this.opcion = option;
    }
    interpretar(arbol, tabla) {
        return;
    }
    generarDot(anterior) {
        let cadena = "";
        let nodo1 = "n" + (indexController_1.numeroNodo.no + 1);
        let nodo2 = "n" + (indexController_1.numeroNodo.no + 2);
        let nodo3 = "n" + (indexController_1.numeroNodo.no + 3);
        indexController_1.numeroNodo.no += 3;
        if (this.opcion == Opcion.BREAK) {
            cadena += nodo1 + "[label=\"TBREAK\"];\n";
            cadena += nodo2 + "[label=\"break\"];\n";
        }
        else {
            cadena += nodo1 + "[label=\"TCONTINUE\"];\n";
            cadena += nodo2 + "[label=\"continue\"];\n";
        }
        cadena += nodo3 + "[label=\";\"];\n";
        cadena += anterior + "->" + nodo1 + ";\n";
        cadena += nodo1 + "->" + nodo2 + ";\n";
        cadena += nodo1 + "->" + nodo3 + ";\n";
        return cadena;
    }
}
exports.default = BreakContinue;
var Opcion;
(function (Opcion) {
    Opcion[Opcion["BREAK"] = 0] = "BREAK";
    Opcion[Opcion["CONTINUE"] = 1] = "CONTINUE";
})(Opcion = exports.Opcion || (exports.Opcion = {}));
