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
const indexController_1 = require("../../indexController");
const Instruccion_1 = require("../abstracto/Instruccion");
const Errores_1 = __importDefault(require("../excepciones/Errores"));
const Tipo_1 = __importStar(require("../simbolo/Tipo"));
class AccesoVec extends Instruccion_1.Instruccion {
    constructor(id, dimension, index1, linea, col, index2) {
        super(new Tipo_1.default(Tipo_1.tipoDato.VOID), linea, col);
        this.id = id.toLowerCase();
        this.dimension = dimension;
        this.index1 = index1;
        this.index2 = index2;
    }
    interpretar(arbol, tabla) {
        let arreglo = tabla.getVariable(this.id);
        if (arreglo == null)
            return new Errores_1.default("Semantico", "Variable no existente ", this.linea, this.col);
        this.tipoDato.setTipo(arreglo.getTipo().getTipo());
        if (this.dimension == 1) {
            let indice1 = this.index1.interpretar(arbol, tabla);
            if (indice1 instanceof Errores_1.default)
                return indice1;
            if (this.index1.tipoDato.getTipo() != Tipo_1.tipoDato.ENTERO)
                return new Errores_1.default("Semantico", "Los indices de los arreglos deben de ser enteros", this.linea, this.col);
            let valor = arreglo.getValor();
            if (valor[parseInt(indice1)] == undefined)
                return new Errores_1.default("Semantico", "Index fuera del rango", this.linea, this.col);
            return valor[parseInt(indice1)];
        }
        else {
            if (!this.index2)
                return new Errores_1.default("Semantico", "Index Invalido", this.linea, this.col);
            else {
                let indice1 = this.index1.interpretar(arbol, tabla);
                if (indice1 instanceof Errores_1.default)
                    return indice1;
                if (this.index1.tipoDato.getTipo() != Tipo_1.tipoDato.ENTERO)
                    return new Errores_1.default("Semantico", "Los indices de los arreglos deben de ser enteros", this.linea, this.col);
                let indice2 = this.index2.interpretar(arbol, tabla);
                if (indice2 instanceof Errores_1.default)
                    return indice2;
                if (this.index2.tipoDato.getTipo() != Tipo_1.tipoDato.ENTERO)
                    return new Errores_1.default("Semantico", "Los indices de los arreglos deben de ser enteros", this.linea, this.col);
                let valor = arreglo.getValor();
                try {
                    if (valor[parseInt(indice1)][parseInt(indice2)] == undefined)
                        return new Errores_1.default("Semantico", "Index fuera del rango", this.linea, this.col);
                    return valor[parseInt(indice1)][parseInt(indice2)];
                }
                catch (err) {
                    return new Errores_1.default("Semantico", "Index fuera del rango", this.linea, this.col);
                }
            }
        }
    }
    generarDot(anterior) {
        let cadena = "";
        if (this.dimension == 1) {
            let nodo1 = "n" + (indexController_1.numeroNodo.no + 1);
            let nodo2 = "n" + (indexController_1.numeroNodo.no + 2);
            let nodo3 = "n" + (indexController_1.numeroNodo.no + 3);
            let nodo4 = "n" + (indexController_1.numeroNodo.no + 4);
            let nodo5 = "n" + (indexController_1.numeroNodo.no + 5);
            indexController_1.numeroNodo.no += 5;
            cadena += nodo1 + "[label=\"ID\"];\n";
            cadena += nodo2 + "[label=\"[\"];\n";
            cadena += nodo3 + "[label=\"EXP\"];\n";
            cadena += nodo4 + "[label=\"]\"];\n";
            cadena += nodo5 + "[label=\"" + this.id + "\"];\n";
            cadena += anterior + "->" + nodo1 + ";\n";
            cadena += anterior + "->" + nodo2 + ";\n";
            cadena += anterior + "->" + nodo3 + ";\n";
            cadena += anterior + "->" + nodo4 + ";\n";
            cadena += nodo1 + "->" + nodo5 + ";\n";
            cadena += this.index1.generarDot(nodo3);
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
            indexController_1.numeroNodo.no += 7;
            cadena += nodo1 + "[label=\"ID\"];\n";
            cadena += nodo2 + "[label=\"[\"];\n";
            cadena += nodo3 + "[label=\"EXP\"];\n";
            cadena += nodo4 + "[label=\"]\"];\n";
            cadena += nodo5 + "[label=\"[\"];\n";
            cadena += nodo6 + "[label=\"EXP\"];\n";
            cadena += nodo7 + "[label=\"]\"];\n";
            cadena += anterior + "->" + nodo1 + ";\n";
            cadena += anterior + "->" + nodo2 + ";\n";
            cadena += anterior + "->" + nodo3 + ";\n";
            cadena += anterior + "->" + nodo4 + ";\n";
            cadena += anterior + "->" + nodo5 + ";\n";
            cadena += anterior + "->" + nodo6 + ";\n";
            cadena += anterior + "->" + nodo7 + ";\n";
            cadena += this.index1.generarDot(nodo3);
            if (this.index2 != undefined)
                cadena += this.index2.generarDot(nodo3);
            return cadena;
        }
    }
}
exports.default = AccesoVec;
