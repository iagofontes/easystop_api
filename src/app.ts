import * as path from 'path';
import * as express from 'express';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';
import * as mongoose from 'mongoose';
import { professorRoute } from './route/professorRoute';
import { alunoRoute } from './route/alunoRoute';
import { motoristaRoute } from './route/motoristaRoute';
import { estacionamentoRoute } from './route/estacionamentoRoute';

// Criando as configurações para o ExpressJS
class App {
    // Instancia dele
    public express: express.Application;
    public mongoUrl: string = 'mongodb://mobile:iagoti2014@ds131954.mlab.com:31954/easystop?authMechanism=SCRAM-SHA-1';
    constructor() {
        this.express = express();
        this.middleware();
        this.routes();
        this.mongoSetup();
    }
    // Configuração para o nosso middler
    private middleware(): void {
        this.express.use(logger('dev'));
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
    }
    //Configuração da nossa API e nossos EndPoint e o famoso Hello 
    private routes(): void { 
        this.express.use('/', professorRoute);
        this.express.use('/', alunoRoute);
        this.express.use('/', motoristaRoute);
        this.express.use('/', estacionamentoRoute);
    }
    //Configuração do mongodb
    private mongoSetup(): void {
        (<any>mongoose).Promise = global.Promise;
        mongoose.connect(this.mongoUrl, { useNewUrlParser: true });
    }
}
export default new App().express;