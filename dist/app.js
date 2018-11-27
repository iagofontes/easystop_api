"use strict";
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
// import * as professorRoute from './route/professorRoute';
const professorRoute_1 = require('./route/professorRoute');
// Criando as configurações para o ExpressJS
class App {
    constructor() {
        this.express = express();
        this.middleware();
        this.routes();
    }
    // Configuração para o nosso middler
    middleware() {
        this.express.use(logger('dev'));
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
    }
    //Configuração da nossa API e nossos EndPoint e o famoso Hello 
    routes() {
        let router = express.Router();
        router.get('/', (req, res, next) => {
            res.json({ message: 'Hello World!' });
        });
        this.express.use('/', router);
        this.express.use('/', professorRoute_1.professorRoute);
        // this.express.use('/api/v1/professor', professorRoute);
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = new App().express;
