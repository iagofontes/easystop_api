"use strict";
const express_1 = require('express');
const professorController_1 = require('../controller/professorController');
class ProfessorRoute {
    // professorController: ProfessorController;
    constructor() {
        // this.professorController = new ProfessorController();
        this.router = express_1.Router();
        this.init();
    }
    get(req, res, next) {
        res.json({ nome: "Joaquim" });
    }
    get2(req, res, next) {
        res.json({ nome: "Francisco" });
    }
    adicionarProfessor(req, res, next) {
        let response = professorController_1.professorController
            .adicionarProfessor(req.body.nome, new Date(req.body.nascimento));
        res.json({ menssagem: response.getMensagem() }).status(response.getHttpResponse());
        response = null;
        next;
    }
    init() {
        this.router.get('/api/v1/professor', this.get);
        this.router.get('/api/v1/professor2', this.get2);
        this.router.post('/api/v1/professores', this.adicionarProfessor);
    }
}
exports.ProfessorRoute = ProfessorRoute;
exports.professorRoute = new ProfessorRoute().router;
// const professorRoute = new ProfessorRoute();
// professorRoute.init();
// export default professorRoute.router; 
