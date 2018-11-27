"use strict";
const express_1 = require('express');
class ProfessorRoute {
    constructor() {
        this.router = express_1.Router();
        this.init();
    }
    get(req, res, next) {
        res.json({ nome: "Joaquim" });
    }
    get2(req, res, next) {
        res.json({ nome: "Francisco" });
    }
    init() {
        this.router.get('/api/v1/professor', this.get);
        this.router.get('/api/v1/professor2', this.get2);
    }
}
exports.ProfessorRoute = ProfessorRoute;
exports.professorRoute = new ProfessorRoute().router;
// const professorRoute = new ProfessorRoute();
// professorRoute.init();
// export default professorRoute.router; 
