import * as mongoose from 'mongoose';
import { Cartao } from '../model/cartao';

const Schema = mongoose.Schema;

export const MotoristaSchema = new Schema({
    codigo: {
        type: Number
    },
    nome: {
        type: String,
        required: 'Informe o nome'
    },
    email: {
        type: String,
        required: 'Informe o e-mail'
    },
    senha: {
        type: String,
        required: 'Informe a senha'
    },
    cpf: {
        type: String,
        required: 'Informe o CPF'            
    },
    telefone: {
        type: String 
    },
    nascimento: {
        type: Date,
        default: Date.now
    },
    cartao: {
        type: Object,
        default: new Cartao(0, '', '', 0, 0, new Date(Date.now()))
    },
    status: {
        type: Boolean,
        default: false
    }
});