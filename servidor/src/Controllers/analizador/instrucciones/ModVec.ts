import { numeroNodo } from "../../indexController";
import { Instruccion } from "../abstracto/Instruccion";
import Errores from "../excepciones/Errores";
import Arbol from "../simbolo/Arbol";
import Simbolo from "../simbolo/simbolo";
import tablaSimbolo from "../simbolo/tablaSimbolos";
import Tipo, { tipoDato } from "../simbolo/Tipo";

export default class ModVec extends Instruccion {
    private id: string;
    private dimension: number
    private index1: Instruccion;
    private index2: Instruccion | undefined
    private expresion: Instruccion;

    constructor(id: string, dimension: number, expresion: Instruccion, linea: number, col: number, index1: Instruccion, index2?: Instruccion) {
        super(new Tipo(tipoDato.VOID), linea, col);
        this.id = id;
        this.dimension = dimension;
        this.index1 = index1;
        this.expresion = expresion;
        this.index2 = index2;
    }

    interpretar(arbol: Arbol, tabla: tablaSimbolo) {
        let Newvalor = this.expresion.interpretar(arbol, tabla);
        if (Newvalor instanceof Errores) return Newvalor;

        let arreglo = tabla.getVariable(this.id);
        if (arreglo == null) return new Errores("Semantico", "Variable no existente ", this.linea, this.col);

        this.tipoDato = arreglo.getTipo();

        if (this.dimension == 1) {
            let indice1 = this.index1.interpretar(arbol, tabla);
            if (indice1 instanceof Errores) return indice1;
            if (this.index1.tipoDato.getTipo() != tipoDato.ENTERO) return new Errores("Semantico", "Los indices de los arreglos deben de ser enteros", this.linea, this.col);
            let valor = arreglo.getValor();
            if (valor[parseInt(indice1)] == undefined) return new Errores("Semantico", "Index fuera del rango", this.linea, this.col);
            switch (this.expresion.tipoDato.getTipo()) {
                case tipoDato.ENTERO:
                    valor[parseInt(indice1)] = parseInt(Newvalor);
                    break;
                case tipoDato.DECIMAL:
                    valor[parseInt(indice1)] = parseFloat(Newvalor);
                    break;
                case tipoDato.BOOL:
                    valor[parseInt(indice1)] = Newvalor;
                    break;
                case tipoDato.CARACTER:
                    valor[parseInt(indice1)] = Newvalor;
                    break;
                case tipoDato.CADENA:
                    valor[parseInt(indice1)] = Newvalor;
                    break;
                default:
                    return new Errores("Semantico", "Tipo de dato invalido", this.linea, this.col);
            }
            arreglo.setValor(valor)
            arbol.updateSimbolo(this.id, tabla.getEntorno(this.id), "[" + valor.toString() + "]")
        } else {
            if (!this.index2) return new Errores("Semantico", "Index Invalido", this.linea, this.col);
            else {
                let indice1 = this.index1.interpretar(arbol, tabla);
                if (indice1 instanceof Errores) return indice1;
                if (this.index1.tipoDato.getTipo() != tipoDato.ENTERO) return new Errores("Semantico", "Los indices de los arreglos deben de ser enteros", this.linea, this.col);

                let indice2 = this.index2.interpretar(arbol, tabla);
                if (indice2 instanceof Errores) return indice2;
                if (this.index2.tipoDato.getTipo() != tipoDato.ENTERO) return new Errores("Semantico", "Los indices de los arreglos deben de ser enteros", this.linea, this.col);
                let valor = arreglo.getValor();
                try {
                    if (valor[parseInt(indice1)][parseInt(indice2)] == undefined) return new Errores("Semantico", "Index fuera del rango", this.linea, this.col);
                    switch (this.expresion.tipoDato.getTipo()) {
                        case tipoDato.ENTERO:
                            valor[parseInt(indice1)][parseInt(indice2)] = parseInt(Newvalor);
                            break;
                        case tipoDato.DECIMAL:
                            valor[parseInt(indice1)][parseInt(indice2)] = parseFloat(Newvalor);
                            break;
                        case tipoDato.BOOL:
                            valor[parseInt(indice1)][parseInt(indice2)] = Newvalor;
                            break;
                        case tipoDato.CARACTER:
                            valor[parseInt(indice1)][parseInt(indice2)] = Newvalor;
                            break;
                        case tipoDato.CADENA:
                            valor[parseInt(indice1)][parseInt(indice2)] = Newvalor;
                            break;
                        default:
                            return new Errores("Semantico", "Tipo de dato invalido", this.linea, this.col);
                    }
                    arreglo.setValor(valor)
                    let valorAux = "[";
                    for (let i = 0; i < valor.length; i++) {
                        let aux = [];
                        for (let j = 0; j < valor[0].length; j++) {
                            aux.push(valor[i][j]);
                        }
                        if (i == 0) valorAux = valorAux + "[" + aux.toString() + "]";
                        else valorAux = valorAux + ",[" + aux.toString() + "]";
                    }
                    valorAux += "]";
                    arbol.updateSimbolo(this.id, tabla.getEntorno(this.id), valorAux)
                } catch (err) {
                    return new Errores("Semantico", "Index fuera del rango", this.linea, this.col);
                }
            }
        }
    }

