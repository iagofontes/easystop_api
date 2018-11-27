import { Router, Request, Response, NextFunction } from 'express';
export class ProfessorRoute {
    router: Router
    constructor() {
        this.router = Router();
        this.init();
    }
    public get(req: Request, res: Response, next: NextFunction) {
        res.json({nome:"Joaquim"});
    }
    public get2(req: Request, res: Response, next: NextFunction) {
        res.json({nome:"Francisco"});
    }
    init() {
        this.router.get('/api/v1/professor', this.get);
        this.router.get('/api/v1/professor2', this.get2);
    }
}
export const professorRoute = new ProfessorRoute().router;
// const professorRoute = new ProfessorRoute();
// professorRoute.init();
// export default professorRoute.router;