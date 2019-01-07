import { Router, Request, Response, NextFunction } from 'express';
import { motoristaController } from '../controller/motoristaController';

export class MotoristaRoute {

    router: Router
    
    constructor() {
        this.router = Router();
        this.init();
    }

    public buscarMotoristas(req: Request, res: Response, next: NextFunction) {
        motoristaController
            .buscarMotoristas()
            .then(
                (motoristas)=>{
                    res.status(200).json({motorista:motoristas});
            })
            .catch((error)=>{
                res.status(500).json({motorista:error});
            });
    }

    public adicionarMotorista(req: Request, res: Response, next: NextFunction) {
        motoristaController
            .adicionarMotorista(req.body.nome, req.body.email, req.body.senha, req.body.cpf, req.body.telefone, new Date(req.body.nascimento))
            .then((response)=>{
                    res.status(response.getHttpResponse()).json({menssagem:response.getMensagem()});
            })
            .catch((error)=>{
                console.log(error);
                res.status(error.getHttpResponse()).json({menssagem:error.getMensagem()});
            })
            .then(()=>{
                next();
            });
    }

    public atualizarMotorista(req: Request, res: Response, next: NextFunction) {
        // let response = professorController
        //     .atualizarProfessor(req.body.codigo, req.body.nome, req.body.email, new Date(req.body.nascimento));
        // res.json({menssagem:response.getMensagem()}).status(response.getHttpResponse());
        // response = null;
        next();
    }

    public removerMotorista(req: Request, res: Response, next: NextFunction) {
        motoristaController
            .removerMotorista(req.body.codigo)
            .then((response)=>{
                res.status(response.getHttpResponse()).json({"mensagem":response.getMensagem()});
            })
            .catch((error)=>{
                res.status(error.getHttpResponse()).json({"mensagem":error.getMensagem()});
            });
    }

    public loginMotorista(req: Request, res: Response, next: NextFunction) {
        motoristaController
            .loginMotorista(req.body.email, req.body.senha)
            .then((response)=>{
                res.status(response.getHttpResponse()).json({"mensagem":response.getMensagem()});
            })
            .catch((error)=>{
                res.status(error.getHttpResponse()).json({"mensagem":error.getMensagem()});
            });
    }

    init() {
        // this.router.get('/api/v1/professores/:id', this.buscarMotorista);
        this.router.get('/api/v1/motoristas', this.buscarMotoristas);
        this.router.post('/api/v1/motoristas/login', this.loginMotorista);
        this.router.post('/api/v1/motoristas', this.adicionarMotorista);
        this.router.put('/api/v1/motoristas', this.atualizarMotorista);
        this.router.delete('/api/v1/motoristas', this.removerMotorista);
    }

}

export const motoristaRoute = new MotoristaRoute().router;