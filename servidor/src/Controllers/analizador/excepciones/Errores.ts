export default class Errores {
    private tipoError: string
    private desc: string
    private fila: number
    private col: number

    constructor(tipo: string, desc: string, fila: number, col: number) {
        this.tipoError = tipo
        this.desc = desc
        this.fila = fila
        this.col = col
    }

    public getDesc(): string {
        return this.desc
    }

    public getTipoError(): string {
        return this.tipoError
    }

    public getFila(): number {
        return this.fila
    }

    public getCol(): number {
        return this.col
    }

    public getErrores(): any {
        return { "tipo": this.tipoError, "desc": this.desc, "linea": this.fila, "col": this.col }
    }

    public toString(): string {
        return "----- Error " + this.tipoError + ": " + this.desc + " en la linea " + this.fila + " y columna " + this.col + " ----";
    }
}