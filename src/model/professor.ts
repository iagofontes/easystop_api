export class Professor {

    private codigo   : number;
    private nome     : String;
    private dtNascto : Date;

    constructor(
        id: number,
        nome: String,
        dtNascimento: Date
    ) {
        this.codigo = id;
        this.nome = nome;
        this.dtNascto = dtNascimento;
    }

    public getCodigo() : number {
        return this.codigo;
    }

    private setCodigo(codigo: number) : void {
        this.codigo = codigo;
    }

    public getNome() : String {
        return this.nome;
    }

    private setNome(nome: String) : void {
        this.nome = nome;
    }

    public getDataNascimento() : Date {
        return this.dtNascto;
    }

    private setDataNascimento(data: Date) : void {
        this.dtNascto = data;
    }
}