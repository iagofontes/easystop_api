import * as mongoose from 'mongoose';
// import * as cpf from '@fnando/cpf';
import { IValidacao } from '../interface/ivalidacao';
import { ResponseRequest } from '../util/responseRequest';
import { Motorista } from '../model/motorista';
import { Cartao } from '../model/cartao';
import { MotoristaSchema } from '../schema/motoristaSchema';
import { ICarro } from '../interface/icarro';
import { CarroSchema } from '../schema/carroSchema';

const motoristaSchema = mongoose.model('Motorista', MotoristaSchema);
const carroSchema = mongoose.model('Carro', CarroSchema);
const cpf = require('@fnando/cpf/dist/node');

export class MotoristaController {

    constructor() { }

    public buscarMotoristas() : Promise<Motorista[]> {
        var arrMotoristas = new Array<Motorista>();
        return new Promise((resolve, reject) => {
            motoristaSchema.find({}, (err, motoristas)=>{
                if(err) {
                    console.log(err);
                    reject(arrMotoristas);
                    return;
                } else {
                    motoristas.forEach((el)=>{
                        arrMotoristas.push(this.converterDocEmMotorista(el));
                    });
                    resolve(arrMotoristas);
                }
            });
        });
    }

    public adicionarMotorista(nomeMotorista: String, emailMotorista: String, senhaMotorista: String, 
        cpfMotorista: String, telefoneMotorista: String, dataNascto: Date) : Promise<ResponseRequest> {
        let motorist = new Motorista(Date.now(), nomeMotorista, emailMotorista, senhaMotorista, 
            cpfMotorista, telefoneMotorista, dataNascto, 
            new Cartao(0, '', '', 0, 0, new Date(Date.now())), true);
        let motorista = new motoristaSchema(motorist);
        var response = new ResponseRequest('Motorista adicionado com sucesso.', 200);
        return new Promise((resolve, reject) => {
            let validacaoMotorista = this.validarMotorista(motorist);
            if(!validacaoMotorista.status) {
                response.setMensagem(validacaoMotorista.message);
                response.setHttpResponse(400);
                resolve(response);
                return;
            }

            this.verificarDuplicidade(motorist)
                .then((result) => {
                    if(result) {
                        response.setMensagem('Motorista já cadastrado.');
                        response.setHttpResponse(400);
                        resolve(response);
                        return;
                    }
                })
                .catch((err) => {
                    if(!err) {
                        response.setMensagem('Problemas ao consultar cadastros.');
                        response.setHttpResponse(500);
                        reject(response);
                        return;
                    }
                });
                
            motorista.save((err, mot)=>{
                if(err) {
                    console.log(err);
                    response.setMensagem('Problemas ao salvar motorista, tente novamente.');
                    response.setHttpResponse(500);
                    reject(response);
                    return;
                }
                resolve(response);
            });
        });
    }

    public loginMotorista(emailMotorista: String, senhaMotorista: String) : Promise<ResponseRequest> {
        var response = new ResponseRequest('Login realizado com sucesso.', 200);
        return new Promise((resolve, reject) => {
            if((emailMotorista.length <= 0) || (senhaMotorista.length <= 0)) {
                response.setMensagem('E-mail e seha devem estar preenchidos.');
                response.setHttpResponse(400);
                resolve(response);
            }
            motoristaSchema.findOne(
                { email: emailMotorista, senha: senhaMotorista },
                (err, dbMotorista: any)=>{
                    if(err) {
                        console.log(err);
                        response.setMensagem('Problemas ao realizar login.');
                        response.setHttpResponse(500);
                        reject(response);
                    } else {
                        if(!dbMotorista) {
                            response.setMensagem('E-mail ou senha inválidos.');
                            response.setHttpResponse(401);
                        }
                        console.log(dbMotorista)
                        response.setMensagem(dbMotorista.codigo)
                        resolve(response);
                    }
                });
        });
    }

