// import { Cartao } from './cartao';
export class Estacionamento {

    private codigo       : number;
    private nome         : String;
    private cnpj         : String;
    private email        : String;
    private senha        : String;
    private telefone     : String;
    private capacidade   : number;
    private cep          : String;
    private numero       : number;
    private valor        : Object;

    constructor(
        codigo: number, nome: String, cnpj: String, email: String, senha: String, 
        telefone: String, capacidade: number, cep: String, 
        primeiraHora: number, adicionalHora: number, diaria: number, 
        numero: number
    ) {

        this.codigo = codigo;
        this.nome = nome;
        this.cnpj = cnpj;
        this.email = email;
        this.senha = senha;
        this.telefone = telefone;
        this.capacidade = capacidade;
        this.cep = cep;
        this.numero = numero;
        this.valor = {
            "primeiraHora"  : primeiraHora, 
            "adicionalHora" : adicionalHora, 
            "diaria"        : diaria
        };
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

    public getCnpj() : String {
        return this.cnpj;
    }

    public setCnpj(cnpj: String) : void {
        this.cnpj = cnpj;
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

    public getTelefone() : String {
        return this.telefone;
    }

    public setTelefone(telefone: String) : void {
        this.telefone = telefone;
    }

    public getCapacidade() : number {
        return this.capacidade;
    }

    public setCapacidade(capacidade: number) : void {
        this.capacidade = capacidade;
    }

    public getCep() : String {
        return this.cep;
    }

    public setCep(cep: String) : void {
        this.cep = cep;
    }

    public getNumero() : number {
        return this.numero;
    }

    public setNumero(numero: number) : void {
        this.numero = numero;
    }

    public getValor() : object {
        return this.valor;
    }

    public setValor({primeiraHora, adicionalHora, diaria}) : void {
        this.valor = {
            "primeiraHora"  : primeiraHora, 
            "adicionalHora" : adicionalHora, 
            "diaria"        : diaria
        };
    }
}