export interface IEstacionamento {
    codigo            : number;
    nome              : String;
    email             : String;
    telefone          : String;
    disponibilidade   : number;
    cep               : String;
    numero            : number;
    valor             : IValores;
}

export interface IValores {
    primeiraHora    : number;
    adicionalHora   : number;
    diaria          : number;
}