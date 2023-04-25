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
class DeclaracionVar extends Instruccion_1.Instruccion {
    constructor(tipo, linea, col, ids, val) {
        super(tipo, linea, col);
        this.identificadores = ids;
        this.valor = val;
    }
    interpretar(arbol, tabla) {
        if (!this.valor) {
            switch (this.tipoDato.getTipo()) {
                case Tipo_1.tipoDato.ENTERO:
                    for (let i = 0; i < this.identificadores.length; i++) {
                        if (!(tabla.setVariable(new simbolo_1.default(this.tipoDato, this.identificadores[i], 0))))
                            return new Errores_1.default("Semantico", "Declaracion de variable '" + this.identificadores[i] + "' ya existente en el ambito", this.linea, this.col);
                        arbol.addSimbolo(this.identificadores[i], "ENTERO", tabla.getNombre(), this.linea, this.col, "0");
                    }
                    break;
                case Tipo_1.tipoDato.DECIMAL:
                    for (let i = 0; i < this.identificadores.length; i++) {
                        if (!(tabla.setVariable(new simbolo_1.default(this.tipoDato, this.identificadores[i], 0.0))))
                            return new Errores_1.default("Semantico", "Declaracion de variable '" + this.identificadores[i] + "' ya existente en el ambito", this.linea, this.col);
                        arbol.addSimbolo(this.identificadores[i], "DOUBLE", tabla.getNombre(), this.linea, this.col, "0.0");
                    }
                    break;
                case Tipo_1.tipoDato.BOOL:
                    for (let i = 0; i < this.identificadores.length; i++) {
                        if (!(tabla.setVariable(new simbolo_1.default(this.tipoDato, this.identificadores[i], true))))
                            return new Errores_1.default("Semantico", "Declaracion de variable '" + this.identificadores[i] + "' ya existente en el ambito", this.linea, this.col);
                        arbol.addSimbolo(this.identificadores[i], "BOOLEAN", tabla.getNombre(), this.linea, this.col, "true");
                    }
                    break;
                case Tipo_1.tipoDato.CARACTER:
                    for (let i = 0; i < this.identificadores.length; i++) {
                        if (!(tabla.setVariable(new simbolo_1.default(this.tipoDato, this.identificadores[i], '\u0000'))))
                            return new Errores_1.default("Semantico", "Declaracion de variable '" + this.identificadores[i] + "' ya existente en el ambito", this.linea, this.col);
                        arbol.addSimbolo(this.identificadores[i], "CHAR", tabla.getNombre(), this.linea, this.col, '\u0000');
                    }
                    break;
                case Tipo_1.tipoDato.CADENA:
                    for (let i = 0; i < this.identificadores.length; i++) {
                        if (!(tabla.setVariable(new simbolo_1.default(this.tipoDato, this.identificadores[i], ""))))
                            return new Errores_1.default("Semantico", "Declaracion de variable '" + this.identificadores[i] + "' ya existente en el ambito", this.linea, this.col);
                        arbol.addSimbolo(this.identificadores[i], "STRING", tabla.getNombre(), this.linea, this.col, "");
                    }
                    break;
                default:
                    return new Errores_1.default("Semantico", "Asigancion de no valida", this.linea, this.col);
            }
        }
        else {
            let valorInterpretado = this.valor.interpretar(arbol, tabla);
            if (valorInterpretado instanceof Errores_1.default)
                return valorInterpretado;
            if (this.tipoDato.getTipo() != this.valor.tipoDato.getTipo())
                return new Errores_1.default("Semantico", "Tipo de variable y de valor diferentes", this.linea, this.col);
            else {
                switch (this.tipoDato.getTipo()) {
                    case Tipo_1.tipoDato.ENTERO:
                        for (let i = 0; i < this.identificadores.length; i++) {
                            if (!(tabla.setVariable(new simbolo_1.default(this.tipoDato, this.identificadores[i], parseInt(valorInterpretado)))))
                                return new Errores_1.default("Semantico", "Declaracion de variable '" + this.identificadores[i] + "' ya existente en el ambito", this.linea, this.col);
                            arbol.addSimbolo(this.identificadores[i], "ENTERO", tabla.getNombre(), this.linea, this.col, valorInterpretado);
                        }
                        break;
                    case Tipo_1.tipoDato.DECIMAL:
                        for (let i = 0; i < this.identificadores.length; i++) {
                            if (!(tabla.setVariable(new simbolo_1.default(this.tipoDato, this.identificadores[i], parseFloat(valorInterpretado)))))
                                return new Errores_1.default("Semantico", "Declaracion de variable '" + this.identificadores[i] + "' ya existente en el ambito", this.linea, this.col);
                            arbol.addSimbolo(this.identificadores[i], "DOUBLE", tabla.getNombre(), this.linea, this.col, valorInterpretado);
                        }
                        break;
                    case Tipo_1.tipoDato.BOOL:
                        for (let i = 0; i < this.identificadores.length; i++) {
                            if (!(tabla.setVariable(new simbolo_1.default(this.tipoDato, this.identificadores[i], valorInterpretado))))
                                return new Errores_1.default("Semantico", "Declaracion de variable '" + this.identificadores[i] + "' ya existente en el ambito", this.linea, this.col);
                            arbol.addSimbolo(this.identificadores[i], "BOOLEAN", tabla.getNombre(), this.linea, this.col, "" + valorInterpretado);
                        }
                        break;
                    case Tipo_1.tipoDato.CARACTER:
                        for (let i = 0; i < this.identificadores.length; i++) {
                            if (!(tabla.setVariable(new simbolo_1.default(this.tipoDato, this.identificadores[i], valorInterpretado))))
                                return new Errores_1.default("Semantico", "Declaracion de variable '" + this.identificadores[i] + "' ya existente en el ambito", this.linea, this.col);
                            arbol.addSimbolo(this.identificadores[i], "CHAR", tabla.getNombre(), this.linea, this.col, valorInterpretado);
                        }
                        break;
                    case Tipo_1.tipoDato.CADENA:
                        for (let i = 0; i < this.identificadores.length; i++) {
                            if (!(tabla.setVariable(new simbolo_1.default(this.tipoDato, this.identificadores[i], valorInterpretado))))
                                return new Errores_1.default("Semantico", "Declaracion de variable '" + this.identificadores[i] + "' ya existente en el ambito", this.linea, this.col);
                            arbol.addSimbolo(this.identificadores[i], "STRING", tabla.getNombre(), this.linea, this.col, valorInterpretado);
                        }
                        break;
                    default:
                        return new Errores_1.default("Semantico", "Asigancion de no valida", this.linea, this.col);
                }
            }
        }
    }
    generarDot(anterior) {
        let cadena = "";
        let nodo1 = "n" + (indexController_1.numeroNodo.no + 1);
        let nodo2 = "n" + (indexController_1.numeroNodo.no + 2);
        let nodo3 = "n" + (indexController_1.numeroNodo.no + 3);
        let nodo4 = "n" + (indexController_1.numeroNodo.no + 4);
        let nodo5 = "n" + (indexController_1.numeroNodo.no + 5);
        indexController_1.numeroNodo.no += 5;
        cadena += nodo1 + "[label=\"DECLARACION\"];\n";
        cadena += nodo2 + "[label=\"TIPO\"];\n";
        cadena += nodo3 + "[label=\"LISTD\"];\n";
        cadena += nodo4 + "[label=\"DEC2\"];\n";
        cadena += anterior + "->" + nodo1 + ";\n";
        cadena += nodo1 + "->" + nodo2 + ";\n";
        cadena += nodo1 + "->" + nodo3 + ";\n";
        cadena += nodo1 + "->" + nodo4 + ";\n";
        switch (this.tipoDato.getTipo()) {
            case Tipo_1.tipoDato.ENTERO:
                cadena += nodo5 + "[label=\"int\"];\n";
                cadena += nodo2 + "->" + nodo5 + ";\n";
                break;
            case Tipo_1.tipoDato.DECIMAL:
                cadena += nodo5 + "[label=\"double\"];\n";
                cadena += nodo2 + "->" + nodo5 + ";\n";
                break;
            case Tipo_1.tipoDato.BOOL:
                cadena += nodo5 + "[label=\"boolean\"];\n";
                cadena += nodo2 + "->" + nodo5 + ";\n";
                break;
            case Tipo_1.tipoDato.CARACTER:
                cadena += nodo5 + "[label=\"char\"];\n";
                cadena += nodo2 + "->" + nodo5 + ";\n";
                break;
            case Tipo_1.tipoDato.CADENA:
                cadena += nodo5 + "[label=\"string\"];\n";
                cadena += nodo2 + "->" + nodo5 + ";\n";
                break;
        }
        for (let i = 0; i < this.identificadores.length; i++) {
            if (i == 0) {
                let nodo6 = "n" + (indexController_1.numeroNodo.no + 1);
                let nodo7 = "n" + (indexController_1.numeroNodo.no + 2);
                indexController_1.numeroNodo.no += 2;
                cadena += nodo6 + "[label=\"ID\"];\n";
                cadena += nodo7 + "[label=\"" + this.identificadores[i] + "\"];\n";
                cadena += nodo3 + "->" + nodo6 + ";\n";
                cadena += nodo6 + "->" + nodo7 + ";\n";
            }
            else {
                let nodo6 = "n" + (indexController_1.numeroNodo.no + 1);
                let nodo7 = "n" + (indexController_1.numeroNodo.no + 2);
                let nodo8 = "n" + (indexController_1.numeroNodo.no + 3);
                indexController_1.numeroNodo.no += 3;
                cadena += nodo7 + "[label=\",\"];\n";
                cadena += nodo6 + "[label=\"ID\"];\n";
                cadena += nodo8 + "[label=\"" + this.identificadores[i] + "\"];\n";
                cadena += nodo3 + "->" + nodo7 + ";\n";
                cadena += nodo3 + "->" + nodo6 + ";\n";
                cadena += nodo6 + "->" + nodo8 + ";\n";
            }
        }
        if (!this.valor) {
            let nodo9 = "n" + (indexController_1.numeroNodo.no + 1);
            indexController_1.numeroNodo.no += 1;
            cadena += nodo9 + "[label=\";\"];\n";
            cadena += nodo4 + "->" + nodo9 + ";\n";
            return cadena;
        }
        else {
            let nodo9 = "n" + (indexController_1.numeroNodo.no + 1);
            let nodo10 = "n" + (indexController_1.numeroNodo.no + 2);
            let nodo11 = "n" + (indexController_1.numeroNodo.no + 3);
            indexController_1.numeroNodo.no += 3;
            cadena += nodo9 + "[label=\"=\"];\n";
            cadena += nodo10 + "[label=\"EXP\"];\n";
            cadena += nodo11 + "[label=\";\"];\n";
            cadena += nodo4 + "->" + nodo9 + ";\n";
            cadena += nodo4 + "->" + nodo10 + ";\n";
            cadena += nodo4 + "->" + nodo11 + ";\n";
            cadena += this.valor.generarDot(nodo10);
            return cadena;
        }
    }
}
exports.default = DeclaracionVar;
