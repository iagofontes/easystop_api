import * as path from 'path';
import * as express from 'express';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';
// import * as professorRoute from './route/professorRoute';
import { professorRoute } from './route/professorRoute';

// Criando as configurações para o ExpressJS
class App {
    // Instancia dele
    public express: express.Application;
    constructor() {
        this.express = express();
        this.middleware();
        this.routes();
    }
    // Configuração para o nosso middler
    private middleware(): void {
        this.express.use(logger('dev'));
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
    }
    //Configuração da nossa API e nossos EndPoint e o famoso Hello 
    private routes(): void { 
        let router = express.Router(); 
        router.get('/', (req, res, next) => {
            res.json({message: 'Hello World!'});
        });

        this.express.use('/', router);
        this.express.use('/', professorRoute);
        // this.express.use('/api/v1/professor', professorRoute);
    }
}
export default new App().express;