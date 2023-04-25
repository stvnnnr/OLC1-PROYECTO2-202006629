"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Instruccion = void 0;
class Instruccion {
    constructor(tipo, linea, col) {
        this.tipoDato = tipo;
        this.linea = linea;
        this.col = col;
    }
}
exports.Instruccion = Instruccion;
