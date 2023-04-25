import { numeroNodo } from "../../indexController";
import { Instruccion } from "../abstracto/Instruccion";
import Errores from "../excepciones/Errores";
import Arbol from "../simbolo/Arbol";
import tablaSimbolo from "../simbolo/tablaSimbolos";
import Tipo, { tipoDato } from "../simbolo/Tipo";

export default class Relacionales extends Instruccion {
    private cond1: Instruccion | undefined;
    private cond2: Instruccion | undefined;
    private relacional: Relacional | undefined;

    constructor(relacional: Relacional, fila: number, col: number, cond1: Instruccion, cond2: Instruccion) {
        super(new Tipo(tipoDato.BOOL), fila, col);
        this.relacional = relacional
        this.cond1 = cond1;
        this.cond2 = cond2;
    }

    interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        let conIzq, conDer = null;

        conIzq = this.cond1?.interpretar(arbol, tabla);
        if (conIzq instanceof Errores) return conIzq;

        conDer = this.cond2?.interpretar(arbol, tabla);
        if (conDer instanceof Errores) return conDer;

        switch (this.relacional) {
            case Relacional.EQUALS:
                return this.equals(conIzq, conDer);
            case Relacional.NOTEQUAL:
                let verificacion = this.equals(conIzq, conDer);
                if (verificacion instanceof Errores) return verificacion;
                return !verificacion;
            case Relacional.MENOR:
                return this.menor(conIzq, conDer);
            case Relacional.MENOREQ:
                return this.menorIgual(conIzq, conDer);
            case Relacional.MAYOR:
                return this.mayor(conIzq, conDer);
            case Relacional.MAYOREQ:
                return this.mayorIgual(conIzq, conDer);

            default:
                return new Errores('Semantico', 'Relacional Invalido', this.linea, this.col);

        }
    }

    equals(comp1: any, comp2: any) {
        let comparando1 = this.cond1?.tipoDato.getTipo();
        let comparando2 = this.cond2?.tipoDato.getTipo();

        switch (comparando1) {
            case tipoDato.ENTERO:
                switch (comparando2) {
                    case tipoDato.ENTERO:
                        return parseInt(comp1) == parseInt(comp2);
                    case tipoDato.DECIMAL:
                        return parseFloat(comp1) == parseInt(comp2);
                    case tipoDato.BOOL:
                        return new Errores('Semantico', 'No se puede comparar Entero con Boolean', this.linea, this.col);
                    case tipoDato.CARACTER:
                        let trans = comp2 + '';
                        let res = trans.charCodeAt(0);
                        return parseInt(comp1) == res;
                    case tipoDato.CADENA:
                        return new Errores('Semantico', 'No se puede comparar Entero con Cadena', this.linea, this.col);
                    default:
                        return new Errores('Semantico', 'Tipo Dato Invalido', this.linea, this.col);
                }
            case tipoDato.DECIMAL:
                switch (comparando2) {
                    case tipoDato.ENTERO:
                        return parseFloat(comp1) == parseFloat(comp2);
                    case tipoDato.DECIMAL:
                        return parseFloat(comp1) == parseFloat(comp2);
                    case tipoDato.BOOL:
                        return new Errores('Semantico', 'No se puede comparar Double con Boolean', this.linea, this.col);
                    case tipoDato.CARACTER:
                        let trans = comp2 + '';
                        let res = trans.charCodeAt(0);
                        return parseFloat(comp1) == res;
                    case tipoDato.CADENA:
                        return new Errores('Semantico', 'No se puede comparar Double con Cadena', this.linea, this.col);
                    default:
                        return new Errores('Semantico', 'Tipo Dato Invalido', this.linea, this.col);
                }
            case tipoDato.BOOL:
                switch (comparando2) {
                    case tipoDato.ENTERO:
                        return new Errores('Semantico', 'No se puede comparar Boolean con Entero', this.linea, this.col);
                    case tipoDato.DECIMAL:
                        return new Errores('Semantico', 'No se puede comparar Boolean con Double', this.linea, this.col);
                    case tipoDato.BOOL:
                        return comp1 == comp2;
                    case tipoDato.CARACTER:
                        return new Errores('Semantico', 'No se puede comparar Boolean con Caracter', this.linea, this.col);
                    case tipoDato.CADENA:
                        return new Errores('Semantico', 'No se puede comparar Boolean con Cadena', this.linea, this.col);
                    default:
                        return new Errores('Semantico', 'Tipo Dato Invalido', this.linea, this.col);
                }
            case tipoDato.CARACTER:
                switch (comparando2) {
                    case tipoDato.ENTERO:
                        let trans = comp1 + '';
                        let res = trans.charCodeAt(0);
                        return parseInt(comp2) == res;
                    case tipoDato.DECIMAL:
                        let trans2 = comp1 + '';
                        let res2 = trans2.charCodeAt(0);
                        return parseFloat(comp2) == res2;
                    case tipoDato.BOOL:
                        return new Errores('Semantico', 'No se puede comparar Caracter con Boolean', this.linea, this.col);
                    case tipoDato.CARACTER:
                        //conversion primer dato
                        let trans11 = comp1 + '';
                        let res11 = trans11.charCodeAt(0);
                        //conversion segundo dato
                        let trans22 = comp2 + '';
                        let res22 = trans22.charCodeAt(0);
                        return res11 == res22;
                    case tipoDato.CADENA:
                        return new Errores('Semantico', 'No se puede comparar Caracter con Cadena', this.linea, this.col);
                    default:
                        return new Errores('Semantico', 'Tipo Dato Invalido', this.linea, this.col);
                }
            case tipoDato.CADENA:
                switch (comparando2) {
                    case tipoDato.ENTERO:
                        return new Errores('Semantico', 'No se puede comparar Cadena con Entero', this.linea, this.col);
                    case tipoDato.DECIMAL:
                        return new Errores('Semantico', 'No se puede comparar Cadena con Decimal', this.linea, this.col);
                    case tipoDato.BOOL:
                        return new Errores('Semantico', 'No se puede comparar Cadena con Boolean', this.linea, this.col);
                    case tipoDato.CARACTER:
                        return new Errores('Semantico', 'No se puede comparar Cadena con Caracter', this.linea, this.col);
                    case tipoDato.CADENA:
                        return comp1 == comp2;
                    default:
                        return new Errores('Semantico', 'Tipo Dato Invalido', this.linea, this.col);
                }
            default:
                return new Errores('Semantico', 'Tipo Dato Invalido', this.linea, this.col);

        }
    }

    menor(comp1: any, comp2: any) {
        let comparando1 = this.cond1?.tipoDato.getTipo();
        let comparando2 = this.cond2?.tipoDato.getTipo();

        switch (comparando1) {
            case tipoDato.ENTERO:
                switch (comparando2) {
                    case tipoDato.ENTERO:
                        return parseInt(comp1) < parseInt(comp2);
                    case tipoDato.DECIMAL:
                        return parseFloat(comp1) < parseInt(comp2);
                    case tipoDato.BOOL:
                        return new Errores('Semantico', 'No se puede comparar Entero con Boolean', this.linea, this.col);
                    case tipoDato.CARACTER:
                        let trans = comp2 + '';
                        let res = trans.charCodeAt(0);
                        return parseInt(comp1) < res;
                    case tipoDato.CADENA:
                        return new Errores('Semantico', 'No se puede comparar Entero con Cadena', this.linea, this.col);
                    default:
                        return new Errores('Semantico', 'Tipo Dato Invalido', this.linea, this.col);
                }
            case tipoDato.DECIMAL:
                switch (comparando2) {
                    case tipoDato.ENTERO:
                        return parseFloat(comp1) < parseFloat(comp2);
                    case tipoDato.DECIMAL:
                        return parseFloat(comp1) < parseFloat(comp2);
                    case tipoDato.BOOL:
                        return new Errores('Semantico', 'No se puede comparar Double con Boolean', this.linea, this.col);
                    case tipoDato.CARACTER:
                        let trans = comp2 + '';
                        let res = trans.charCodeAt(0);
                        return parseFloat(comp1) < res;
                    case tipoDato.CADENA:
                        return new Errores('Semantico', 'No se puede comparar Double con Cadena', this.linea, this.col);
                    default:
                        return new Errores('Semantico', 'Tipo Dato Invalido', this.linea, this.col);
                }
            case tipoDato.BOOL:
                switch (comparando2) {
                    case tipoDato.ENTERO:
                        return new Errores('Semantico', 'No se puede comparar Boolean con Entero', this.linea, this.col);
                    case tipoDato.DECIMAL:
                        return new Errores('Semantico', 'No se puede comparar Boolean con Double', this.linea, this.col);
                    case tipoDato.BOOL:
                        return comp1 < comp2;
                    case tipoDato.CARACTER:
                        return new Errores('Semantico', 'No se puede comparar Boolean con Caracter', this.linea, this.col);
                    case tipoDato.CADENA:
                        return new Errores('Semantico', 'No se puede comparar Boolean con Cadena', this.linea, this.col);
                    default:
                        return new Errores('Semantico', 'Tipo Dato Invalido', this.linea, this.col);
                }
            case tipoDato.CARACTER:
                switch (comparando2) {
                    case tipoDato.ENTERO:
                        let trans = comp1 + '';
                        let res = trans.charCodeAt(0);
                        return parseInt(comp2) > res;
                    case tipoDato.DECIMAL:
                        let trans2 = comp1 + '';
                        let res2 = trans2.charCodeAt(0);
                        return parseFloat(comp2) > res2;
                    case tipoDato.BOOL:
                        return new Errores('Semantico', 'No se puede comparar Caracter con Boolean', this.linea, this.col);
                    case tipoDato.CARACTER:
                        //conversion primer dato
                        let trans11 = comp1 + '';
                        let res11 = trans11.charCodeAt(0);
                        //conversion segundo dato
                        let trans22 = comp2 + '';
                        let res22 = trans22.charCodeAt(0);
                        return res11 < res22;
                    case tipoDato.CADENA:
                        return new Errores('Semantico', 'No se puede comparar Caracter con Cadena', this.linea, this.col);
                    default:
                        return new Errores('Semantico', 'Tipo Dato Invalido', this.linea, this.col);
                }
            case tipoDato.CADENA:
                switch (comparando2) {
                    case tipoDato.ENTERO:
                        return new Errores('Semantico', 'No se puede comparar Cadena con Entero', this.linea, this.col);
                    case tipoDato.DECIMAL:
                        return new Errores('Semantico', 'No se puede comparar Cadena con Decimal', this.linea, this.col);
                    case tipoDato.BOOL:
                        return new Errores('Semantico', 'No se puede comparar Cadena con Boolean', this.linea, this.col);
                    case tipoDato.CARACTER:
                        return new Errores('Semantico', 'No se puede comparar Cadena con Caracter', this.linea, this.col);
                    case tipoDato.CADENA:
                        return comp1 < comp2;
                    default:
                        return new Errores('Semantico', 'Tipo Dato Invalido', this.linea, this.col);
                }
            default:
                return new Errores('Semantico', 'Tipo Dato Invalido', this.linea, this.col);

        }
    }

    menorIgual(comp1: any, comp2: any) {
        let comparando1 = this.cond1?.tipoDato.getTipo();
        let comparando2 = this.cond2?.tipoDato.getTipo();

        switch (comparando1) {
            case tipoDato.ENTERO:
                switch (comparando2) {
                    case tipoDato.ENTERO:
                        return parseInt(comp1) <= parseInt(comp2);
                    case tipoDato.DECIMAL:
                        return parseFloat(comp1) <= parseInt(comp2);
                    case tipoDato.BOOL:
                        return new Errores('Semantico', 'No se puede comparar Entero con Boolean', this.linea, this.col);
                    case tipoDato.CARACTER:
                        let trans = comp2 + '';
                        let res = trans.charCodeAt(0);
                        return parseInt(comp1) <= res;
                    case tipoDato.CADENA:
                        return new Errores('Semantico', 'No se puede comparar Entero con Cadena', this.linea, this.col);
                    default:
                        return new Errores('Semantico', 'Tipo Dato Invalido', this.linea, this.col);
                }
            case tipoDato.DECIMAL:
                switch (comparando2) {
                    case tipoDato.ENTERO:
                        return parseFloat(comp1) <= parseFloat(comp2);
                    case tipoDato.DECIMAL:
                        return parseFloat(comp1) <= parseFloat(comp2);
                    case tipoDato.BOOL:
                        return new Errores('Semantico', 'No se puede comparar Double con Boolean', this.linea, this.col);
                    case tipoDato.CARACTER:
                        let trans = comp2 + '';
                        let res = trans.charCodeAt(0);
                        return parseFloat(comp1) <= res;
                    case tipoDato.CADENA:
                        return new Errores('Semantico', 'No se puede comparar Double con Cadena', this.linea, this.col);
                    default:
                        return new Errores('Semantico', 'Tipo Dato Invalido', this.linea, this.col);
                }
            case tipoDato.BOOL:
                switch (comparando2) {
                    case tipoDato.ENTERO:
                        return new Errores('Semantico', 'No se puede comparar Boolean con Entero', this.linea, this.col);
                    case tipoDato.DECIMAL:
                        return new Errores('Semantico', 'No se puede comparar Boolean con Double', this.linea, this.col);
                    case tipoDato.BOOL:
                        return comp1 <= comp2;
                    case tipoDato.CARACTER:
                        return new Errores('Semantico', 'No se puede comparar Boolean con Caracter', this.linea, this.col);
                    case tipoDato.CADENA:
                        return new Errores('Semantico', 'No se puede comparar Boolean con Cadena', this.linea, this.col);
                    default:
                        return new Errores('Semantico', 'Tipo Dato Invalido', this.linea, this.col);
                }
            case tipoDato.CARACTER:
                switch (comparando2) {
                    case tipoDato.ENTERO:
                        let trans = comp1 + '';
                        let res = trans.charCodeAt(0);
                        return parseInt(comp2) >= res;
                    case tipoDato.DECIMAL:
                        let trans2 = comp1 + '';
                        let res2 = trans2.charCodeAt(0);
                        return parseFloat(comp2) >= res2;
                    case tipoDato.BOOL:
                        return new Errores('Semantico', 'No se puede comparar Caracter con Boolean', this.linea, this.col);
                    case tipoDato.CARACTER:
                        //conversion primer dato
                        let trans11 = comp1 + '';
                        let res11 = trans11.charCodeAt(0);
                        //conversion segundo dato
                        let trans22 = comp2 + '';
                        let res22 = trans22.charCodeAt(0);
                        return res11 <= res22;
                    case tipoDato.CADENA:
                        return new Errores('Semantico', 'No se puede comparar Caracter con Cadena', this.linea, this.col);
                    default:
                        return new Errores('Semantico', 'Tipo Dato Invalido', this.linea, this.col);
                }
            case tipoDato.CADENA:
                switch (comparando2) {
                    case tipoDato.ENTERO:
                        return new Errores('Semantico', 'No se puede comparar Cadena con Entero', this.linea, this.col);
                    case tipoDato.DECIMAL:
                        return new Errores('Semantico', 'No se puede comparar Cadena con Decimal', this.linea, this.col);
                    case tipoDato.BOOL:
                        return new Errores('Semantico', 'No se puede comparar Cadena con Boolean', this.linea, this.col);
                    case tipoDato.CARACTER:
                        return new Errores('Semantico', 'No se puede comparar Cadena con Caracter', this.linea, this.col);
                    case tipoDato.CADENA:
                        return comp1 <= comp2;
                    default:
                        return new Errores('Semantico', 'Tipo Dato Invalido', this.linea, this.col);
                }
            default:
                return new Errores('Semantico', 'Tipo Dato Invalido', this.linea, this.col);

        }
    }

    mayor(comp1: any, comp2: any) {
        let comparando1 = this.cond1?.tipoDato.getTipo();
        let comparando2 = this.cond2?.tipoDato.getTipo();

        switch (comparando1) {
            case tipoDato.ENTERO:
                switch (comparando2) {
                    case tipoDato.ENTERO:
                        return parseInt(comp1) > parseInt(comp2);
                    case tipoDato.DECIMAL:
                        return parseFloat(comp1) > parseInt(comp2);
                    case tipoDato.BOOL:
                        return new Errores('Semantico', 'No se puede comparar Entero con Boolean', this.linea, this.col);
                    case tipoDato.CARACTER:
                        let trans = comp2 + '';
                        let res = trans.charCodeAt(0);
                        return parseInt(comp1) > res;
                    case tipoDato.CADENA:
                        return new Errores('Semantico', 'No se puede comparar Entero con Cadena', this.linea, this.col);
                    default:
                        return new Errores('Semantico', 'Tipo Dato Invalido', this.linea, this.col);
                }
            case tipoDato.DECIMAL:
                switch (comparando2) {
                    case tipoDato.ENTERO:
                        return parseFloat(comp1) > parseFloat(comp2);
                    case tipoDato.DECIMAL:
                        return parseFloat(comp1) > parseFloat(comp2);
                    case tipoDato.BOOL:
                        return new Errores('Semantico', 'No se puede comparar Double con Boolean', this.linea, this.col);
                    case tipoDato.CARACTER:
                        let trans = comp2 + '';
                        let res = trans.charCodeAt(0);
                        return parseFloat(comp1) > res;
                    case tipoDato.CADENA:
                        return new Errores('Semantico', 'No se puede comparar Double con Cadena', this.linea, this.col);
                    default:
                        return new Errores('Semantico', 'Tipo Dato Invalido', this.linea, this.col);
                }
            case tipoDato.BOOL:
                switch (comparando2) {
                    case tipoDato.ENTERO:
                        return new Errores('Semantico', 'No se puede comparar Boolean con Entero', this.linea, this.col);
                    case tipoDato.DECIMAL:
                        return new Errores('Semantico', 'No se puede comparar Boolean con Double', this.linea, this.col);
                    case tipoDato.BOOL:
                        return comp1 > comp2;
                    case tipoDato.CARACTER:
                        return new Errores('Semantico', 'No se puede comparar Boolean con Caracter', this.linea, this.col);
                    case tipoDato.CADENA:
                        return new Errores('Semantico', 'No se puede comparar Boolean con Cadena', this.linea, this.col);
                    default:
                        return new Errores('Semantico', 'Tipo Dato Invalido', this.linea, this.col);
                }
            case tipoDato.CARACTER:
                switch (comparando2) {
                    case tipoDato.ENTERO:
                        let trans = comp1 + '';
                        let res = trans.charCodeAt(0);
                        return parseInt(comp2) < res;
                    case tipoDato.DECIMAL:
                        let trans2 = comp1 + '';
                        let res2 = trans2.charCodeAt(0);
                        return parseFloat(comp2) < res2;
                    case tipoDato.BOOL:
                        return new Errores('Semantico', 'No se puede comparar Caracter con Boolean', this.linea, this.col);
                    case tipoDato.CARACTER:
                        //conversion primer dato
                        let trans11 = comp1 + '';
                        let res11 = trans11.charCodeAt(0);
                        //conversion segundo dato
                        let trans22 = comp2 + '';
                        let res22 = trans22.charCodeAt(0);
                        return res11 > res22;
                    case tipoDato.CADENA:
                        return new Errores('Semantico', 'No se puede comparar Caracter con Cadena', this.linea, this.col);
                    default:
                        return new Errores('Semantico', 'Tipo Dato Invalido', this.linea, this.col);
                }
            case tipoDato.CADENA:
                switch (comparando2) {
                    case tipoDato.ENTERO:
                        return new Errores('Semantico', 'No se puede comparar Cadena con Entero', this.linea, this.col);
                    case tipoDato.DECIMAL:
                        return new Errores('Semantico', 'No se puede comparar Cadena con Decimal', this.linea, this.col);
                    case tipoDato.BOOL:
                        return new Errores('Semantico', 'No se puede comparar Cadena con Boolean', this.linea, this.col);
                    case tipoDato.CARACTER:
                        return new Errores('Semantico', 'No se puede comparar Cadena con Caracter', this.linea, this.col);
                    case tipoDato.CADENA:
                        return comp1 > comp2;
                    default:
                        return new Errores('Semantico', 'Tipo Dato Invalido', this.linea, this.col);
                }
            default:
                return new Errores('Semantico', 'Tipo Dato Invalido', this.linea, this.col);

        }
    }

    mayorIgual(comp1: any, comp2: any) {
        let comparando1 = this.cond1?.tipoDato.getTipo();
        let comparando2 = this.cond2?.tipoDato.getTipo();

        switch (comparando1) {
            case tipoDato.ENTERO:
                switch (comparando2) {
                    case tipoDato.ENTERO:
                        return parseInt(comp1) >= parseInt(comp2);
                    case tipoDato.DECIMAL:
                        return parseFloat(comp1) >= parseInt(comp2);
                    case tipoDato.BOOL:
                        return new Errores('Semantico', 'No se puede comparar Entero con Boolean', this.linea, this.col);
                    case tipoDato.CARACTER:
                        let trans = comp2 + '';
                        let res = trans.charCodeAt(0);
                        return parseInt(comp1) >= res;
                    case tipoDato.CADENA:
                        return new Errores('Semantico', 'No se puede comparar Entero con Cadena', this.linea, this.col);
                    default:
                        return new Errores('Semantico', 'Tipo Dato Invalido', this.linea, this.col);
                }
            case tipoDato.DECIMAL:
                switch (comparando2) {
                    case tipoDato.ENTERO:
                        return parseFloat(comp1) >= parseFloat(comp2);
                    case tipoDato.DECIMAL:
                        return parseFloat(comp1) >= parseFloat(comp2);
                    case tipoDato.BOOL:
                        return new Errores('Semantico', 'No se puede comparar Double con Boolean', this.linea, this.col);
                    case tipoDato.CARACTER:
                        let trans = comp2 + '';
                        let res = trans.charCodeAt(0);
                        return parseFloat(comp1) >= res;
                    case tipoDato.CADENA:
                        return new Errores('Semantico', 'No se puede comparar Double con Cadena', this.linea, this.col);
                    default:
                        return new Errores('Semantico', 'Tipo Dato Invalido', this.linea, this.col);
                }
            case tipoDato.BOOL:
                switch (comparando2) {
                    case tipoDato.ENTERO:
                        return new Errores('Semantico', 'No se puede comparar Boolean con Entero', this.linea, this.col);
                    case tipoDato.DECIMAL:
                        return new Errores('Semantico', 'No se puede comparar Boolean con Double', this.linea, this.col);
                    case tipoDato.BOOL:
                        return comp1 >= comp2;
                    case tipoDato.CARACTER:
                        return new Errores('Semantico', 'No se puede comparar Boolean con Caracter', this.linea, this.col);
                    case tipoDato.CADENA:
                        return new Errores('Semantico', 'No se puede comparar Boolean con Cadena', this.linea, this.col);
                    default:
                        return new Errores('Semantico', 'Tipo Dato Invalido', this.linea, this.col);
                }
            case tipoDato.CARACTER:
                switch (comparando2) {
                    case tipoDato.ENTERO:
                        let trans = comp1 + '';
                        let res = trans.charCodeAt(0);
                        return parseInt(comp2) <= res;
                    case tipoDato.DECIMAL:
                        let trans2 = comp1 + '';
                        let res2 = trans2.charCodeAt(0);
                        return parseFloat(comp2) <= res2;
                    case tipoDato.BOOL:
                        return new Errores('Semantico', 'No se puede comparar Caracter con Boolean', this.linea, this.col);
                    case tipoDato.CARACTER:
                        //conversion primer dato
                        let trans11 = comp1 + '';
                        let res11 = trans11.charCodeAt(0);
                        //conversion segundo dato
                        let trans22 = comp2 + '';
                        let res22 = trans22.charCodeAt(0);
                        return res11 >= res22;
                    case tipoDato.CADENA:
                        return new Errores('Semantico', 'No se puede comparar Caracter con Cadena', this.linea, this.col);
                    default:
                        return new Errores('Semantico', 'Tipo Dato Invalido', this.linea, this.col);
                }
            case tipoDato.CADENA:
                switch (comparando2) {
                    case tipoDato.ENTERO:
                        return new Errores('Semantico', 'No se puede comparar Cadena con Entero', this.linea, this.col);
                    case tipoDato.DECIMAL:
                        return new Errores('Semantico', 'No se puede comparar Cadena con Decimal', this.linea, this.col);
                    case tipoDato.BOOL:
                        return new Errores('Semantico', 'No se puede comparar Cadena con Boolean', this.linea, this.col);
                    case tipoDato.CARACTER:
                        return new Errores('Semantico', 'No se puede comparar Cadena con Caracter', this.linea, this.col);
                    case tipoDato.CADENA:
                        return comp1 >= comp2;
                    default:
                        return new Errores('Semantico', 'Tipo Dato Invalido', this.linea, this.col);
                }
            default:
                return new Errores('Semantico', 'Tipo Dato Invalido', this.linea, this.col);

        }
    }

    generarDot(anterior: string) {
        let cadena = "";
        let nodo1 = "n" + (numeroNodo.no + 1);
        let nodo2 = "n" + (numeroNodo.no + 2);
        let nodo3 = "n" + (numeroNodo.no + 3);
        numeroNodo.no += 3;
        cadena += nodo1 + "[label=\"EXP\"];\n";
        switch (this.relacional) {
            case Relacional.EQUALS:
                cadena += nodo2 + "[label=\"==\"];\n";
                break;
            case Relacional.NOTEQUAL:
                cadena += nodo2 + "[label=\"!=\"];\n";
                break;
            case Relacional.MENOR:
                cadena += nodo2 + "[label=\"<\"];\n";
                break;
            case Relacional.MENOREQ:
                cadena += nodo2 + "[label=\"<=\"];\n";
                break;
            case Relacional.MAYOR:
                cadena += nodo2 + "[label=\">\"];\n";
                break;
            case Relacional.MAYOREQ:
                cadena += nodo2 + "[label=\">=\"];\n";
                break;
        }
        cadena += nodo3 + "[label=\"EXP\"];\n";
        cadena += anterior + "->" + nodo1 + ";\n";
        cadena += anterior + "->" + nodo2 + ";\n";
        cadena += anterior + "->" + nodo3 + ";\n";
        cadena += this.cond1?.generarDot(nodo1);
        cadena += this.cond2?.generarDot(nodo3);
        return cadena;
    }

}

export enum Relacional {
    EQUALS,
    NOTEQUAL,
    MENOR,
    MENOREQ,
    MAYOR,
    MAYOREQ
}