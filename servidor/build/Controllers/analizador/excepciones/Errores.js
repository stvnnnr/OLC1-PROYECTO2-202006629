"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Errores {
    constructor(tipo, desc, fila, col) {
        this.tipoError = tipo;
        this.desc = desc;
        this.fila = fila;
        this.col = col;
    }
    getDesc() {
        return this.desc;
    }
    getTipoError() {
        return this.tipoError;
    }
    getFila() {
        return this.fila;
    }
    getCol() {
        return this.col;
    }
    getErrores() {
        return { "tipo": this.tipoError, "desc": this.desc, "linea": this.fila, "col": this.col };
    }
    toString() {
        return "----- Error " + this.tipoError + ": " + this.desc + " en la linea " + this.fila + " y columna " + this.col + " ----";
    }
}
exports.default = Errores;
