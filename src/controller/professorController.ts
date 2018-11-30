import { Professor } from '../model/professor';
import { ResponseRequest } from '../util/responseRequest';
export class ProfessorController {

    constructor() { }

    public adicionarProfessor(nomeProfessor: String, dataNascto: Date) : ResponseRequest {
        var professor = new Professor(0, nomeProfessor, dataNascto);
        var response = new ResponseRequest('Impossível adicionar professor.', 400);
        if(this.validarProfessor(professor)) {
            response.setMensagem('Professor adicionado.');
            response.setHttpResponse(201);
        } else {
            response.setMensagem('Dados inválidos para professor.');
            response.setHttpResponse(400);
        }
        return response;
    }

    private validarProfessor(professor: Professor) : boolean {
        if(professor.getNome() == '') {
            return false;
        }
        // verificar como validar a data
        return true;
    }

}

export const professorController = new ProfessorController();