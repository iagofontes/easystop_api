export class Cartao {

    private codigo      : number;
    private bandeira    : String;
    private emissor     : String;
    private numero      : number;
    private cvv         : number;
    private vencimento  : Date;

    constructor(
        codigo: number, bandeira: String, emissor: String, 
        numero: number, cvv: number, vencimento: Date
    ) {
        this.codigo = codigo;
        this.bandeira = bandeira;
        this.emissor = emissor;
        this.numero = numero;
        this.cvv = cvv;
        this.vencimento = vencimento;
    }

    public getCodigo() : number {
        return this.codigo;
    }

    public setCodigo(codigo: number) : void {
        this.codigo = codigo;
    }

    public getBandeira() : String {
        return this.bandeira;
    }

    public setBandeira(bandeira: String) : void {
        this.bandeira = bandeira;
    }

    public getEmissor() : String {
        return this.emissor;
    }

    public setEmissor(emissor: String) : void {
        this.emissor = emissor;
    }

    public getNumero() : number {
        return this.numero;
    }

    public setNumero(numero: number) : void {
        this.numero = numero;
    }

    public getCodigoSeg() : number {
        return this.cvv;
    }

    public setCodigoSeg(cvv: number) : void {
        this.cvv = cvv;
    }

    public getVencimento() : Date {
        return this.vencimento;
    }

    public setVencimento(vencimento: Date) : void {
        this.vencimento = vencimento;
    }

}