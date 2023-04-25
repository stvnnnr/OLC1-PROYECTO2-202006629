export default class RepSimbolos {
    public id: string;
    public tipo: string;
    public entorno: string;
    public linea: number;
    public col: number
    public valor: any;

    constructor(id:string, tipo:string, entorno:string, linea:number, col:number, val:any) {
        this.id = id;
        this.tipo = tipo;
        this.entorno = entorno;
        this.linea = linea;
        this.col = col;
        this.valor = val
    }
}