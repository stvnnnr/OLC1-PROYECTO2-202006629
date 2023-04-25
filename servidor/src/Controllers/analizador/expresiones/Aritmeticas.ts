import { numeroNodo } from "../../indexController";
import { Instruccion } from "../abstracto/Instruccion";
import Errores from "../excepciones/Errores";
import Arbol from "../simbolo/Arbol";
import tablaSimbolo from "../simbolo/tablaSimbolos";
import Tipo, { tipoDato } from "../simbolo/Tipo";

export default class Aritmeticas extends Instruccion {
    private op1: Instruccion | undefined;
    private op2: Instruccion | undefined;
    private operacion: Operadores | undefined;
    private opU: Instruccion | undefined;

    constructor(operador: Operadores, fila: number, col: number, op1: Instruccion, op2?: Instruccion) {
        super(new Tipo(tipoDato.ENTERO), fila, col);
        this.operacion = operador;
        if (!op2) this.opU = op1;
        else {
            this.op1 = op1;
            this.op2 = op2;
        }
    }

    interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        
        let opIzq, opDer, Unico = null;

        if (this.opU != null) {
            Unico = this.opU.interpretar(arbol, tabla);
            if (Unico instanceof Errores) return Unico;
        } else {
            opIzq = this.op1?.interpretar(arbol, tabla);
            if (opIzq instanceof Errores) return opIzq;
            opDer = this.op2?.interpretar(arbol, tabla);
            if (opDer instanceof Errores) return opDer;
        }
        switch (this.operacion) {
            case Operadores.SUMA:
                return this.suma(opIzq, opDer);
            case Operadores.RESTA:
                return this.resta(opIzq, opDer);
            case Operadores.MULT:
                return this.multi(opIzq, opDer);
            case Operadores.DIV:
                return this.div(opIzq, opDer);
            case Operadores.MOD:
                return this.modul(opIzq, opDer);
            case Operadores.POW:
                return this.pow(opIzq, opDer);
            case Operadores.NEG:
                return this.neg(Unico);
            default:
                return new Errores('Semantico', 'Operador Aritmetico Invalido', this.linea, this.col);
        }
    }

    suma(op1: any, op2: any) {
        let operando1 = this.op1?.tipoDato.getTipo();
        let operando2 = this.op2?.tipoDato.getTipo();

        switch (operando1) {
            case tipoDato.ENTERO:
                switch (operando2) {
                    case tipoDato.ENTERO:
                        this.tipoDato = new Tipo(tipoDato.ENTERO);
                        return parseInt(op1) + parseInt(op2);
                    case tipoDato.DECIMAL:
                        this.tipoDato = new Tipo(tipoDato.DECIMAL);
                        return parseFloat(op1) + parseFloat(op2);
                    case tipoDato.BOOL:
                        this.tipoDato = new Tipo(tipoDato.ENTERO);
                        return op2 ? parseInt(op1) + 1 : parseInt(op1);
                    case tipoDato.CARACTER:
                        this.tipoDato = new Tipo(tipoDato.ENTERO);
                        let trans = op2 + '';
                        let res = trans.charCodeAt(0);
                        return parseInt(op1) + res;
                    case tipoDato.CADENA:
                        this.tipoDato = new Tipo(tipoDato.CADENA);
                        return op1 + '' + op2;
                    default:
                        return new Errores('Semantico', 'Tipo Dato Invalido', this.linea, this.col);
                }
            case tipoDato.DECIMAL:
                switch (operando2) {
                    case tipoDato.ENTERO:
                        this.tipoDato = new Tipo(tipoDato.DECIMAL);
                        return parseFloat(op1) + parseFloat(op2)
                    case tipoDato.DECIMAL:
                        this.tipoDato = new Tipo(tipoDato.DECIMAL);
                        return parseFloat(op1) + parseFloat(op2);
                    case tipoDato.BOOL:
                        this.tipoDato = new Tipo(tipoDato.DECIMAL);
                        return op2 ? parseFloat(op1) + 1 : parseFloat(op1);
                    case tipoDato.CARACTER:
                        this.tipoDato = new Tipo(tipoDato.DECIMAL);
                        let trans = op2 + '';
                        let res = trans.charCodeAt(0);
                        return parseFloat(op1) + res;
                    case tipoDato.CADENA:
                        this.tipoDato = new Tipo(tipoDato.CADENA);
                        return op1 + '' + op2;
                    default:
                        return new Errores('Semantico', 'Tipo Dato Invalido', this.linea, this.col);
                }
            case tipoDato.BOOL:
                switch (operando2) {
                    case tipoDato.ENTERO:
                        this.tipoDato = new Tipo(tipoDato.ENTERO);
                        return op2 ? parseInt(op2) + 1 : parseInt(op2);
                    case tipoDato.DECIMAL:
                        this.tipoDato = new Tipo(tipoDato.DECIMAL);
                        return op2 ? parseFloat(op2) + 1 : parseFloat(op2);
                    case tipoDato.BOOL:
                        return new Errores('Semantico', 'La suma Boolean + Boolean no es permitida', this.linea, this.col);
                    case tipoDato.CARACTER:
                        return new Errores('Semantico', 'La suma Boolean + Caracter no es permitida', this.linea, this.col);
                    case tipoDato.CADENA:
                        this.tipoDato = new Tipo(tipoDato.CADENA);
                        return op1 + '' + op2;
                    default:
                        return new Errores('Semantico', 'Tipo Dato Invalido', this.linea, this.col);
                }
            case tipoDato.CARACTER:
                switch (operando2) {
                    case tipoDato.ENTERO:
                        this.tipoDato = new Tipo(tipoDato.ENTERO);
                        let trans = op1 + '';
                        let res = trans.charCodeAt(0);
                        return parseInt(op2) + res;
                    case tipoDato.DECIMAL:
                        this.tipoDato = new Tipo(tipoDato.DECIMAL);
                        let trans2 = op1 + '';
                        let res2 = trans2.charCodeAt(0);
                        return parseFloat(op2) + res2;
                    case tipoDato.BOOL:
                        return new Errores('Semantico', 'La suma Caracter + Boolean no es permitida', this.linea, this.col);
                    case tipoDato.CARACTER:
                        this.tipoDato = new Tipo(tipoDato.CADENA);
                        return op1 + '' + op2;
                    case tipoDato.CADENA:
                        this.tipoDato = new Tipo(tipoDato.CADENA);
                        return op1 + '' + op2;
                    default:
                        return new Errores('Semantico', 'Tipo Dato Invalido', this.linea, this.col);
                }
            case tipoDato.CADENA:
                switch (operando2) {
                    case tipoDato.ENTERO:
                        this.tipoDato = new Tipo(tipoDato.CADENA);
                        return op1 + '' + op2;
                    case tipoDato.DECIMAL:
                        this.tipoDato = new Tipo(tipoDato.CADENA);
                        return op1 + '' + op2;
                    case tipoDato.BOOL:
                        this.tipoDato = new Tipo(tipoDato.CADENA);
                        return op1 + '' + op2;
                    case tipoDato.CARACTER:
                        this.tipoDato = new Tipo(tipoDato.CADENA);
                        return op1 + '' + op2;
                    case tipoDato.CADENA:
                        this.tipoDato = new Tipo(tipoDato.CADENA);
                        return op1 + '' + op2;
                    default:
                        return new Errores('Semantico', 'Tipo Dato Invalido', this.linea, this.col);
                }
            default:
                return new Errores('Semantico', 'Tipo Dato Invalido', this.linea, this.col);
        }
    }

    resta(op1: any, op2: any) {
        let operando1 = this.op1?.tipoDato.getTipo();
        let operando2 = this.op2?.tipoDato.getTipo();

        switch (operando1) {
            case tipoDato.ENTERO:
                switch (operando2) {
                    case tipoDato.ENTERO:
                        this.tipoDato = new Tipo(tipoDato.ENTERO);
                        return parseInt(op1) - parseInt(op2);
                    case tipoDato.DECIMAL:
                        this.tipoDato = new Tipo(tipoDato.DECIMAL);
                        return parseFloat(op1) - parseFloat(op2);
                    case tipoDato.BOOL:
                        this.tipoDato = new Tipo(tipoDato.ENTERO);
                        return op2 ? parseInt(op1) - 1 : parseInt(op1);
                    case tipoDato.CARACTER:
                        this.tipoDato = new Tipo(tipoDato.ENTERO);
                        let trans = op2 + '';
                        let res = trans.charCodeAt(0);
                        return parseInt(op1) - res;
                    case tipoDato.CADENA:
                        return new Errores('Semantico', 'La resta Entero - Cadena no es permitida', this.linea, this.col);
                    default:
                        return new Errores('Semantico', 'Tipo Dato Invalido', this.linea, this.col);
                }
            case tipoDato.DECIMAL:
                switch (operando2) {
                    case tipoDato.ENTERO:
                        this.tipoDato = new Tipo(tipoDato.DECIMAL);
                        return parseFloat(op1) - parseFloat(op2)
                    case tipoDato.DECIMAL:
                        this.tipoDato = new Tipo(tipoDato.DECIMAL);
                        return parseFloat(op1) - parseFloat(op2);
                    case tipoDato.BOOL:
                        this.tipoDato = new Tipo(tipoDato.DECIMAL);
                        return op2 ? parseFloat(op1) - 1 : parseFloat(op1);
                    case tipoDato.CARACTER:
                        this.tipoDato = new Tipo(tipoDato.DECIMAL);
                        let trans = op2 + '';
                        let res = trans.charCodeAt(0);
                        return parseFloat(op1) - res;
                    case tipoDato.CADENA:
                        return new Errores('Semantico', 'La resta Double - Cadena no es permitida', this.linea, this.col);

                    default:
                        return new Errores('Semantico', 'Tipo Dato Invalido', this.linea, this.col);
                }
            case tipoDato.BOOL:
                switch (operando2) {
                    case tipoDato.ENTERO:
                        this.tipoDato = new Tipo(tipoDato.ENTERO);
                        return op2 ? parseInt(op2) - 1 : parseInt(op2);
                    case tipoDato.DECIMAL:
                        this.tipoDato = new Tipo(tipoDato.DECIMAL);
                        return op2 ? parseFloat(op2) - 1 : parseFloat(op2);
                    case tipoDato.BOOL:
                        return new Errores('Semantico', 'La resta Boolean - Boolean no es permitida', this.linea, this.col);
                    case tipoDato.CARACTER:
                        return new Errores('Semantico', 'La resta Boolean - Caracter no es permitida', this.linea, this.col);
                    case tipoDato.CADENA:
                        return new Errores('Semantico', 'La resta Boolean - Cadena no es permitida', this.linea, this.col);
                    default:
                        return new Errores('Semantico', 'Tipo Dato Invalido', this.linea, this.col);
                }
            case tipoDato.CARACTER:
                switch (operando2) {
                    case tipoDato.ENTERO:
                        this.tipoDato = new Tipo(tipoDato.ENTERO);
                        let trans = op1 + '';
                        let res = trans.charCodeAt(0);
                        return res - parseInt(op2);
                    case tipoDato.DECIMAL:
                        this.tipoDato = new Tipo(tipoDato.DECIMAL);
                        let trans2 = op1 + '';
                        let res2 = trans2.charCodeAt(0);
                        return res2 - parseFloat(op2);
                    case tipoDato.BOOL:
                        return new Errores('Semantico', 'La resta Caracter - Boolean no es permitida', this.linea, this.col);
                    case tipoDato.CARACTER:
                        return new Errores('Semantico', 'La resta Caracter - Caracter no es permitida', this.linea, this.col);
                    case tipoDato.CADENA:
                        return new Errores('Semantico', 'La resta Caracter - Cadena no es permitida', this.linea, this.col);
                    default:
                        return new Errores('Semantico', 'Tipo Dato Invalido', this.linea, this.col);
                }
            case tipoDato.CADENA:
                switch (operando2) {
                    case tipoDato.ENTERO:
                        return new Errores('Semantico', 'La resta Cadena - Entero no es permitida', this.linea, this.col);
                    case tipoDato.DECIMAL:
                        return new Errores('Semantico', 'La resta Cadena - Decimal no es permitida', this.linea, this.col);
                    case tipoDato.BOOL:
                        return new Errores('Semantico', 'La resta Cadena - Boolean no es permitida', this.linea, this.col);
                    case tipoDato.CARACTER:
                        return new Errores('Semantico', 'La resta Cadena - Caracter no es permitida', this.linea, this.col);
                    case tipoDato.CADENA:
                        return new Errores('Semantico', 'La resta Cadena - Cadena no es permitida', this.linea, this.col);
                    default:
                        return new Errores('Semantico', 'Tipo Dato Invalido', this.linea, this.col);
                }
            default:
                return new Errores('Semantico', 'Tipo Dato Invalido', this.linea, this.col);
        }

    }

    multi(op1: any, op2: any) {
        let operando1 = this.op1?.tipoDato.getTipo();
        let operando2 = this.op2?.tipoDato.getTipo();

        switch (operando1) {
            case tipoDato.ENTERO:
                switch (operando2) {
                    case tipoDato.ENTERO:
                        this.tipoDato = new Tipo(tipoDato.ENTERO);
                        return parseInt(op1) * parseInt(op2);
                    case tipoDato.DECIMAL:
                        this.tipoDato = new Tipo(tipoDato.DECIMAL);
                        return parseFloat(op1) * parseFloat(op2);
                    case tipoDato.BOOL:
                        return new Errores('Semantico', 'La multiplicacion Entero * Boolean no es permitida', this.linea, this.col);
                    case tipoDato.CARACTER:
                        this.tipoDato = new Tipo(tipoDato.ENTERO);
                        let trans = op2 + '';
                        let res = trans.charCodeAt(0);
                        return parseInt(op1) * res;
                    case tipoDato.CADENA:
                        return new Errores('Semantico', 'La multiplicacion Entero * Cadena no es permitida', this.linea, this.col);
                    default:
                        return new Errores('Semantico', 'Tipo Dato Invalido', this.linea, this.col);
                }
            case tipoDato.DECIMAL:
                switch (operando2) {
                    case tipoDato.ENTERO:
                        this.tipoDato = new Tipo(tipoDato.DECIMAL);
                        return parseFloat(op1) * parseFloat(op2)
                    case tipoDato.DECIMAL:
                        this.tipoDato = new Tipo(tipoDato.DECIMAL);
                        return parseFloat(op1) * parseFloat(op2);
                    case tipoDato.BOOL:
                        return new Errores('Semantico', 'La multiplicacion Double * Boolean no es permitida', this.linea, this.col);
                    case tipoDato.CARACTER:
                        this.tipoDato = new Tipo(tipoDato.DECIMAL);
                        let trans = op2 + '';
                        let res = trans.charCodeAt(0);
                        return parseFloat(op1) * res;
                    case tipoDato.CADENA:
                        return new Errores('Semantico', 'La multiplicacion Double * Cadena no es permitida', this.linea, this.col);

                    default:
                        return new Errores('Semantico', 'Tipo Dato Invalido', this.linea, this.col);
                }
            case tipoDato.BOOL:
                switch (operando2) {
                    case tipoDato.ENTERO:
                        return new Errores('Semantico', 'La multiplicacion Boolean * Entero no es permitida', this.linea, this.col);
                    case tipoDato.DECIMAL:
                        return new Errores('Semantico', 'La multiplicacion Boolean * Double no es permitida', this.linea, this.col);
                    case tipoDato.BOOL:
                        return new Errores('Semantico', 'La multiplicacion Boolean * Boolean no es permitida', this.linea, this.col);
                    case tipoDato.CARACTER:
                        return new Errores('Semantico', 'La multiplicacion Boolean * Caracter no es permitida', this.linea, this.col);
                    case tipoDato.CADENA:
                        return new Errores('Semantico', 'La multiplicacion Boolean * Cadena no es permitida', this.linea, this.col);
                    default:
                        return new Errores('Semantico', 'Tipo Dato Invalido', this.linea, this.col);
                }
            case tipoDato.CARACTER:
                switch (operando2) {
                    case tipoDato.ENTERO:
                        this.tipoDato = new Tipo(tipoDato.ENTERO);
                        let trans = op1 + '';
                        let res = trans.charCodeAt(0);
                        return parseInt(op2) * res;
                    case tipoDato.DECIMAL:
                        this.tipoDato = new Tipo(tipoDato.DECIMAL);
                        let trans2 = op1 + '';
                        let res2 = trans2.charCodeAt(0);
                        return parseFloat(op2) * res2;
                    case tipoDato.BOOL:
                        return new Errores('Semantico', 'La multiplicacion Caracter * Boolean no es permitida', this.linea, this.col);
                    case tipoDato.CARACTER:
                        return new Errores('Semantico', 'La multiplicacion Caracter * Caracter no es permitida', this.linea, this.col);
                    case tipoDato.CADENA:
                        return new Errores('Semantico', 'La multiplicacion Caracter * Cadena no es permitida', this.linea, this.col);
                    default:
                        return new Errores('Semantico', 'Tipo Dato Invalido', this.linea, this.col);
                }
            case tipoDato.CADENA:
                switch (operando2) {
                    case tipoDato.ENTERO:
                        return new Errores('Semantico', 'La multiplicacion Cadena * Entero no es permitida', this.linea, this.col);
                    case tipoDato.DECIMAL:
                        return new Errores('Semantico', 'La multiplicacion Cadena * Double no es permitida', this.linea, this.col);
                    case tipoDato.BOOL:
                        return new Errores('Semantico', 'La multiplicacion Cadena * Boolean no es permitida', this.linea, this.col);
                    case tipoDato.CARACTER:
                        return new Errores('Semantico', 'La multiplicacion Cadena * Caracter no es permitida', this.linea, this.col);
                    case tipoDato.CADENA:
                        return new Errores('Semantico', 'La multiplicacion Cadena * Cadena no es permitida', this.linea, this.col);
                    default:
                        return new Errores('Semantico', 'Tipo Dato Invalido', this.linea, this.col);
                }
            default:
                return new Errores('Semantico', 'Tipo Dato Invalido', this.linea, this.col);
        }
    }

    div(op1: any, op2: any) {
        let operando1 = this.op1?.tipoDato.getTipo();
        let operando2 = this.op2?.tipoDato.getTipo();

        switch (operando1) {
            case tipoDato.ENTERO:
                switch (operando2) {
                    case tipoDato.ENTERO:
                        this.tipoDato = new Tipo(tipoDato.DECIMAL);
                        return parseInt(op1) / parseInt(op2);
                    case tipoDato.DECIMAL:
                        this.tipoDato = new Tipo(tipoDato.DECIMAL);
                        return parseFloat(op1) / parseFloat(op2);
                    case tipoDato.BOOL:
                        return new Errores('Semantico', 'La division Entero / Boolean no es permitida', this.linea, this.col);
                    case tipoDato.CARACTER:
                        this.tipoDato = new Tipo(tipoDato.DECIMAL);
                        let trans = op2 + '';
                        let res = trans.charCodeAt(0);
                        return parseInt(op1) / res;
                    case tipoDato.CADENA:
                        return new Errores('Semantico', 'La division Entero / Cadena no es permitida', this.linea, this.col);
                    default:
                        return new Errores('Semantico', 'Tipo Dato Invalido', this.linea, this.col);
                }
            case tipoDato.DECIMAL:
                switch (operando2) {
                    case tipoDato.ENTERO:
                        this.tipoDato = new Tipo(tipoDato.DECIMAL);
                        return parseFloat(op1) / parseFloat(op2)
                    case tipoDato.DECIMAL:
                        this.tipoDato = new Tipo(tipoDato.DECIMAL);
                        return parseFloat(op1) / parseFloat(op2);
                    case tipoDato.BOOL:
                        return new Errores('Semantico', 'La division Double / Boolean no es permitida', this.linea, this.col);
                    case tipoDato.CARACTER:
                        this.tipoDato = new Tipo(tipoDato.DECIMAL);
                        let trans = op2 + '';
                        let res = trans.charCodeAt(0);
                        return parseFloat(op1) / res;
                    case tipoDato.CADENA:
                        return new Errores('Semantico', 'La division Double / Cadena no es permitida', this.linea, this.col);

                    default:
                        return new Errores('Semantico', 'Tipo Dato Invalido', this.linea, this.col);
                }
            case tipoDato.BOOL:
                switch (operando2) {
                    case tipoDato.ENTERO:
                        return new Errores('Semantico', 'La division Boolean / Entero no es permitida', this.linea, this.col);
                    case tipoDato.DECIMAL:
                        return new Errores('Semantico', 'La division Boolean / Double no es permitida', this.linea, this.col);
                    case tipoDato.BOOL:
                        return new Errores('Semantico', 'La division Boolean / Boolean no es permitida', this.linea, this.col);
                    case tipoDato.CARACTER:
                        return new Errores('Semantico', 'La division Boolean / Caracter no es permitida', this.linea, this.col);
                    case tipoDato.CADENA:
                        return new Errores('Semantico', 'La division Boolean / Cadena no es permitida', this.linea, this.col);
                    default:
                        return new Errores('Semantico', 'Tipo Dato Invalido', this.linea, this.col);
                }
            case tipoDato.CARACTER:
                switch (operando2) {
                    case tipoDato.ENTERO:
                        this.tipoDato = new Tipo(tipoDato.DECIMAL);
                        let trans = op1 + '';
                        let res = trans.charCodeAt(0);
                        return res / parseInt(op2);
                    case tipoDato.DECIMAL:
                        this.tipoDato = new Tipo(tipoDato.DECIMAL);
                        let trans2 = op1 + '';
                        let res2 = trans2.charCodeAt(0);
                        return res2 / parseFloat(op2);
                    case tipoDato.BOOL:
                        return new Errores('Semantico', 'La division Caracter / Boolean no es permitida', this.linea, this.col);
                    case tipoDato.CARACTER:
                        return new Errores('Semantico', 'La division Caracter / Caracter no es permitida', this.linea, this.col);
                    case tipoDato.CADENA:
                        return new Errores('Semantico', 'La division Caracter / Cadena no es permitida', this.linea, this.col);
                    default:
                        return new Errores('Semantico', 'Tipo Dato Invalido', this.linea, this.col);
                }
            case tipoDato.CADENA:
                switch (operando2) {
                    case tipoDato.ENTERO:
                        return new Errores('Semantico', 'La division Cadena / Entero no es permitida', this.linea, this.col);
                    case tipoDato.DECIMAL:
                        return new Errores('Semantico', 'La division Cadena / Double no es permitida', this.linea, this.col);
                    case tipoDato.BOOL:
                        return new Errores('Semantico', 'La division Cadena / Boolean no es permitida', this.linea, this.col);
                    case tipoDato.CARACTER:
                        return new Errores('Semantico', 'La division Cadena / Caracter no es permitida', this.linea, this.col);
                    case tipoDato.CADENA:
                        return new Errores('Semantico', 'La division Cadena / Cadena no es permitida', this.linea, this.col);
                    default:
                        return new Errores('Semantico', 'Tipo Dato Invalido', this.linea, this.col);
                }
            default:
                return new Errores('Semantico', 'Tipo Dato Invalido', this.linea, this.col);
        }
    }

    modul(op1: any, op2: any) {
        let operando1 = this.op1?.tipoDato.getTipo();
        let operando2 = this.op2?.tipoDato.getTipo();

        switch (operando1) {
            case tipoDato.ENTERO:
                switch (operando2) {
                    case tipoDato.ENTERO:
                        this.tipoDato = new Tipo(tipoDato.DECIMAL);
                        return parseInt(op1) % parseInt(op2);
                    case tipoDato.DECIMAL:
                        this.tipoDato = new Tipo(tipoDato.DECIMAL);
                        return parseFloat(op1) % parseFloat(op2);
                    case tipoDato.BOOL:
                        return new Errores('Semantico', 'El modulo Entero % Boolean no es permitida', this.linea, this.col);
                    case tipoDato.CARACTER:
                        this.tipoDato = new Tipo(tipoDato.DECIMAL);
                        let trans = op2 + '';
                        let res = trans.charCodeAt(0);
                        return parseInt(op1) % res;
                    case tipoDato.CADENA:
                        return new Errores('Semantico', 'El modulo Entero % Cadena no es permitida', this.linea, this.col);
                    default:
                        return new Errores('Semantico', 'Tipo Dato Invalido', this.linea, this.col);
                }
            case tipoDato.DECIMAL:
                switch (operando2) {
                    case tipoDato.ENTERO:
                        this.tipoDato = new Tipo(tipoDato.DECIMAL);
                        return parseFloat(op1) % parseFloat(op2)
                    case tipoDato.DECIMAL:
                        this.tipoDato = new Tipo(tipoDato.DECIMAL);
                        return parseFloat(op1) % parseFloat(op2);
                    case tipoDato.BOOL:
                        return new Errores('Semantico', 'El modulo Double % Boolean no es permitida', this.linea, this.col);
                    case tipoDato.CARACTER:
                        this.tipoDato = new Tipo(tipoDato.DECIMAL);
                        let trans = op2 + '';
                        let res = trans.charCodeAt(0);
                        return parseFloat(op1) % res;
                    case tipoDato.CADENA:
                        return new Errores('Semantico', 'El modulo Double % Cadena no es permitida', this.linea, this.col);

                    default:
                        return new Errores('Semantico', 'Tipo Dato Invalido', this.linea, this.col);
                }
            case tipoDato.BOOL:
                switch (operando2) {
                    case tipoDato.ENTERO:
                        return new Errores('Semantico', 'El modulo Boolean % Entero no es permitida', this.linea, this.col);
                    case tipoDato.DECIMAL:
                        return new Errores('Semantico', 'El modulo Boolean % Double no es permitida', this.linea, this.col);
                    case tipoDato.BOOL:
                        return new Errores('Semantico', 'El modulo Boolean % Boolean no es permitida', this.linea, this.col);
                    case tipoDato.CARACTER:
                        return new Errores('Semantico', 'El modulo Boolean % Caracter no es permitida', this.linea, this.col);
                    case tipoDato.CADENA:
                        return new Errores('Semantico', 'El modulo Boolean % Cadena no es permitida', this.linea, this.col);
                    default:
                        return new Errores('Semantico', 'Tipo Dato Invalido', this.linea, this.col);
                }
            case tipoDato.CARACTER:
                switch (operando2) {
                    case tipoDato.ENTERO:
                        this.tipoDato = new Tipo(tipoDato.DECIMAL);
                        let trans = op1 + '';
                        let res = trans.charCodeAt(0);
                        return res % parseInt(op2);
                    case tipoDato.DECIMAL:
                        this.tipoDato = new Tipo(tipoDato.DECIMAL);
                        let trans2 = op1 + '';
                        let res2 = trans2.charCodeAt(0);
                        return res2 % parseFloat(op2);
                    case tipoDato.BOOL:
                        return new Errores('Semantico', 'El modulo Caracter % Boolean no es permitida', this.linea, this.col);
                    case tipoDato.CARACTER:
                        return new Errores('Semantico', 'El modulo Caracter % Caracter no es permitida', this.linea, this.col);
                    case tipoDato.CADENA:
                        return new Errores('Semantico', 'El modulo Caracter % Cadena no es permitida', this.linea, this.col);
                    default:
                        return new Errores('Semantico', 'Tipo Dato Invalido', this.linea, this.col);
                }
            case tipoDato.CADENA:
                switch (operando2) {
                    case tipoDato.ENTERO:
                        return new Errores('Semantico', 'El modulo Cadena % Entero no es permitida', this.linea, this.col);
                    case tipoDato.DECIMAL:
                        return new Errores('Semantico', 'El modulo Cadena % Double no es permitida', this.linea, this.col);
                    case tipoDato.BOOL:
                        return new Errores('Semantico', 'El modulo Cadena % Boolean no es permitida', this.linea, this.col);
                    case tipoDato.CARACTER:
                        return new Errores('Semantico', 'El modulo Cadena % Caracter no es permitida', this.linea, this.col);
                    case tipoDato.CADENA:
                        return new Errores('Semantico', 'El modulo Cadena % Cadena no es permitida', this.linea, this.col);
                    default:
                        return new Errores('Semantico', 'Tipo Dato Invalido', this.linea, this.col);
                }
            default:
                return new Errores('Semantico', 'Tipo Dato Invalido', this.linea, this.col);
        }
    }

    pow(op1: any, op2: any) {
        let operando1 = this.op1?.tipoDato.getTipo();
        let operando2 = this.op2?.tipoDato.getTipo();

        switch (operando1) {
            case tipoDato.ENTERO:
                switch (operando2) {
                    case tipoDato.ENTERO:
                        this.tipoDato = new Tipo(tipoDato.ENTERO);
                        return Math.pow(parseInt(op1), parseInt(op2));
                    case tipoDato.DECIMAL:
                        this.tipoDato = new Tipo(tipoDato.DECIMAL);
                        return Math.pow(parseFloat(op1), parseFloat(op2));
                    case tipoDato.BOOL:
                        return new Errores('Semantico', 'La potencia Entero ^ Boolean no es permitida', this.linea, this.col);
                    case tipoDato.CARACTER:
                        return new Errores('Semantico', 'La potencia Entero ^ Caracter no es permitida', this.linea, this.col);
                    case tipoDato.CADENA:
                        return new Errores('Semantico', 'La potencia Entero ^ Cadena no es permitida', this.linea, this.col);
                    default:
                        return new Errores('Semantico', 'Tipo Dato Invalido', this.linea, this.col);
                }
            case tipoDato.DECIMAL:
                switch (operando2) {
                    case tipoDato.ENTERO:
                        this.tipoDato = new Tipo(tipoDato.DECIMAL);
                        return Math.pow(parseFloat(op1), parseFloat(op2));
                    case tipoDato.DECIMAL:
                        this.tipoDato = new Tipo(tipoDato.DECIMAL);
                        return Math.pow(parseFloat(op1), parseFloat(op2));
                    case tipoDato.BOOL:
                        return new Errores('Semantico', 'La potencia Double ^ Boolean no es permitida', this.linea, this.col);
                    case tipoDato.CARACTER:
                        return new Errores('Semantico', 'La potencia Double ^ Caracter no es permitida', this.linea, this.col);
                    case tipoDato.CADENA:
                        return new Errores('Semantico', 'La potencia Double ^ Cadena no es permitida', this.linea, this.col);
                    default:
                        return new Errores('Semantico', 'Tipo Dato Invalido', this.linea, this.col);
                }
            case tipoDato.BOOL:
                switch (operando2) {
                    case tipoDato.ENTERO:
                        return new Errores('Semantico', 'La potencia Boolean ^ Entero no es permitida', this.linea, this.col);
                    case tipoDato.DECIMAL:
                        return new Errores('Semantico', 'La potencia Boolean ^ Double no es permitida', this.linea, this.col);
                    case tipoDato.BOOL:
                        return new Errores('Semantico', 'La potencia Boolean ^ Boolean no es permitida', this.linea, this.col);
                    case tipoDato.CARACTER:
                        return new Errores('Semantico', 'La potencia Boolean ^ Caracter no es permitida', this.linea, this.col);
                    case tipoDato.CADENA:
                        return new Errores('Semantico', 'La potencia Boolean ^ Cadena no es permitida', this.linea, this.col);
                    default:
                        return new Errores('Semantico', 'Tipo Dato Invalido', this.linea, this.col);
                }
            case tipoDato.CARACTER:
                switch (operando2) {
                    case tipoDato.ENTERO:
                        return new Errores('Semantico', 'La potencia Caracter ^ Entero no es permitida', this.linea, this.col);
                    case tipoDato.DECIMAL:
                        return new Errores('Semantico', 'La potencia Caracter ^ Double no es permitida', this.linea, this.col);
                    case tipoDato.BOOL:
                        return new Errores('Semantico', 'La potencia Caracter ^ Boolean no es permitida', this.linea, this.col);
                    case tipoDato.CARACTER:
                        return new Errores('Semantico', 'La potencia Caracter ^ Caracter no es permitida', this.linea, this.col);
                    case tipoDato.CADENA:
                        return new Errores('Semantico', 'La potencia Caracter ^ Cadena no es permitida', this.linea, this.col);
                    default:
                        return new Errores('Semantico', 'Tipo Dato Invalido', this.linea, this.col);
                }
            case tipoDato.CADENA:
                switch (operando2) {
                    case tipoDato.ENTERO:
                        return new Errores('Semantico', 'La potencia Cadena ^ Entero no es permitida', this.linea, this.col);
                    case tipoDato.DECIMAL:
                        return new Errores('Semantico', 'La potencia Cadena ^ Double no es permitida', this.linea, this.col);
                    case tipoDato.BOOL:
                        return new Errores('Semantico', 'La potencia Cadena ^ Boolean no es permitida', this.linea, this.col);
                    case tipoDato.CARACTER:
                        return new Errores('Semantico', 'La potencia Cadena ^ Caracter no es permitida', this.linea, this.col);
                    case tipoDato.CADENA:
                        return new Errores('Semantico', 'La potencia Cadena ^ Cadena no es permitida', this.linea, this.col);
                    default:
                        return new Errores('Semantico', 'Tipo Dato Invalido', this.linea, this.col);
                }
            default:
                return new Errores('Semantico', 'Tipo Dato Invalido', this.linea, this.col);
        }
    }

    neg(apU: any) {
        let operandoUnico = this.opU?.tipoDato.getTipo();
        switch (operandoUnico) {
            case tipoDato.ENTERO:
                this.tipoDato = new Tipo(tipoDato.ENTERO);
                return apU * -1
            case tipoDato.DECIMAL:
                this.tipoDato = new Tipo(tipoDato.DECIMAL);
                return apU * -1
            case tipoDato.BOOL:
                return new Errores('Semantico', 'Negacion Unaria invalida', this.linea, this.col);
            case tipoDato.CARACTER:
                return new Errores('Semantico', 'Negacion Unaria invalida ', this.linea, this.col);
            case tipoDato.CADENA:
                return new Errores('Semantico', 'Negacion Unaria invalida ', this.linea, this.col);
            default:
                return new Errores('Semantico', 'Tipo Dato Invalido', this.linea, this.col);
        }
    }

    generarDot(anterior: string) {
        let cadena = "";
        if (this.opU != null) {
            let nodo1 = "n" + (numeroNodo.no + 1);
            let nodo2 = "n" + (numeroNodo.no + 2);
            numeroNodo.no += 2;
            cadena += nodo1 + "[label=\"-\"];\n";
            cadena += nodo2 + "[label=\"EXP\"];\n";
            cadena += anterior + "->" + nodo1 + ";\n";
            cadena += anterior + "->" + nodo2 + ";\n";
            cadena += this.opU.generarDot(nodo2);
            return cadena;
        } else {
            let nodo1 = "n" + (numeroNodo.no + 1);
            let nodo2 = "n" + (numeroNodo.no + 2);
            let nodo3 = "n" + (numeroNodo.no + 3);
            numeroNodo.no += 3;
            cadena += nodo1 + "[label=\"EXP\"];\n";
            switch (this.operacion) {
                case Operadores.SUMA:
                    cadena += nodo2 + "[label=\"+\"];\n";
                    break;
                case Operadores.RESTA:
                    cadena += nodo2 + "[label=\"-\"];\n";
                    break;
                case Operadores.MULT:
                    cadena += nodo2 + "[label=\"*\"];\n";
                    break;
                case Operadores.DIV:
                    cadena += nodo2 + "[label=\"/\"];\n";
                    break;
                case Operadores.POW:
                    cadena += nodo2 + "[label=\"^\"];\n";
                    break;
                case Operadores.MOD:
                    cadena += nodo2 + "[label=\"%\"];\n";
                    break;
            }
            cadena += nodo3 + "[label=\"EXP\"];\n";
            cadena += anterior + "->" + nodo1 + ";\n";
            cadena += anterior + "->" + nodo2 + ";\n";
            cadena += anterior + "->" + nodo3 + ";\n";
            cadena += this.op1?.generarDot(nodo1);
            cadena += this.op2?.generarDot(nodo3);
            return cadena;

        }
    }
}

export enum Operadores {
    SUMA,
    RESTA,
    MULT,
    DIV,
    POW,
    MOD,
    NEG
}