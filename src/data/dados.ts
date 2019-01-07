import { Professor } from '../model/professor';
import { Aluno } from '../model/aluno';
import { Cartao } from '../model/cartao';
import { Motorista } from '../model/motorista';

export const professores_dados = [
    new Professor(1, "Arlindo Alves da Cruz", "arlindo@gmail.com", new Date("1985-10-25")),
    new Professor(2, "Igor Nascimento Oliveira", "igor.oliveira@hotmail.com", new Date("1974-08-01")),
    new Professor(3, "Juliana Spinoza Santos", "juliana_83@yahoo.com.br", new Date("1983-02-20"))
];

export const alunos_dados = [
    new Aluno(1, "Aline Garcia", "aline@gmail.com", new Date("1985-10-25"), 100),
    new Aluno(2, "Bruna Mendes", "bruna@hotmail.com", new Date("1974-08-01"), 350),
    new Aluno(3, "Juliano Santos", "juliano_s@yahoo.com.br", new Date("1983-02-20"), 90)
];

export const motoristas_dados = [
    new Motorista(1, "João Serafim", "joao.ser@gmail.com", "11965236524", new Date("1985-10-25"), new Cartao(1, "visa", "itau", 5236521458745214, 425, new Date("2025-03-01"))),
    new Motorista(2, "Raphaela Hipolito", "raphip@gmail.com", "11965236524", new Date("1985-10-25"), new Cartao(1, "visa", "itau", 5236521458745214, 425, new Date("2025-03-01"))),
    new Motorista(3, "Fernanda Crista", "joao.ser@gmail.com", "11965236524", new Date("1985-10-25"), new Cartao(1, "visa", "itau", 5236521458745214, 425, new Date("2025-03-01")))
];