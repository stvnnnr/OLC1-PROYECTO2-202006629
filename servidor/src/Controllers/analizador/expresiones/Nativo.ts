import { numeroNodo } from '../../indexController'
import { Instruccion } from '../abstracto/Instruccion'
import Arbol from '../simbolo/Arbol'
import tablaSimbolo from '../simbolo/tablaSimbolos'
import Tipo, { tipoDato } from '../simbolo/Tipo'

export default class Nativo extends Instruccion {
    valor: any

    constructor(tipo: Tipo, valor: any, fila: number, col: number) {
        super(tipo, fila, col)
        this.valor = valor;
    }

    interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        if (this.tipoDato.getTipo() == tipoDato.BOOL) {
            return this.valor == "true" ? true : false;
        }
        if (this.tipoDato.getTipo() == tipoDato.CADENA) {
            let val = this.valor.toString();
            this.valor = val.replace('\\n', '\n').replace('\\t', '\t').replace('\\r', '\r').replace('\\\\', '\\').replace("\\'", "'").replace('\\"', '"');
        }
        return this.valor
    }

    generarDot(anterior: string) {
        let nodoNativo = "n" + (numeroNodo.no + 1);
        let nodoNativo2 = "n" + (numeroNodo.no + 2);
        let cadena = "";
        cadena += nodoNativo + "[label=\"NATIVO\"];\n";
        cadena += anterior + "->" + nodoNativo + ";\n";
        let value = this.valor;
        if (this.tipoDato.getTipo() == tipoDato.CADENA) {
            let val = this.valor.toString();
            value = val.replace('\n', '\\n').replace('\t', '\\t').replace('\r', '\\r').replace('\\', '\\\\').replace("'", "\\'").replace('"', '\\"');
        }
        cadena += nodoNativo2 + "[label=\"" + value + "\"]\n";
        cadena += nodoNativo + "->" + nodoNativo2 + ";\n";
        numeroNodo.no += 2;
        return cadena;
    }

}