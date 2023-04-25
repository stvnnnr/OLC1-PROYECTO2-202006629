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
const CaseDef_1 = __importDefault(require("./CaseDef"));
const BreakContinue_1 = __importStar(require("./BreakContinue"));
const Return_1 = __importDefault(require("./Return"));
class Switch extends Instruccion_1.Instruccion {
    constructor(cond, cases, linea, col, def) {
        super(new Tipo_1.default(Tipo_1.tipoDato.VOID), linea, col);
        this.condicion = cond;
        this.cases = cases;
        this.def = def;
    }
    interpretar(arbol, tabla) {
        let cond = this.condicion.interpretar(arbol, tabla);
        if (cond instanceof Errores_1.default)
            return cond;
        let bandera = true;
        //Evaluando casa caso
        if (this.cases) {
            for (let i of this.cases) {
                let condCase = i.interpretar(arbol, tabla);
                if (condCase instanceof Errores_1.default)
                    return condCase;
                if (i.tipoDato.getTipo() != this.condicion.tipoDato.getTipo())
                    return new Errores_1.default("Semantico", "Comparacion entre tipos de datos no iguales", this.linea, this.col);
                if (i instanceof CaseDef_1.default) {
                    if (condCase == cond) {
                        let listaInstrucciones = i.getExpresiones();
                        let NewTabla = new tablaSimbolos_1.default(tabla);
                        NewTabla.setNombre(tabla.getNombre() + "CASE " + condCase + "-");
                        for (let j of listaInstrucciones) {
                            let resultado = j.interpretar(arbol, NewTabla);
                            if (resultado instanceof Errores_1.default)
                                indexController_1.listaErrores.push(resultado);
                            if (resultado instanceof Return_1.default)
                                return resultado;
                            if (j instanceof BreakContinue_1.default) {
                                if (j.opcion == BreakContinue_1.Opcion.BREAK) {
                                    bandera = false;
                                    break;
                                }
                                else
                                    return new Errores_1.default("Semantico", "Sentencia continue no valida para switch", this.linea, this.col);
                            }
                        }
                    }
                }
                else
                    return new Errores_1.default("Semantico", "Se esperaba un case", this.linea, this.col);
                if (bandera == false) {
                    break;
                }
                ;
            }
        }
        if (bandera == true && this.def instanceof CaseDef_1.default) {
            let listaInstrucciones = this.def.getExpresiones();
            let NewTabla = new tablaSimbolos_1.default(tabla);
            NewTabla.setNombre(tabla.getNombre() + "DEFAULT- ");
            for (let i of listaInstrucciones) {
                let resultado = i.interpretar(arbol, NewTabla);
                if (resultado instanceof Errores_1.default)
                    indexController_1.listaErrores.push(resultado);
                if (resultado instanceof Return_1.default)
                    return resultado;
                if (i instanceof BreakContinue_1.default) {
                    if (i.opcion == BreakContinue_1.Opcion.BREAK) {
                        break;
                    }
                    else
                        return new Errores_1.default("Semantico", "Sentencia continue no valida para switch", this.linea, this.col);
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
        let nodo6 = "n" + (indexController_1.numeroNodo.no + 6);
        indexController_1.numeroNodo.no += 6;
        cadena += nodo1 + "[label=\"SSWITCH\"];\n";
        cadena += nodo2 + "[label=\"switch\"];\n";
        cadena += nodo3 + "[label=\"(\"];\n";
        cadena += nodo4 + "[label=\"EXP\"];\n";
        cadena += nodo5 + "[label=\")\"];\n";
        cadena += nodo6 + "[label=\"{\"];\n";
        cadena += anterior + "->" + nodo1 + ";\n";
        cadena += nodo1 + "->" + nodo2 + ";\n";
        cadena += nodo1 + "->" + nodo3 + ";\n";
        cadena += nodo1 + "->" + nodo4 + ";\n";
        cadena += nodo1 + "->" + nodo5 + ";\n";
        cadena += nodo1 + "->" + nodo6 + ";\n";
        if (this.cases) {
            let nodo7 = "n" + (indexController_1.numeroNodo.no + 1);
            indexController_1.numeroNodo.no += 1;
            cadena += nodo7 + "[label=\"LISTCASE\"];\n";
            cadena += nodo1 + "->" + nodo7 + ";\n";
            for (let i of this.cases) {
                if (!(i instanceof Errores_1.default))
                    cadena += i.generarDot(nodo7);
            }
            if (this.def) {
                cadena += this.def.generarDot(nodo1);
            }
        }
        else {
            if (this.def) {
                cadena += this.def.generarDot(nodo1);
            }
        }
        return cadena;
    }
}
exports.default = Switch;
