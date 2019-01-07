import { Cartao } from './cartao';
export class Motorista {

    private codigo       : number;
    private nome         : String;
    private email        : String;
    private senha        : String;
    private cpf          : String;
    private telefone     : String;
    private nascimento   : Date;
    private cartao       : Cartao;
    private status       : boolean;

    constructor(
        codigo: number, nome: String, email: String, senha: String, 
        cpf: String, telefone: String, nascimento: Date, 
        cartao: Cartao, status: boolean 
    ) {

        this.codigo = codigo;
        this.nome = nome;
        this.email = email;
        this.senha = senha;
        this.cpf = cpf;
        this.telefone = telefone;
        this.nascimento = nascimento;
        this.cartao = cartao;
        this.status = status;

    }

    public getCodigo() : number {
        return this.codigo;
    }

    public setCodigo(codigo: number) : void {
        this.codigo = codigo;
    }

    public getNome() : String {
        return this.nome;
    }

    public setNome(nome: String) : void {
        this.nome = nome;
    }

    public getEmail() : String {
        return this.email;
    }

    public setEmail(email: String) : void {
        this.email = email;
    }

    public getSenha() : String {
        return this.senha;
    }

    public setSenha(senha: String) : void {
        this.senha = senha;
    }

    public getCPF() : String {
        return this.cpf;
    }

    public setCPF(cpf: String) : void {
    this.cpf = cpf;
    }

    public getTelefone() : String {
        return this.telefone;
    }

    public setTelefone(telefone: String) : void {
        this.telefone = telefone;
    }

    public getNascimento() : Date {
        return this.nascimento;
    }

    public setNascimento(nascimento: Date) : void {
        this.nascimento = nascimento;
    }

    public getCartao() : Cartao {
        return this.cartao;
    }

    public setCartao(cartao: Cartao) : void {
        this.cartao = cartao;
    }

    public getStatus() : boolean {
        return this.status;
    }

    public setStatus(status: boolean) : void {
        this.status = status;
    }
}