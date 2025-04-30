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
    private DataHoraInicio: number;
    private DataHoraFim: number;

    /**
     * Construtor da classe Sessao
     * 
     * @param idFilme ID do filme que será exibido na sessão
     * @param idSala ID da sala onde a sessão ocorrerá
     * @param horario Horário da sessão
     * @param data Data da sessão
     */
    constructor(idFilme: number, idSala: number, DataHoraInicio: number, DataHoraFim: number) {
        this.idFilme = idFilme;
        this.idSala = idSala;
        this.DataHoraInicio = DataHoraInicio;
        this.DataHoraFim = DataHoraFim;
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

    public getDataHoraInicio(): number {
        return this.DataHoraInicio;
    }

    public setdDtaHoraInicio(DataHoraInicio: number): void {
        this.DataHoraInicio = DataHoraInicio;
    }

    public getDataHoraFim(): number {
        return this.DataHoraFim;
    }

    public setDataHoraFim(DataHoraFim: number): void {
        this.DataHoraFim = DataHoraFim;
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
                    linha.DataHoraInicio,
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
    static async cadastrarSessao(sessao: Sessao): Promise<boolean> {
        try {
            const queryInsertSessao = `
                INSERT INTO Sessao (id_filme, id_sala,data_hora_inicio, data_hora_fim)
                VALUES (
                    ${sessao.getIdFilme()},
                    ${sessao.getIdSala()},
                    '${sessao.getDataHoraInicio()}',
                    '${sessao.getDataHoraFim()}'
                )
                RETURNING id_sessao;
            `;
    
            const result = await database.query(queryInsertSessao);
    
            if (result.rows.length > 0) {
                console.log(`Sessão cadastrada com sucesso. ID: ${result.rows[0].id_sessao}`);
                return true;
            }
    
            return false;
        } catch (error) {
            console.error(`Erro ao cadastrar sessão: ${error}`);
            return false;
        }
    }
    

}
