import * as mongoose from 'mongoose';
// import * as cpf from '@fnando/cpf';
import { IValidacao } from '../interface/ivalidacao';
import { ResponseRequest } from '../util/responseRequest';
import { Motorista } from '../model/motorista';
import { Cartao } from '../model/cartao';
import { MotoristaSchema } from '../schema/motoristaSchema';

const motoristaSchema = mongoose.model('Motorista', MotoristaSchema);
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
                (err, dbMotorista)=>{
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
                        resolve(response);
                    }
                });
        });
    }

    // public atualizarAluno(alCodigo: number, alNome: String, alEmail: String, alDate: Date, alPontos: number) : ResponseRequest {
    //     var aluno = new Aluno(alCodigo, alNome, alEmail, alDate, alPontos);
    //     var response = new ResponseRequest('Impossível atualizar aluno.', 500);
    //     if(this.validarAluno(aluno) && (aluno.getCodigo() > 0)) {
    //         if(this.updateAluno(aluno)){
    //             response.setMensagem('Aluno atualizado.');
    //             response.setHttpResponse(200);
    //         } else {
    //             response.setMensagem('Problemas ao atualizar aluno.');
    //             response.setHttpResponse(500);
    //         }
    //     } else {
    //         response.setMensagem('Dados inválidos para aluno.');
    //         response.setHttpResponse(400);
    //     }
    //     return response;
    // }

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

}

export const motoristaController = new MotoristaController();