import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const CarroSchema = new Schema({
    codigo: {
        type: Number
    },
    motorista: {
        type: Number,
        required: 'Informe o motorista do veículo'
    },
    marca: {
        type: String, 
        required: 'Informe a marca do veículo'
    },
    modelo: {
        type: String,
        required: 'Informe o modelo do veículo'
    },
    ano: {
        type: String,
        required: 'Informe o ano do veículo'
    },
    placa: {
        type: String            
    },
    status: {
        type: Boolean
    }
});