"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const indexController_1 = require("../../indexController");
const Instruccion_1 = require("../abstracto/Instruccion");
const Errores_1 = __importDefault(require("../excepciones/Errores"));
const simbolo_1 = __importDefault(require("../simbolo/simbolo"));
const Tipo_1 = require("../simbolo/Tipo");
class DeclaracionArray1 extends Instruccion_1.Instruccion {
    constructor(tipo, tipo2, id, size, dimension, linea, col, size2) {
        super(tipo, linea, col);
        this.tipoAux = tipo2;
        this.size1 = size;
        this.size2 = size2;
        this.id = id;
        this.dimension = dimension;
        this.valor = [];
    }
    interpretar(arbol, tabla) {
        if (this.tipoDato.getTipo() != this.tipoAux.getTipo())
            return new Errores_1.default("Semantico", "TEl vector solo debe tener un mismo tipo de dato", this.linea, this.col);
        if (this.dimension == 1) {
            let tamanio = this.size1.interpretar(arbol, tabla);
            if (tamanio instanceof Errores_1.default)
                return tamanio;
            if (this.size1.tipoDato.getTipo() != Tipo_1.tipoDato.ENTERO)
                return new Errores_1.default("Semantico", "Los tamaños de los arreglos deben de ser enteros", this.linea, this.col);
            this.valor = [];
            for (let i = 0; i < tamanio; i++) {
                switch (this.tipoDato.getTipo()) {
                    case Tipo_1.tipoDato.ENTERO:
                        this.valor.push(0);
                        break;
                    case Tipo_1.tipoDato.DECIMAL:
                        this.valor.push(0.0);
                        break;
                    case Tipo_1.tipoDato.BOOL:
                        this.valor.push(true);
                        break;
                    case Tipo_1.tipoDato.CARACTER:
                        this.valor.push('\u0000');
                        break;
                    case Tipo_1.tipoDato.CADENA:
                        this.valor.push("");
                        break;
                    default:
                        return new Errores_1.default("Semantico", "Tipo de dato invalido", this.linea, this.col);
                }
            }
            if (!(tabla.setVariable(new simbolo_1.default(this.tipoDato, this.id, this.valor))))
                return new Errores_1.default("Semantico", "Declaracion de variable '" + this.id + "' ya existente en el ambito", this.linea, this.col);
            arbol.addSimbolo(this.id, "VECTOR", tabla.getNombre(), this.linea, this.col, "[" + this.valor.toString() + "]");
        }
        else {
            let tamanio = this.size1.interpretar(arbol, tabla);
            if (tamanio instanceof Errores_1.default)
                return tamanio;
            if (this.size1.tipoDato.getTipo() != Tipo_1.tipoDato.ENTERO)
                return new Errores_1.default("Semantico", "Los tamaños de los arreglos deben de ser enteros", this.linea, this.col);
            if (!this.size2)
                return new Errores_1.default("Semantico", "Tamaño no definido en el arreglo", this.linea, this.col);
            let tamanio2 = this.size2.interpretar(arbol, tabla);
            if (tamanio2 instanceof Errores_1.default)
                return tamanio2;
            if (this.size2.tipoDato.getTipo() != Tipo_1.tipoDato.ENTERO)
                return new Errores_1.default("Semantico", "Los tamaños de los arreglos deben de ser enteros", this.linea, this.col);
            this.valor = [];
            let valorAux = "[";
            for (let i = 0; i < tamanio; i++) {
                let aux = [];
                for (let j = 0; j < tamanio2; j++) {
                    switch (this.tipoDato.getTipo()) {
                        case Tipo_1.tipoDato.ENTERO:
                            aux.push(0);
                            break;
                        case Tipo_1.tipoDato.DECIMAL:
                            aux.push(0.0);
                            break;
                        case Tipo_1.tipoDato.BOOL:
                            aux.push(true);
                            break;
                        case Tipo_1.tipoDato.CARACTER:
                            aux.push('\u0000');
                            break;
                        case Tipo_1.tipoDato.CADENA:
                            aux.push("");
                            break;
                        default:
                            return new Errores_1.default("Semantico", "Tipo de dato invalido", this.linea, this.col);
                    }
                }
                if (i == 0)
                    valorAux = valorAux + "[" + aux.toString() + "]";
                else
                    valorAux = valorAux + ",[" + aux.toString() + "]";
                this.valor.push(aux);
            }
            valorAux += "]";
            if (!(tabla.setVariable(new simbolo_1.default(this.tipoDato, this.id, this.valor))))
                return new Errores_1.default("Semantico", "Declaracion de variable '" + this.id + "' ya existente en el ambito", this.linea, this.col);
            arbol.addSimbolo(this.id, "VECTOR", tabla.getNombre(), this.linea, this.col, valorAux);
        }
    }
    generarDot(anterior) {
        var _a;
        let cadena = "";
        if (this.dimension == 1) {
            let nodo1 = "n" + (indexController_1.numeroNodo.no + 1);
            let nodo2 = "n" + (indexController_1.numeroNodo.no + 2);
            let nodo3 = "n" + (indexController_1.numeroNodo.no + 3);
            let nodo4 = "n" + (indexController_1.numeroNodo.no + 4);
            let nodo5 = "n" + (indexController_1.numeroNodo.no + 5);
            let nodo6 = "n" + (indexController_1.numeroNodo.no + 6);
            let nodo7 = "n" + (indexController_1.numeroNodo.no + 7);
            let nodo8 = "n" + (indexController_1.numeroNodo.no + 8);
            let nodo9 = "n" + (indexController_1.numeroNodo.no + 9);
            let nodo10 = "n" + (indexController_1.numeroNodo.no + 10);
            let nodo11 = "n" + (indexController_1.numeroNodo.no + 11);
            let nodo12 = "n" + (indexController_1.numeroNodo.no + 12);
            let nodo13 = "n" + (indexController_1.numeroNodo.no + 13);
            let nodo14 = "n" + (indexController_1.numeroNodo.no + 14);
            indexController_1.numeroNodo.no += 14;
            cadena += nodo1 + "[label=\"VEC\"];\n";
            cadena += nodo2 + "[label=\"TIPO\"];\n";
            cadena += nodo3 + "[label=\"ID\"];\n";
            cadena += nodo4 + "[label=\"[\"];\n";
            cadena += nodo5 + "[label=\"]\"];\n";
            cadena += nodo6 + "[label=\"=\"];\n";
            cadena += nodo7 + "[label=\"new\"];\n";
            cadena += nodo8 + "[label=\"TIPO\"];\n";
            cadena += nodo9 + "[label=\"[\"];\n";
            cadena += nodo10 + "[label=\"EXP\"];\n";
            cadena += nodo11 + "[label=\"]\"];\n";
            cadena += nodo12 + "[label=\";\"];\n";
            switch (this.tipoDato.getTipo()) {
                case Tipo_1.tipoDato.ENTERO:
                    cadena += nodo13 + "[label=\"int\"];\n";
                    cadena += nodo14 + "[label=\"int\"];\n";
                    break;
                case Tipo_1.tipoDato.DECIMAL:
                    cadena += nodo13 + "[label=\"double\"];\n";
                    cadena += nodo14 + "[label=\"double\"];\n";
                    break;
                case Tipo_1.tipoDato.BOOL:
                    cadena += nodo13 + "[label=\"boolean\"];\n";
                    cadena += nodo14 + "[label=\"boolean\"];\n";
                    break;
                case Tipo_1.tipoDato.CARACTER:
                    cadena += nodo13 + "[label=\"char\"];\n";
                    cadena += nodo14 + "[label=\"char\"];\n";
                    break;
                case Tipo_1.tipoDato.CADENA:
                    cadena += nodo13 + "[label=\"string\"];\n";
                    cadena += nodo14 + "[label=\"string\"];\n";
                    break;
            }
            cadena += anterior + "->" + nodo1 + ";\n";
            cadena += nodo1 + "->" + nodo2 + ";\n";
            cadena += nodo1 + "->" + nodo3 + ";\n";
            cadena += nodo1 + "->" + nodo4 + ";\n";
            cadena += nodo1 + "->" + nodo5 + ";\n";
            cadena += nodo1 + "->" + nodo6 + ";\n";
            cadena += nodo1 + "->" + nodo7 + ";\n";
            cadena += nodo1 + "->" + nodo8 + ";\n";
            cadena += nodo1 + "->" + nodo9 + ";\n";
            cadena += nodo1 + "->" + nodo10 + ";\n";
            cadena += nodo1 + "->" + nodo11 + ";\n";
            cadena += nodo1 + "->" + nodo12 + ";\n";
            cadena += nodo2 + "->" + nodo13 + ";\n";
            cadena += nodo8 + "->" + nodo14 + ";\n";
            cadena += this.size1.generarDot(nodo10);
            return cadena;
        }
        else {
            let nodo1 = "n" + (indexController_1.numeroNodo.no + 1);
            let nodo2 = "n" + (indexController_1.numeroNodo.no + 2);
            let nodo3 = "n" + (indexController_1.numeroNodo.no + 3);
            let nodo4 = "n" + (indexController_1.numeroNodo.no + 4);
            let nodo5 = "n" + (indexController_1.numeroNodo.no + 5);
            let nodo6 = "n" + (indexController_1.numeroNodo.no + 6);
            let nodo7 = "n" + (indexController_1.numeroNodo.no + 7);
            let nodo8 = "n" + (indexController_1.numeroNodo.no + 8);
            let nodo9 = "n" + (indexController_1.numeroNodo.no + 9);
            let nodo10 = "n" + (indexController_1.numeroNodo.no + 10);
            let nodo11 = "n" + (indexController_1.numeroNodo.no + 11);
            let nodo12 = "n" + (indexController_1.numeroNodo.no + 12);
            let nodo13 = "n" + (indexController_1.numeroNodo.no + 13);
            let nodo14 = "n" + (indexController_1.numeroNodo.no + 14);
            let nodo15 = "n" + (indexController_1.numeroNodo.no + 15);
            let nodo16 = "n" + (indexController_1.numeroNodo.no + 16);
            let nodo17 = "n" + (indexController_1.numeroNodo.no + 17);
            let nodo18 = "n" + (indexController_1.numeroNodo.no + 18);
            let nodo19 = "n" + (indexController_1.numeroNodo.no + 19);
            indexController_1.numeroNodo.no += 19;
            cadena += nodo1 + "[label=\"VEC\"];\n";
            cadena += nodo2 + "[label=\"TIPO\"];\n";
            cadena += nodo3 + "[label=\"ID\"];\n";
            cadena += nodo4 + "[label=\"[\"];\n";
            cadena += nodo5 + "[label=\"]\"];\n";
            cadena += nodo6 + "[label=\"[\"];\n";
            cadena += nodo7 + "[label=\"]\"];\n";
            cadena += nodo8 + "[label=\"=\"];\n";
            cadena += nodo9 + "[label=\"new\"];\n";
            cadena += nodo10 + "[label=\"TIPO\"];\n";
            cadena += nodo11 + "[label=\"[\"];\n";
            cadena += nodo12 + "[label=\"EXP\"];\n";
            cadena += nodo13 + "[label=\"]\"];\n";
            cadena += nodo14 + "[label=\"[\"];\n";
            cadena += nodo15 + "[label=\"EXP\"];\n";
            cadena += nodo16 + "[label=\"]\"];\n";
            cadena += nodo17 + "[label=\";\"];\n";
            switch (this.tipoDato.getTipo()) {
                case Tipo_1.tipoDato.ENTERO:
                    cadena += nodo18 + "[label=\"int\"];\n";
                    cadena += nodo19 + "[label=\"int\"];\n";
                    break;
                case Tipo_1.tipoDato.DECIMAL:
                    cadena += nodo18 + "[label=\"double\"];\n";
                    cadena += nodo19 + "[label=\"double\"];\n";
                    break;
                case Tipo_1.tipoDato.BOOL:
                    cadena += nodo18 + "[label=\"boolean\"];\n";
                    cadena += nodo19 + "[label=\"boolean\"];\n";
                    break;
                case Tipo_1.tipoDato.CARACTER:
                    cadena += nodo18 + "[label=\"char\"];\n";
                    cadena += nodo19 + "[label=\"char\"];\n";
                    break;
                case Tipo_1.tipoDato.CADENA:
                    cadena += nodo18 + "[label=\"string\"];\n";
                    cadena += nodo19 + "[label=\"string\"];\n";
                    break;
            }
            cadena += anterior + "->" + nodo1 + ";\n";
            cadena += nodo1 + "->" + nodo2 + ";\n";
            cadena += nodo1 + "->" + nodo3 + ";\n";
            cadena += nodo1 + "->" + nodo4 + ";\n";
            cadena += nodo1 + "->" + nodo5 + ";\n";
            cadena += nodo1 + "->" + nodo6 + ";\n";
            cadena += nodo1 + "->" + nodo7 + ";\n";
            cadena += nodo1 + "->" + nodo8 + ";\n";
            cadena += nodo1 + "->" + nodo9 + ";\n";
            cadena += nodo1 + "->" + nodo10 + ";\n";
            cadena += nodo1 + "->" + nodo11 + ";\n";
            cadena += nodo1 + "->" + nodo12 + ";\n";
            cadena += nodo1 + "->" + nodo13 + ";\n";
            cadena += nodo1 + "->" + nodo14 + ";\n";
            cadena += nodo1 + "->" + nodo15 + ";\n";
            cadena += nodo1 + "->" + nodo16 + ";\n";
            cadena += nodo1 + "->" + nodo17 + ";\n";
            cadena += nodo2 + "->" + nodo18 + ";\n";
            cadena += nodo10 + "->" + nodo19 + ";\n";
            cadena += this.size1.generarDot(nodo10);
            cadena += (_a = this.size2) === null || _a === void 0 ? void 0 : _a.generarDot(nodo15);
            return cadena;
        }
    }
}
exports.default = DeclaracionArray1;