    public removerMotorista(motoristaKey: number) : Promise<ResponseRequest> {
        return new Promise((resolve, reject) => {
            let response = new ResponseRequest('Motorista removido com sucesso.', 200);
            
            if(motoristaKey <= 0) {
                response.setHttpResponse(400);
                response.setMensagem('Motorista inválido.');
                resolve(response);
                return;
            }

            motoristaSchema.update( 
                { codigo : motoristaKey } , 
                { $set : { status : 0 } } , 
                (err, res)=>{
                    if(err) {
                        console.log(err);
                        response.setHttpResponse(500);
                        response.setMensagem('Problemas ao remover motorista.');
                        reject(response);
                    }
                    resolve(response);
                }
            );
            
        });
    }

    public adicionarCarroMotorista(carro: ICarro) : Promise<ResponseRequest> {
        var response = new ResponseRequest('Veículo adicionado com sucesso.', 200);
        return new Promise((resolve, reject) => {
            if(carro.motorista <= 0) {
                response.setMensagem('Veículo não possui motorista vinculado.');
                response.setHttpResponse(400);
                resolve(response);
            }
            this.buscarMotoristaPorCodigo(carro.motorista)
                .then((res)=>{
                    if(res) {
                        carro.codigo = (Date.now())*2;
                        let car = new carroSchema(carro);
                        car.save((err, c)=>{
                            if(err) {
                                console.log(err);
                                response.setMensagem('Problemas ao salvar motorista, tente novamente.');
                                response.setHttpResponse(500);
                                reject(response);
                                return;
                            }
                            resolve(response);
                        });
                    } else {
                        response.setMensagem('Motorista não encontrado.');
                        response.setHttpResponse(400);
                        resolve(response);
                    }
                });
        });
    }

    public buscarCarrosMotorista(motorista: number) : Promise<ICarro[]> {
        var response = new Array<ICarro>();
        return new Promise((resolve, reject) => {
            if(motorista <= 0) {
                resolve(response);
            } else {
                carroSchema.find({
                    motorista: motorista,
                    status: true
                }, (err, c)=>{
                    if(err) {
                        console.log(err);
                        reject(response);
                        return;
                    } else {
                        c.forEach((carDB)=>{
                            response.push(this.converterDocEmCarro(carDB));
                        });
                        resolve(response);
                    }
                });
            }
        });
    }

    public atualizarCarro(carro: ICarro) : Promise<ResponseRequest> {
        var response = new ResponseRequest('Veículo atualizado com sucesso.', 200);
        return new Promise((resolve, reject) => {
            if(carro.codigo <= 0) {
                response.setMensagem('Veículo não possui identificação.');
                response.setHttpResponse(400);
                resolve(response);
            } else {
                this.buscarCarro(carro.codigo)
                    .then((resp)=>{
                        carroSchema.findOneAndUpdate({
                            _id: resp.codigo
                        }, 
                        { $set: 
                            { 
                                "marca"      : carro.marca,
                                "modelo"     : carro.modelo,
                                "ano"        : carro.ano,
                                "placa"      : carro.placa,
                                "status"     : true
                            } 
                        },
                        (err, c)=>{
                            if(err) {
                                console.log(err);
                                response.setMensagem('Problemas ao atualizar veículo, tente novamente.');
                                response.setHttpResponse(500);
                                reject(response);
                                return;
                            }
                            resolve(response);
                        });
                    })
                    .catch((error)=>{
                        response.setMensagem('Problemas ao procurar veículo.');
                        response.setHttpResponse(500);
                        reject(response);
                    });

            }
        });
    }

