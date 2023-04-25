"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const indexController_1 = require("../../indexController");
const Instruccion_1 = require("../abstracto/Instruccion");
const Tipo_1 = require("../simbolo/Tipo");
class Nativo extends Instruccion_1.Instruccion {
    constructor(tipo, valor, fila, col) {
        super(tipo, fila, col);
        this.valor = valor;
    }
    interpretar(arbol, tabla) {
        if (this.tipoDato.getTipo() == Tipo_1.tipoDato.BOOL) {
            return this.valor == "true" ? true : false;
        }
        if (this.tipoDato.getTipo() == Tipo_1.tipoDato.CADENA) {
            let val = this.valor.toString();
            this.valor = val.replace('\\n', '\n').replace('\\t', '\t').replace('\\r', '\r').replace('\\\\', '\\').replace("\\'", "'").replace('\\"', '"');
        }
        return this.valor;
    }
    generarDot(anterior) {
        let nodoNativo = "n" + (indexController_1.numeroNodo.no + 1);
        let nodoNativo2 = "n" + (indexController_1.numeroNodo.no + 2);
        let cadena = "";
        cadena += nodoNativo + "[label=\"NATIVO\"];\n";
        cadena += anterior + "->" + nodoNativo + ";\n";
        let value = this.valor;
        if (this.tipoDato.getTipo() == Tipo_1.tipoDato.CADENA) {
            let val = this.valor.toString();
            value = val.replace('\n', '\\n').replace('\t', '\\t').replace('\r', '\\r').replace('\\', '\\\\').replace("'", "\\'").replace('"', '\\"');
        }
        cadena += nodoNativo2 + "[label=\"" + value + "\"]\n";
        cadena += nodoNativo + "->" + nodoNativo2 + ";\n";
        indexController_1.numeroNodo.no += 2;
        return cadena;
    }
}
exports.default = Nativo;
