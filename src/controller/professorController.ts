import { Professor } from '../model/professor';
import { ResponseRequest } from '../util/responseRequest';
import { professores_dados } from '../data/dados';

export class ProfessorController {

    constructor() { }

    public adicionarProfessor(nomeProfessor: String, dataNascto: Date) : ResponseRequest {
        var professor = new Professor(this.buscarUltimoCodigoProfessor()+1, nomeProfessor, dataNascto);
        var response = new ResponseRequest('Impossível adicionar professor.', 400);
        if(this.validarProfessor(professor)) {
            this.salvarProfessor(professor);
            response.setMensagem('Professor adicionado.');
            response.setHttpResponse(201);
        } else {
            response.setMensagem('Dados inválidos para professor.');
            response.setHttpResponse(400);
        }
        return response;
    }

    public buscarProfessores() : Array<Professor> {
        return professores_dados;
    }

    public removerProfessor(professor:number) : ResponseRequest {
        // var professor = new Professor(this.buscarUltimoCodigoProfessor(), nomeProfessor, dataNascto);
        if(professor <= 0) {
            return new ResponseRequest('Professor inválido.', 400);
        }
        var response = professores_dados
            .splice(professores_dados.findIndex((pr)=>{
                return pr.getCodigo()==professor;
            }),1);
        return new ResponseRequest('Professor removido com sucesso.', 200);
    }

    private validarProfessor(professor: Professor) : boolean {
        if(professor.getNome() == '') {
            return false;
        }
        // verificar como validar a data
        return true;
    }

    private salvarProfessor(professor: Professor) : void {
        professores_dados.push(professor);
    }

    private buscarUltimoCodigoProfessor() : number {
        let codigo = professores_dados[professores_dados.length-1].getCodigo();
        professores_dados.forEach((el)=>{
            if(el.getCodigo() > codigo)
                codigo = el.getCodigo();
        });
        return codigo;
    }

    private buscarProfessor(professor: Professor): number {
        let pr = professores_dados.filter((prof, index)=>{
            return (prof.getCodigo() == professor.getCodigo())?index:null;
        })[0];
        return (pr.getCodigo() > 0)?pr.getCodigo():0;
    }

}

export const professorController = new ProfessorController();