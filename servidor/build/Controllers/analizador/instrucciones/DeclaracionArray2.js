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
class DeclaracionArray2 extends Instruccion_1.Instruccion {
    constructor(tipo, id, dimension, valor, linea, col, charArray) {
        super(tipo, linea, col);
        this.id = id;
        this.dimension = dimension;
        this.valor = valor;
        this.charArray = charArray;
    }
    interpretar(arbol, tabla) {
        if (this.charArray) {
            let verificado = this.charArray.interpretar(arbol, tabla);
            if (verificado instanceof Errores_1.default)
                return verificado;
            else {
                if (!(tabla.setVariable(new simbolo_1.default(this.tipoDato, this.id, verificado))))
                    return new Errores_1.default("Semantico", "Declaracion de variable '" + this.id + "' ya existente en el ambito", this.linea, this.col);
                arbol.addSimbolo(this.id, "VECTOR", tabla.getNombre(), this.linea, this.col, "[" + verificado.toString() + "]");
            }
        }
        else {
            if (this.dimension == 1) {
                let data = [];
                let verificacion;
                for (let i = 0; i < this.valor.length; i++) {
                    switch (this.tipoDato.getTipo()) {
                        case Tipo_1.tipoDato.ENTERO:
                            verificacion = this.valor[i].interpretar(arbol, tabla);
                            if (verificacion instanceof Errores_1.default)
                                return verificacion;
                            if (this.valor[i].tipoDato.getTipo() != Tipo_1.tipoDato.ENTERO)
                                return new Errores_1.default("Semantico", "Tipo de dato erroneo en arreglo" + this.id, this.linea, this.col);
                            data.push(parseInt(verificacion));
                            break;
                        case Tipo_1.tipoDato.DECIMAL:
                            verificacion = this.valor[i].interpretar(arbol, tabla);
                            if (verificacion instanceof Errores_1.default)
                                return verificacion;
                            if (this.valor[i].tipoDato.getTipo() != Tipo_1.tipoDato.DECIMAL)
                                return new Errores_1.default("Semantico", "Tipo de dato erroneo en arreglo" + this.id, this.linea, this.col);
                            data.push(parseFloat(verificacion));
                            break;
                        case Tipo_1.tipoDato.BOOL:
                            verificacion = this.valor[i].interpretar(arbol, tabla);
                            if (verificacion instanceof Errores_1.default)
                                return verificacion;
                            if (this.valor[i].tipoDato.getTipo() != Tipo_1.tipoDato.BOOL)
                                return new Errores_1.default("Semantico", "Tipo de dato erroneo en arreglo" + this.id, this.linea, this.col);
                            data.push(verificacion);
                            break;
                        case Tipo_1.tipoDato.CARACTER:
                            verificacion = this.valor[i].interpretar(arbol, tabla);
                            if (verificacion instanceof Errores_1.default)
                                return verificacion;
                            if (this.valor[i].tipoDato.getTipo() != Tipo_1.tipoDato.CARACTER)
                                return new Errores_1.default("Semantico", "Tipo de dato erroneo en arreglo" + this.id, this.linea, this.col);
                            data.push(verificacion);
                            break;
                        case Tipo_1.tipoDato.CADENA:
                            verificacion = this.valor[i].interpretar(arbol, tabla);
                            if (verificacion instanceof Errores_1.default)
                                return verificacion;
                            if (this.valor[i].tipoDato.getTipo() != Tipo_1.tipoDato.CADENA)
                                return new Errores_1.default("Semantico", "Tipo de dato erroneo en arreglo" + this.id, this.linea, this.col);
                            data.push(verificacion);
                            break;
                        default:
                            return new Errores_1.default("Semantico", "Tipo de dato invalido", this.linea, this.col);
                    }
                }
                this.valor = data;
                if (!(tabla.setVariable(new simbolo_1.default(this.tipoDato, this.id, this.valor))))
                    return new Errores_1.default("Semantico", "Declaracion de variable '" + this.id + "' ya existente en el ambito", this.linea, this.col);
                arbol.addSimbolo(this.id, "VECTOR", tabla.getNombre(), this.linea, this.col, "[" + this.valor.toString() + "]");
            }
            else {
                let data = [];
                let aux = [];
                let verificacion;
                let valorAux = "[";
                for (let i = 0; i < this.valor.length; i++) {
                    data = [];
                    for (let j = 0; j < this.valor[i].length; j++) {
                        switch (this.tipoDato.getTipo()) {
                            case Tipo_1.tipoDato.ENTERO:
                                verificacion = this.valor[i][j].interpretar(arbol, tabla);
                                if (verificacion instanceof Errores_1.default)
                                    return verificacion;
                                if (this.valor[i][j].tipoDato.getTipo() != Tipo_1.tipoDato.ENTERO)
                                    return new Errores_1.default("Semantico", "Tipo de dato erroneo en arreglo" + this.id, this.linea, this.col);
                                data.push(parseInt(verificacion));
                                break;
                            case Tipo_1.tipoDato.DECIMAL:
                                verificacion = this.valor[i][j].interpretar(arbol, tabla);
                                if (verificacion instanceof Errores_1.default)
                                    return verificacion;
                                if (this.valor[i][j].tipoDato.getTipo() != Tipo_1.tipoDato.DECIMAL)
                                    return new Errores_1.default("Semantico", "Tipo de dato erroneo en arreglo" + this.id, this.linea, this.col);
                                data.push(parseFloat(verificacion));
                                break;
                            case Tipo_1.tipoDato.BOOL:
                                verificacion = this.valor[i][j].interpretar(arbol, tabla);
                                if (verificacion instanceof Errores_1.default)
                                    return verificacion;
                                if (this.valor[i][j].tipoDato.getTipo() != Tipo_1.tipoDato.BOOL)
                                    return new Errores_1.default("Semantico", "Tipo de dato erroneo en arreglo" + this.id, this.linea, this.col);
                                data.push(verificacion);
                                break;
                            case Tipo_1.tipoDato.CARACTER:
                                verificacion = this.valor[i][j].interpretar(arbol, tabla);
                                if (verificacion instanceof Errores_1.default)
                                    return verificacion;
                                if (this.valor[i][j].tipoDato.getTipo() != Tipo_1.tipoDato.CARACTER)
                                    return new Errores_1.default("Semantico", "Tipo de dato erroneo en arreglo" + this.id, this.linea, this.col);
                                data.push(verificacion);
                                break;
                            case Tipo_1.tipoDato.CADENA:
                                verificacion = this.valor[i][j].interpretar(arbol, tabla);
                                if (verificacion instanceof Errores_1.default)
                                    return verificacion;
                                if (this.valor[i][j].tipoDato.getTipo() != Tipo_1.tipoDato.CADENA)
                                    return new Errores_1.default("Semantico", "Tipo de dato erroneo en arreglo" + this.id, this.linea, this.col);
                                data.push(verificacion);
                                break;
                            default:
                                return new Errores_1.default("Semantico", "Tipo de dato invalido", this.linea, this.col);
                        }
                    }
                    if (i == 0)
                        valorAux = valorAux + "[" + data.toString() + "]";
                    else
                        valorAux = valorAux + ",[" + data.toString() + "]";
                    aux.push(data);
                }
                valorAux += "]";
                this.valor = aux;
                if (!(tabla.setVariable(new simbolo_1.default(this.tipoDato, this.id, this.valor))))
                    return new Errores_1.default("Semantico", "Declaracion de variable '" + this.id + "' ya existente en el ambito", this.linea, this.col);
                arbol.addSimbolo(this.id, "VECTOR", tabla.getNombre(), this.linea, this.col, valorAux);
            }
        }
    }
    generarDot(anterior) {
        let cadena = "";
        if (this.charArray) {
            let nodo1 = "n" + (indexController_1.numeroNodo.no + 1);
            let nodo2 = "n" + (indexController_1.numeroNodo.no + 2);
            let nodo3 = "n" + (indexController_1.numeroNodo.no + 3);
            let nodo4 = "n" + (indexController_1.numeroNodo.no + 4);
            let nodo5 = "n" + (indexController_1.numeroNodo.no + 5);
            let nodo6 = "n" + (indexController_1.numeroNodo.no + 6);
            let nodo7 = "n" + (indexController_1.numeroNodo.no + 7);
            indexController_1.numeroNodo.no += 7;
            cadena += nodo1 + "[label=\"VEC\"];\n";
            cadena += nodo2 + "[label=\"TIPO\"];\n";
            cadena += nodo3 + "[label=\"ID\"];\n";
            cadena += nodo4 + "[label=\"[\"];\n";
            cadena += nodo5 + "[label=\"]\"];\n";
            cadena += nodo6 + "[label=\"=\"];\n";
            cadena += anterior + "->" + nodo1 + ";\n";
            cadena += nodo1 + "->" + nodo2 + ";\n";
            cadena += nodo1 + "->" + nodo3 + ";\n";
            cadena += nodo1 + "->" + nodo4 + ";\n";
            cadena += nodo1 + "->" + nodo5 + ";\n";
            cadena += nodo1 + "->" + nodo6 + ";\n";
            cadena += this.charArray.generarDot(nodo1);
            cadena += nodo7 + "[label=\";\"];\n";
            cadena += nodo1 + "->" + nodo7 + ";\n";
            return cadena;
        }
        else {
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
                indexController_1.numeroNodo.no += 10;
                cadena += nodo1 + "[label=\"VEC\"];\n";
                cadena += nodo2 + "[label=\"TIPO\"];\n";
                cadena += nodo3 + "[label=\"ID\"];\n";
                cadena += nodo4 + "[label=\"[\"];\n";
                cadena += nodo5 + "[label=\"]\"];\n";
                cadena += nodo6 + "[label=\"=\"];\n";
                cadena += nodo7 + "[label=\"[\"];\n";
                cadena += nodo8 + "[label=\"LISTVEC\"];\n";
                cadena += nodo9 + "[label=\"]\"];\n";
                cadena += nodo10 + "[label=\";\"];\n";
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
                for (let i = 0; i < this.valor.length; i++) {
                    if (i == 0) {
                        let nodo11 = "n" + (indexController_1.numeroNodo.no + 1);
                        let nodo12 = "n" + (indexController_1.numeroNodo.no + 2);
                        let nodo13 = "n" + (indexController_1.numeroNodo.no + 3);
                        indexController_1.numeroNodo.no += 3;
                        cadena += nodo11 + "[label=\"EXP\"];\n";
                        cadena += nodo12 + "[label=\"NATIVO\"];\n";
                        cadena += nodo13 + "[label=\"" + this.valor[i] + "\"];\n";
                        cadena += nodo8 + "->" + nodo11 + ";\n";
                        cadena += nodo11 + "->" + nodo12 + ";\n";
                        cadena += nodo12 + "->" + nodo13 + ";\n";
                    }
                    else {
                        let nodo11 = "n" + (indexController_1.numeroNodo.no + 1);
                        let nodo12 = "n" + (indexController_1.numeroNodo.no + 2);
                        let nodo13 = "n" + (indexController_1.numeroNodo.no + 3);
                        let nodo14 = "n" + (indexController_1.numeroNodo.no + 4);
                        indexController_1.numeroNodo.no += 4;
                        cadena += nodo11 + "[label=\",\"];\n";
                        cadena += nodo12 + "[label=\"EXP\"];\n";
                        cadena += nodo13 + "[label=\"NATIVO\"];\n";
                        cadena += nodo14 + "[label=\"" + this.valor[i] + "\"];\n";
                        cadena += nodo8 + "->" + nodo11 + ";\n";
                        cadena += nodo8 + "->" + nodo12 + ";\n";
                        cadena += nodo12 + "->" + nodo13 + ";\n";
                        cadena += nodo13 + "->" + nodo14 + ";\n";
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
                let nodo6 = "n" + (indexController_1.numeroNodo.no + 6);
                let nodo7 = "n" + (indexController_1.numeroNodo.no + 7);
                let nodo8 = "n" + (indexController_1.numeroNodo.no + 8);
                let nodo9 = "n" + (indexController_1.numeroNodo.no + 9);
                let nodo10 = "n" + (indexController_1.numeroNodo.no + 10);
                let nodo11 = "n" + (indexController_1.numeroNodo.no + 11);
                let nodo12 = "n" + (indexController_1.numeroNodo.no + 12);
                indexController_1.numeroNodo.no += 12;
                cadena += nodo1 + "[label=\"VEC\"];\n";
                cadena += nodo2 + "[label=\"TIPO\"];\n";
                cadena += nodo3 + "[label=\"ID\"];\n";
                cadena += nodo4 + "[label=\"[\"];\n";
                cadena += nodo5 + "[label=\"]\"];\n";
                cadena += nodo6 + "[label=\"[\"];\n";
                cadena += nodo7 + "[label=\"]\"];\n";
                cadena += nodo8 + "[label=\"=\"];\n";
                cadena += nodo9 + "[label=\"[\"];\n";
                cadena += nodo10 + "[label=\"LISTVEC2\"];\n";
                cadena += nodo11 + "[label=\"]\"];\n";
                cadena += nodo12 + "[label=\";\"];\n";
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
                for (let i = 0; i < this.valor.length; i++) {
                    let nodo13, nodo14;
                    if (i == 0) {
                        nodo13 = "n" + (indexController_1.numeroNodo.no + 1);
                        let nodoA1 = "n" + (indexController_1.numeroNodo.no + 2);
                        let nodoA2 = "n" + (indexController_1.numeroNodo.no + 3);
                        indexController_1.numeroNodo.no += 3;
                        cadena += nodoA1 + "[label=\"[\"];\n";
                        cadena += nodo13 + "[label=\"LISTVEC\"];\n";
                        cadena += nodoA2 + "[label=\"]\"];\n";
                        cadena += nodo10 + "->" + nodoA1 + ";\n";
                        cadena += nodo10 + "->" + nodo13 + ";\n";
                        cadena += nodo10 + "->" + nodoA2 + ";\n";
                    }
                    else {
                        nodo13 = "n" + (indexController_1.numeroNodo.no + 1);
                        nodo14 = "n" + (indexController_1.numeroNodo.no + 2);
                        let nodoA1 = "n" + (indexController_1.numeroNodo.no + 3);
                        let nodoA2 = "n" + (indexController_1.numeroNodo.no + 4);
                        indexController_1.numeroNodo.no += 4;
                        cadena += nodo14 + "[label=\",\"];\n";
                        cadena += nodoA1 + "[label=\"[\"];\n";
                        cadena += nodo13 + "[label=\"LISTVEC\"];\n";
                        cadena += nodoA2 + "[label=\"]\"];\n";
                        cadena += nodo10 + "->" + nodo14 + ";\n";
                        cadena += nodo10 + "->" + nodoA1 + ";\n";
                        cadena += nodo10 + "->" + nodo13 + ";\n";
                        cadena += nodo10 + "->" + nodoA2 + ";\n";
                    }
                    for (let j = 0; j < this.valor[i].length; j++) {
                        if (j == 0) {
                            let nodo15 = "n" + (indexController_1.numeroNodo.no + 1); //11
                            let nodo16 = "n" + (indexController_1.numeroNodo.no + 2);
                            let nodo17 = "n" + (indexController_1.numeroNodo.no + 3);
                            indexController_1.numeroNodo.no += 3;
                            cadena += nodo15 + "[label=\"EXP\"];\n";
                            cadena += nodo16 + "[label=\"NATIVO\"];\n";
                            cadena += nodo17 + "[label=\"" + this.valor[i][j] + "\"];\n";
                            cadena += nodo13 + "->" + nodo15 + ";\n";
                            cadena += nodo15 + "->" + nodo16 + ";\n";
                            cadena += nodo16 + "->" + nodo17 + ";\n";
                        }
                        else {
                            let nodo15 = "n" + (indexController_1.numeroNodo.no + 1);
                            let nodo16 = "n" + (indexController_1.numeroNodo.no + 2);
                            let nodo17 = "n" + (indexController_1.numeroNodo.no + 3);
                            let nodo18 = "n" + (indexController_1.numeroNodo.no + 4);
                            indexController_1.numeroNodo.no += 4;
                            cadena += nodo15 + "[label=\",\"];\n";
                            cadena += nodo16 + "[label=\"EXP\"];\n";
                            cadena += nodo17 + "[label=\"NATIVO\"];\n";
                            cadena += nodo18 + "[label=\"" + this.valor[i][j] + "\"];\n";
                            cadena += nodo13 + "->" + nodo15 + ";\n";
                            cadena += nodo13 + "->" + nodo16 + ";\n";
                            cadena += nodo16 + "->" + nodo17 + ";\n";
                            cadena += nodo17 + "->" + nodo18 + ";\n";
                        }
                    }
                }
                return cadena;
            }
        }
    }
}
exports.default = DeclaracionArray2;
