// Importa a classe DataBaseModel, que gerencia a conexão com o banco de dados.
import { DataBaseModel } from "./DataBaseModel";

// Cria uma instância do DataBaseModel e acessa o pool de conexões ao banco de dados.
const database = new DataBaseModel().pool;

/**
 * Classe que representa uma Sessão de cinema no sistema.
 */
export class Sessao {

    // Propriedades privadas da Sessão
    private idSessao: number = 0;
    private idFilme: number;
    private idSala: number;
    private horario: string;
    private data: string;

    /**
     * Construtor da classe Sessao
     * 
     * @param idFilme ID do filme que será exibido na sessão
     * @param idSala ID da sala onde a sessão ocorrerá
     * @param horario Horário da sessão
     * @param data Data da sessão
     */
    constructor(idFilme: number, idSala: number, horario: string, data: string) {
        this.idFilme = idFilme;
        this.idSala = idSala;
        this.horario = horario;
        this.data = data;
    }

    // Getters e Setters

    public getIdSessao(): number {
        return this.idSessao;
    }

    public setIdSessao(id: number): void {
        this.idSessao = id;
    }

    public getIdFilme(): number {
        return this.idFilme;
    }

    public setIdFilme(idFilme: number): void {
        this.idFilme = idFilme;
    }

    public getIdSala(): number {
        return this.idSala;
    }

    public setIdSala(idSala: number): void {
        this.idSala = idSala;
    }

    public getHorario(): string {
        return this.horario;
    }

    public setHorario(horario: string): void {
        this.horario = horario;
    }

    public getData(): string {
        return this.data;
    }

    public setData(data: string): void {
        this.data = data;
    }

    /**
     * Método estático que lista todas as sessões cadastradas no banco de dados.
     * 
     * @returns Uma lista de objetos do tipo Sessao ou null em caso de erro.
     */
    static async listarSessoes(): Promise<Array<Sessao> | null> {
        const lista: Array<Sessao> = [];

        try {
            const query = `SELECT * FROM Sessao;`;
            const resposta = await database.query(query);

            resposta.rows.forEach((linha: any) => {
                const sessao = new Sessao(
                    linha.id_filme,
                    linha.id_sala,
                    linha.horario,
                    linha.data
                );
                sessao.setIdSessao(linha.id_sessao);
                lista.push(sessao);
            });

            return lista;
        } catch (error) {
            console.log("Erro ao listar sessões:", error);
            return null;
        }
    }
}