    generarDot(anterior: string) {
        let cadena = "";
        if (this.dimension == 1) {
            let nodo1 = "n" + (numeroNodo.no + 1);
            let nodo2 = "n" + (numeroNodo.no + 2);
            let nodo3 = "n" + (numeroNodo.no + 3);
            let nodo4 = "n" + (numeroNodo.no + 4);
            let nodo5 = "n" + (numeroNodo.no + 5);
            let nodo6 = "n" + (numeroNodo.no + 6);
            let nodo7 = "n" + (numeroNodo.no + 7);
            let nodo8 = "n" + (numeroNodo.no + 8);
            let nodo9 = "n" + (numeroNodo.no + 9);
            numeroNodo.no += 9;

            cadena += nodo1 + "[label=\"MVEC\"];\n";
            cadena += nodo2 + "[label=\"ID\"];\n";
            cadena += nodo3 + "[label=\"[\"];\n";
            cadena += nodo4 + "[label=\"EXP\"];\n";
            cadena += nodo5 + "[label=\"]\"];\n";
            cadena += nodo6 + "[label=\"=\"];\n";
            cadena += nodo7 + "[label=\"EXP\"];\n";
            cadena += nodo8 + "[label=\";\"];\n";
            cadena += nodo9 + "[label=\"" + this.id + "\"];\n";

            cadena += anterior + "->" + nodo1 + ";\n";
            cadena += nodo1 + "->" + nodo2 + ";\n";
            cadena += nodo1 + "->" + nodo3 + ";\n";
            cadena += nodo1 + "->" + nodo4 + ";\n";
            cadena += nodo1 + "->" + nodo5 + ";\n";
            cadena += nodo1 + "->" + nodo6 + ";\n";
            cadena += nodo1 + "->" + nodo7 + ";\n";
            cadena += nodo1 + "->" + nodo8 + ";\n";
            cadena += nodo2 + "->" + nodo9 + ";\n";

            cadena += this.index1.generarDot(nodo4);
            cadena += this.expresion.generarDot(nodo7);
            return cadena;
        } else {
            let nodo1 = "n" + (numeroNodo.no + 1);
            let nodo2 = "n" + (numeroNodo.no + 2);
            let nodo3 = "n" + (numeroNodo.no + 3);
            let nodo4 = "n" + (numeroNodo.no + 4);
            let nodo5 = "n" + (numeroNodo.no + 5);
            let nodo6 = "n" + (numeroNodo.no + 6);
            let nodo7 = "n" + (numeroNodo.no + 7);
            let nodo8 = "n" + (numeroNodo.no + 8);
            let nodo9 = "n" + (numeroNodo.no + 9);
            let nodo10 = "n" + (numeroNodo.no + 10);
            let nodo11 = "n" + (numeroNodo.no + 11);
            let nodo12 = "n" + (numeroNodo.no + 12);
            numeroNodo.no += 12;

            cadena += nodo1 + "[label=\"MVEC\"];\n";
            cadena += nodo2 + "[label=\"ID\"];\n";
            cadena += nodo3 + "[label=\"[\"];\n";
            cadena += nodo4 + "[label=\"EXP\"];\n";
            cadena += nodo5 + "[label=\"]\"];\n";
            cadena += nodo6 + "[label=\"[\"];\n";
            cadena += nodo7 + "[label=\"EXP\"];\n";
            cadena += nodo8 + "[label=\"]\"];\n";
            cadena += nodo9 + "[label=\"=\"];\n";
            cadena += nodo10 + "[label=\"EXP\"];\n";
            cadena += nodo11 + "[label=\";\"];\n";
            cadena += nodo12 + "[label=\"" + this.id + "\"];\n";


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

            cadena += nodo2 + "->" + nodo12 + ";\n";

            cadena += this.index1.generarDot(nodo4);
            if (this.index2) cadena += this.index2.generarDot(nodo7);
            cadena += this.expresion.generarDot(nodo10);

            return cadena;
        }
    }
}