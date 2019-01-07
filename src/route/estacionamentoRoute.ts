import { Router, Request, Response, NextFunction } from 'express';
import { estacionamentoController } from '../controller/estacionamentoController';
import { Logger } from 'mongodb';
import { ResponseRequest } from '../util/responseRequest';

export class EstacionamentoRoute {

    router: Router
    
    constructor() {
        this.router = Router();
        this.init();
    }

    public buscarEstacionamentos(req: Request, res: Response, next: NextFunction) {
        estacionamentoController
            .buscarEstacionamentos()
            .then((estacionamentos) => {
                res.status(200).json({estacionamento:estacionamentos});
            })
            .catch((err) => {
                res.status(500).json({mensagem:'Problemas ao buscar estacionamentos'});                
            });
    }

    public listarEstacionamentos(req: Request, res: Response, next: NextFunction) {
        estacionamentoController
            .listarEstacionamentos()
            .then((estacionamentos) => {
                res.status(200).json({estacionamento:estacionamentos});
            })
            .catch((err) => {
                res.status(500).json({mensagem:'Problemas ao buscar estacionamentos'});
            });
    }

    public adicionarEstacionamento(req: Request, res: Response, next: NextFunction) {
        estacionamentoController
            .adicionarEstacionamento(req.body.nome, req.body.cnpj, req.body.email, req.body.senha, req.body.telefone, req.body.capacidade, req.body.cep, req.body.numero, req.body.primeiraHora, req.body.adicionalHora, req.body.diaria)
            .then((response:ResponseRequest) => {
                res.status(response.getHttpResponse()).json({mensagem:response.getMensagem()});
            })
            .catch((error:ResponseRequest) => {
                console.log(error);
                res.status(error.getHttpResponse()).json({mensagem:error.getMensagem()});
            });
    }

    public atualizarEstacionamento(req: Request, res: Response, next: NextFunction) {
        // let response = professorController
        //     .atualizarProfessor(req.body.codigo, req.body.nome, req.body.email, new Date(req.body.nascimento));
        // res.json({menssagem:response.getMensagem()}).status(response.getHttpResponse());
        // response = null;
        next();
    }

    public removerEstacionamento(req: Request, res: Response, next: NextFunction) {
        // let response = professorController.removerProfessor(req.body.codigo);
        // res.json({"mensagem":response.getMensagem()}).status(response.getHttpResponse());
        // response = null;
        next();
    }

    public loginEstacionamento(req: Request, res: Response, next: NextFunction) {
        estacionamentoController
            .loginEstacionamento(req.body.email, req.body.senha)
            .then((response) => {
                res.status(response.getHttpResponse()).json({"mensagem":response.getMensagem()});
            })
            .catch((err) => {
                res.status(500).json({"mensagem":"Problemas encontrados na tentativa de login."});
            });
    }

    init() {
        this.router.get('/api/v1/estacionamentos', this.buscarEstacionamentos);
        this.router.get('/api/v1/estacionamentos/map', this.listarEstacionamentos);
        this.router.post('/api/v1/estacionamentos/login', this.loginEstacionamento);
        this.router.post('/api/v1/estacionamentos', this.adicionarEstacionamento);
        this.router.put('/api/v1/estacionamentos', this.atualizarEstacionamento);
        this.router.delete('/api/v1/estacionamentos', this.removerEstacionamento);
    }
}
export const estacionamentoRoute = new EstacionamentoRoute().router;