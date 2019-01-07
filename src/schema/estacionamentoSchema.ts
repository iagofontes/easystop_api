import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const EstacionamentoSchema = new Schema({
    codigo: {
        type: Number
    },
    nome: {
        type: String,
        required: 'Informe o nome'
    },
    cnpj: {
        type: String, 
        required: 'Informe o CNPJ'
    },
    email: {
        type: String,
        required: 'Informe o e-mail'
    },
    senha: {
        type: String,
        required: 'Informe a senha'
    },
    telefone: {
        type: String            
    },
    capacidade: {
        type: Number
    },
    cep: {
        type: String,
        required: 'Informe o CEP'
    },
    numero: {
        type: Number,
        required: 'Informe o número'
    },
    valor: {
        type: Object,
        required: 'Informe o valor'
    }
});