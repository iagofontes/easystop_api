import { Router, Request, Response, NextFunction } from 'express';
import { professorController } from '../controller/professorController';
export class ProfessorRoute {

    router: Router
    // professorController: ProfessorController;
    
    constructor() {
        // this.professorController = new ProfessorController();
        this.router = Router();
        this.init();
    }
    public get(req: Request, res: Response, next: NextFunction) {
        res.json({nome:"Joaquim"});
    }
    public get2(req: Request, res: Response, next: NextFunction) {
        res.json({nome:"Francisco"});
    }
    public adicionarProfessor(req: Request, res: Response, next: NextFunction) {
        let response = professorController
            .adicionarProfessor(req.body.nome, new Date(req.body.nascimento));
        res.json({menssagem:response.getMensagem()}).status(response.getHttpResponse());
        response = null;
        next;
    }
    init() {
        this.router.get('/api/v1/professor', this.get);
        this.router.get('/api/v1/professor2', this.get2);
        this.router.post('/api/v1/professores', this.adicionarProfessor);
    }
}
export const professorRoute = new ProfessorRoute().router;
// const professorRoute = new ProfessorRoute();
// professorRoute.init();
// export default professorRoute.router;