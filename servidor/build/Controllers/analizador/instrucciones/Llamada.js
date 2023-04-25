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
const Instruccion_1 = require("../abstracto/Instruccion");
const Errores_1 = __importDefault(require("../excepciones/Errores"));
const tablaSimbolos_1 = __importDefault(require("../simbolo/tablaSimbolos"));
const Tipo_1 = __importStar(require("../simbolo/Tipo"));
const indexController_1 = require("../../indexController");
const DeclaracionVar_1 = __importDefault(require("./DeclaracionVar"));
const Metodo_1 = __importDefault(require("./Metodo"));
const Funcion_1 = __importDefault(require("./Funcion"));
class Llamada extends Instruccion_1.Instruccion {
    constructor(id, linea, col, params) {
        super(new Tipo_1.default(Tipo_1.tipoDato.VOID), linea, col);
        this.id = id;
        this.parametros = params;
    }
    interpretar(arbol, tabla) {
        let busqueda = arbol.getFuncion(this.id);
        if (busqueda == null)
            return new Errores_1.default("Semantico", "Funcion No Existente", this.linea, this.col);
        if (busqueda instanceof Metodo_1.default) {
            let NewTabla = new tablaSimbolos_1.default(arbol.getTablaGlobal());
            NewTabla.setNombre(arbol.getTablaGlobal().getNombre() + "METODO-" + this.id + "-");
            if (busqueda.parametros.length != this.parametros.length)
                return new Errores_1.default("Semantico", "Cantidad de parametros invalida", this.linea, this.col);
            for (let i = 0; i < busqueda.parametros.length; i++) {
                let resultado = this.parametros[i].interpretar(arbol, tabla);
                if (resultado instanceof Errores_1.default)
                    return resultado;
                if (busqueda.parametros[i].tipo.getTipo() != this.parametros[i].tipoDato.getTipo())
                    return new Errores_1.default("Semantico", "Discrepancia entre tipo de dato del parametro", this.linea, this.col);
                let decla = new DeclaracionVar_1.default(busqueda.parametros[i].tipo, this.linea, this.col, [busqueda.parametros[i].id], undefined);
                let resultado2 = decla.interpretar(arbol, NewTabla);
                if (resultado2 instanceof Errores_1.default)
                    return resultado2;
                let variable = NewTabla.getVariable(busqueda.parametros[i].id);
                if (variable == null)
                    return new Errores_1.default("Semantico", "Variable no existente " + busqueda.parametros[i].id, this.linea, this.col);
                if (variable.getTipo().getTipo() != busqueda.parametros[i].tipo.getTipo())
                    return new Errores_1.default("Semantico", "Discrepancia entre tipo de dato del parametro", this.linea, this.col);
                variable.setValor(resultado);
                arbol.addSimbolo(busqueda.parametros[i].id, "PARAMETRO", NewTabla.getNombre(), this.linea, this.col, resultado);
            }
            //id vector
            let FuncionI = busqueda.interpretar(arbol, NewTabla);
            if (FuncionI instanceof Errores_1.default)
                return FuncionI;
        }
        else if (busqueda instanceof Funcion_1.default) {
            let NewTabla = new tablaSimbolos_1.default(arbol.getTablaGlobal());
            NewTabla.setNombre(arbol.getTablaGlobal().getNombre() + "FUNCION-" + this.id + "-");
            if (busqueda.parametros.length != this.parametros.length)
                return new Errores_1.default("Semantico", "Cantidad de parametros invalida", this.linea, this.col);
            for (let i = 0; i < busqueda.parametros.length; i++) {
                let resultado = this.parametros[i].interpretar(arbol, tabla);
                if (resultado instanceof Errores_1.default)
                    return resultado;
                if (busqueda.parametros[i].tipo.getTipo() != this.parametros[i].tipoDato.getTipo())
                    return new Errores_1.default("Semantico", "Discrepancia entre tipo de dato del parametro", this.linea, this.col);
                let decla = new DeclaracionVar_1.default(busqueda.parametros[i].tipo, this.linea, this.col, [busqueda.parametros[i].id], undefined);
                let resultado2 = decla.interpretar(arbol, NewTabla);
                if (resultado2 instanceof Errores_1.default)
                    return resultado2;
                let variable = NewTabla.getVariable(busqueda.parametros[i].id);
                if (variable == null)
                    return new Errores_1.default("Semantico", "Variable no existente " + busqueda.parametros[i].id, this.linea, this.col);
                if (variable.getTipo().getTipo() != busqueda.parametros[i].tipo.getTipo())
                    return new Errores_1.default("Semantico", "Discrepancia entre tipo de dato del parametro", this.linea, this.col);
                variable.setValor(resultado);
                arbol.addSimbolo(busqueda.parametros[i].id, "PARAMETRO", NewTabla.getNombre(), this.linea, this.col, resultado);
            }
            let FuncionI = busqueda.interpretar(arbol, NewTabla);
            this.tipoDato = busqueda.tipoDato;
            return FuncionI;
        }
        else
            return new Errores_1.default("Semantico", "Cantidad de parametros invalida", this.linea, this.col);
    }
    generarDot(anterior) {
        let cadena = "";
        if (this.parametros.length > 0) {
            let nodo1 = "n" + (indexController_1.numeroNodo.no + 1);
            let nodo2 = "n" + (indexController_1.numeroNodo.no + 2);
            let nodo3 = "n" + (indexController_1.numeroNodo.no + 3);
            let nodo4 = "n" + (indexController_1.numeroNodo.no + 4);
            let nodo5 = "n" + (indexController_1.numeroNodo.no + 5);
            let nodo6 = "n" + (indexController_1.numeroNodo.no + 6);
            indexController_1.numeroNodo.no += 6;
            cadena += nodo1 + "[label=\"LLAMADA\"];\n";
            cadena += nodo2 + "[label=\"ID\"];\n";
            cadena += nodo3 + "[label=\"(\"];\n";
            cadena += nodo4 + "[label=\"PARAMSCALL\"];\n";
            cadena += nodo5 + "[label=\")\"];\n";
            cadena += nodo6 + "[label=\"" + this.id + "\"];\n";
            cadena += anterior + "->" + nodo1 + ";\n";
            cadena += nodo1 + "->" + nodo2 + ";\n";
            cadena += nodo1 + "->" + nodo3 + ";\n";
            cadena += nodo1 + "->" + nodo4 + ";\n";
            cadena += nodo1 + "->" + nodo5 + ";\n";
            cadena += nodo2 + "->" + nodo6 + ";\n";
            let index = 0;
            for (let i of this.parametros) {
                if (index == 0) {
                    let nodo9 = "n" + (indexController_1.numeroNodo.no + 1);
                    indexController_1.numeroNodo.no += 1;
                    cadena += nodo9 + "[label=\"EXP\"];\n";
                    cadena += nodo4 + "->" + nodo9 + ";\n";
                    cadena += i.generarDot(nodo9);
                }
                else {
                    let nodo9 = "n" + (indexController_1.numeroNodo.no + 1);
                    let nodo10 = "n" + (indexController_1.numeroNodo.no + 1);
                    indexController_1.numeroNodo.no += 2;
                    cadena += nodo9 + "[label=\",\"];\n";
                    cadena += nodo9 + "[label=\"EXP\"];\n";
                    cadena += nodo4 + "->" + nodo10 + ";\n";
                    cadena += nodo4 + "->" + nodo9 + ";\n";
                    cadena += i.generarDot(nodo9);
                }
                index++;
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
            indexController_1.numeroNodo.no += 6;
            cadena += nodo1 + "[label=\"LLAMADA\"];\n";
            cadena += nodo2 + "[label=\"ID\"];\n";
            cadena += nodo3 + "[label=\"(\"];\n";
            cadena += nodo5 + "[label=\")\"];\n";
            cadena += nodo6 + "[label=\"" + this.id + "\"];\n";
            cadena += anterior + "->" + nodo1 + ";\n";
            cadena += nodo1 + "->" + nodo2 + ";\n";
            cadena += nodo1 + "->" + nodo3 + ";\n";
            cadena += nodo1 + "->" + nodo5 + ";\n";
            cadena += nodo2 + "->" + nodo6 + ";\n";
            return cadena;
        }
    }
}
exports.default = Llamada;
