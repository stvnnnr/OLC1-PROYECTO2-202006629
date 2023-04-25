"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tipoDato = void 0;
class Tipo {
    constructor(tipo) {
        this.tipo = tipo;
    }
    setTipo(tipo) {
        this.tipo = tipo;
    }
    getTipo() {
        return this.tipo;
    }
    Equals(comparando) {
        return (this.tipo == comparando.tipo);
    }
}
exports.default = Tipo;
var tipoDato;
(function (tipoDato) {
    tipoDato[tipoDato["ENTERO"] = 0] = "ENTERO";
    tipoDato[tipoDato["DECIMAL"] = 1] = "DECIMAL";
    tipoDato[tipoDato["BOOL"] = 2] = "BOOL";
    tipoDato[tipoDato["CARACTER"] = 3] = "CARACTER";
    tipoDato[tipoDato["CADENA"] = 4] = "CADENA";
    tipoDato[tipoDato["VOID"] = 5] = "VOID";
})(tipoDato = exports.tipoDato || (exports.tipoDato = {}));