    public removerCarro(carro: number) : Promise<ResponseRequest> {
        var response = new ResponseRequest('Veículo removido com sucesso.', 200);
        return new Promise((resolve, reject) => {
            if(carro <= 0) {
                response.setMensagem('Veículo não possui identificação.');
                response.setHttpResponse(400);
                resolve(response);
            } else {
                // _id: '5c36702f11f46a14856262d2'
                this.buscarCarro(carro)
                    .then((resp)=>{
                        carroSchema.findOneAndUpdate({
                            _id: resp.codigo
                        }, 
                        { $set: { status: false } },
                        (err, c)=>{
                            if(err) {
                                console.log(err);
                                response.setMensagem('Problemas ao remover veículo, tente novamente.');
                                response.setHttpResponse(500);
                                reject(response);
                                return;
                            }
                            resolve(response);
                        });
                    })
                    .catch((error)=>{
                        response.setMensagem('Problemas ao procurar veículo.');
                        response.setHttpResponse(500);
                        reject(response);
                    });

            }
        });
    }

    public buscarCarro(codigo: number) : Promise<ICarro> {
        return new Promise((resolve, reject) => {

            if(codigo <= 0) {
                resolve( 
                    {
                        "codigo"     : 0,
                        "motorista"  : 0,
                        "marca"      : '',
                        "modelo"     : '',
                        "ano"        : '',
                        "placa"      : '',
                        "status"     : false
                    }
                );
                return;
            }

            carroSchema.findOne( 
                { codigo : codigo } , 
                (err, res)=>{
                    if(err) {
                        console.log(err);
                        reject(
                            {
                                "codigo"     : 0,
                                "motorista"  : 0,
                                "marca"      : '',
                                "modelo"     : '',
                                "ano"        : '',
                                "placa"      : '',
                                "status"     : false
                            }
                        );
                    }
                    let carro = this.converterDocEmCarro(res);
                    carro.codigo = res._id;
                    resolve( carro );
                }
            );

        });
    }

    private verificarDuplicidade(motorista: Motorista) : Promise<boolean> {
        return new Promise((resolve, reject) => {
            motoristaSchema.findOne(
                { email : motorista.getEmail() ,
                  cpf   : motorista.getCPF() 
                }, 
                (err, motorist) => {
                    if(err) {
                        console.log(err);
                        reject(false);
                    } else {
                        if(motorist) {
                            resolve(true);
                        }
                        resolve(false);
                    }
                }
            );
        });
    }

    private buscarMotoristaPorCodigo(codigo: number) : Promise<boolean> {
        return new Promise((resolve, reject) => {
            motoristaSchema.findOne(
                { codigo : codigo }, 
                (err, motorist) => {
                    if(err) {
                        console.log(err);
                        reject(false);
                    } else {
                        if(motorist) {
                            resolve(true);
                        }
                        resolve(false);
                    }
                }
            );
        });
    }

    private validarMotorista(motorista: Motorista) : IValidacao {
        if(motorista.getNome() == '') {
            return { status: false, message: 'O motorista deve possuir um nome válido.' };
        } else if(!cpf.isValid(cpf.strip(motorista.getCPF()), true)) {
            return { status: false, message: 'O motorista deve possuir um CPF válido.' };
        }
        // validar cartão
        return { status: true, message: '' };
    }

    // private converterDocEmMotorista(motoristaDoc: mongoose.Document<any>): Motorista {
    private converterDocEmMotorista(motoristaDoc: any): Motorista {
        return new Motorista(
            motoristaDoc.codigo, motoristaDoc.nome, motoristaDoc.email, motoristaDoc.senha, 
            motoristaDoc.cpf, motoristaDoc.telefone, motoristaDoc.nascimento, 
            new Cartao(motoristaDoc.cartao.codigo, motoristaDoc.cartao.bandeira, 
                motoristaDoc.cartao.emissor, motoristaDoc.cartao.numero, 
                motoristaDoc.cartao.cvv, motoristaDoc.cartao.vencimento), motoristaDoc.status);
    }

    private converterDocEmCarro(carroDoc: any): ICarro {
        return {
            codigo     : carroDoc.codigo,
            motorista  : carroDoc.motorista,
            marca      : carroDoc.marca,
            modelo     : carroDoc.modelo,
            ano        : carroDoc.ano,
            placa      : carroDoc.placa,
            status     : carroDoc.status
        };
    }

}

export const motoristaController = new MotoristaController();