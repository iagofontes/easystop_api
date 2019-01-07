import * as mongoose from 'mongoose';
import { IValidacao } from '../interface/ivalidacao';
import { ResponseRequest } from '../util/responseRequest';
import { Estacionamento } from '../model/estacionamento';
import { EstacionamentoSchema } from '../schema/estacionamentoSchema';
import { IEstacionamento } from '../interface/iestacionamento';

const estacionamentoSchema = mongoose.model('Estacionamento', EstacionamentoSchema);
const cnpjValidate = require('@fnando/cnpj/dist/node');
const cepValidate = require('cep-promise/dist/cep-promise.min.js');

export class EstacionamentoController {

    constructor() { }

    public buscarEstacionamentos() : Promise<Estacionamento[]> {
        var arrEstacionamentos = new Array<Estacionamento>();
        return new Promise( (resolve, reject) => {
            estacionamentoSchema.find({}, (err, estacionamentos)=>{
                if(err) {
                    console.log(err);
                    reject(arrEstacionamentos);
                } else {
                    estacionamentos.forEach((el) => {
                        arrEstacionamentos.push(this.converterDocEmEstacionamento(el));
                    });
                    resolve(arrEstacionamentos);
                }
            });
        });
    }

    public adicionarEstacionamento(nomeEstacionamento: String, cnpjEstacionamento: String, emailEstacionamento: String, senhaEstacionamento: String, telefoneEstacionamento: String, capacidadeEstacionamento: number, cepEstacionamento: String, numeroEstacionamento: number, primeiraHora: number, adicionalHora: number, diaria: number) : Promise<ResponseRequest> {
        let estacionament = new Estacionamento(Date.now(), nomeEstacionamento, cnpjEstacionamento, emailEstacionamento, senhaEstacionamento, telefoneEstacionamento, capacidadeEstacionamento, cepEstacionamento, numeroEstacionamento, primeiraHora, adicionalHora, diaria);
        let estacionamento = new estacionamentoSchema(estacionament);
        var response = new ResponseRequest('Estacionamento adicionado com sucesso.', 200);
        return new Promise((resolve, reject)=>{
            let validacaoEstacionamento = this.validarEstacionamento(estacionament);
            if(!validacaoEstacionamento.status) {
                response.setMensagem(validacaoEstacionamento.message);
                response.setHttpResponse(400);
                resolve(response);
            }
            this.verificarDuplicidade(estacionament)
                .then((resp)=>{
                    if(!resp) {
                        estacionamento.save((err, mot)=>{
                            if(err) {
                                console.log(err);
                                response.setMensagem(err.message);
                                response.setHttpResponse(500);
                            }
                        });
                    } else {
                        response.setMensagem('Estacionamento já cadastrado.');
                        response.setHttpResponse(400);
                    }
                    resolve(response);
                })
                .catch((error)=>{
                    console.log(error.message);
                    response.setMensagem('Problemas ao realizar cadastro de estacionamento.');
                    response.setHttpResponse(500);
                    reject(response);
                });
        });
    }

    public loginEstacionamento(emailEstacionamento: String, senhaEstacionamento: String) : Promise<ResponseRequest> {
        var response = new ResponseRequest('Login realizado com sucesso.', 200);
        return new Promise( (resolve, reject) => {
            estacionamentoSchema.findOne(
                { email: emailEstacionamento, senha: senhaEstacionamento },
                ( err, dbEstacionamento ) => {
                    if(err) {
                        console.log(err);
                        response.setMensagem('Problemas ao realizar login.');
                        response.setHttpResponse(500);
                        reject(response);
                    } else {
                        if(!dbEstacionamento) {
                            response.setMensagem('Usuário não encontrado.');
                            response.setHttpResponse(401);
                        }
                        resolve(response);
                    }
                });
        });
    }

