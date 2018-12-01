import { Router, Request, Response, NextFunction } from 'express';
import { professorController } from '../controller/professorController';
export class ProfessorRoute {

    router: Router
    
    constructor() {
        this.router = Router();
        this.init();
    }
    public adicionarProfessor(req: Request, res: Response, next: NextFunction) {
        let response = professorController
            .adicionarProfessor(req.body.nome, new Date(req.body.nascimento));
        res.json({menssagem:response.getMensagem()}).status(response.getHttpResponse());
        response = null;
        next();
    }
    public buscarProfessores(req: Request, res: Response, next: NextFunction) {
        let response = professorController.buscarProfessores();
        res.json(response).status(200);
        response = null;
        next();
    }
    public removerProfessor(req: Request, res: Response, next: NextFunction) {
        let response = professorController.removerProfessor(req.body.codigo);
        res.json({"mensagem":response.getMensagem()}).status(response.getHttpResponse());
        response = null;
        next();
    }
    init() {
        this.router.get('/api/v1/professores', this.buscarProfessores);
        this.router.post('/api/v1/professores', this.adicionarProfessor);
        this.router.put('/api/v1/professores', ()=>{});
        this.router.delete('/api/v1/professores', this.removerProfessor);
    }
}
export const professorRoute = new ProfessorRoute().router;