    public listarEstacionamentos() : Promise<IEstacionamento[]> {
        return new Promise((resolve, reject) => {
            estacionamentoSchema.find({}, (err, estacionamentos)=>{
                if(err) {
                    console.log(err);
                    reject(new Array<IEstacionamento>());
                } else {
                    let arrEstacionamentos = new Array<IEstacionamento>();
                    estacionamentos.forEach((el : any) => {
                        arrEstacionamentos.push( { 
                            codigo            : el.codigo,
                            nome              : el.nome,
                            email             : el.email,
                            telefone          : el.telefone,
                            disponibilidade   : 1,
                            cep               : el.cep,
                            numero            : el.numero,
                            valor             : { 
                                                    primeiraHora   : el.valor.primeiraHora,
                                                    adicionalHora  : el.valor.adicionalHora,
                                                    diaria         : el.valor.diaria
                                                }
                         } );
                    });
                    resolve(arrEstacionamentos);
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

    // public removerAluno(aluno: number) : ResponseRequest {
    //     if(aluno <= 0) {
    //         return new ResponseRequest('Aluno inválido.', 400);
    //     }
    //     var response = alunos_dados
    //         .splice(alunos_dados.findIndex((al)=>{
    //             return al.getCodigo()==aluno;
    //         }),1);
    //     if(response[0].getCodigo() > 0)
    //         return new ResponseRequest('Aluno removido com sucesso.', 200);
    //     return new ResponseRequest('Aluno não encontrado.', 400);
    // }

    private validarEstacionamento(estacionamento: Estacionamento) : IValidacao {
        if(estacionamento.getNome() == '') {
            return { status:false, message:'O estacionamento deve possuir um nome válido.' };
        } else if(!cnpjValidate.isValid(cnpjValidate.strip(estacionamento.getCnpj()))) {
            return { status:false, message:'O estacionamento deve possuir um CNPJ válido.' };
        }
        if(estacionamento.getCep().length > 0) {
            this.validarCep(estacionamento.getCep())
                .then((response)=>{
                    if(!response)
                        return { status:false, message:'O estacionamento deve possuir um CEP válido.' };
                })
                .catch((err)=>{
                    return { status:false, message:'Problemas ao consultar CEP, tente novamente.' };
                });
        } else {
            return { status:false, message:'O estacionamento deve possuir um CEP válido.' };
        }
        return { status:true, message:'' };
    }

    private validarCep(cep: String) : Promise<boolean> {
        return new Promise((resolve, reject) => {
            cepValidate(cep.toString())
                .then((response)=>{
                    if((response.cep != undefined) && (response.cep != '')){
                        resolve(true);
                    } else {
                        resolve(false);
                    }
                })
                .catch((err) => {
                    console.log(err);
                    reject(false);
                });
        });
    }

    private verificarDuplicidade(estacionamento : Estacionamento) : Promise<boolean> {
        return new Promise((resolve, reject)=>{
            estacionamentoSchema.find(
                { $or: [ 
                    { email : estacionamento.getEmail() }, 
                    { cnpj  : estacionamento.getCnpj()  } 
                ] }, 
                (err, estacionamentos)=>{
                    if(err) {
                        console.log(err);
                        reject(false);
                    } else {
                        resolve(estacionamentos.length > 0);
                    }
            });
        });
    }

    private converterDocEmEstacionamento(estacionamentoDoc: any): Estacionamento {
        return new Estacionamento(
            estacionamentoDoc.codigo, estacionamentoDoc.nome, estacionamentoDoc.cnpj,
            estacionamentoDoc.email, estacionamentoDoc.senha, estacionamentoDoc.telefone, 
            estacionamentoDoc.capacidade, estacionamentoDoc.cep, estacionamentoDoc.valor.primeiraHora, 
            estacionamentoDoc.valor.adicionalHora, estacionamentoDoc.valor.diaria, estacionamentoDoc.numero);
    }

}

export const estacionamentoController = new EstacionamentoController();