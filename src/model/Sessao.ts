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
    private dataHoraInicio: Date;
    private dataHoraFim: Date;

    /**
     * Construtor da classe Sessao
     * 
     * @param idFilme ID do filme que será exibido na sessão
     * @param idSala ID da sala onde a sessão ocorrerá
     * @param horario Horário da sessão
     * @param data Data da sessão
     */
    constructor(idFilme: number, idSala: number, DataHoraInicio: Date, DataHoraFim: Date) {
        this.idFilme = idFilme;
        this.idSala = idSala;
        this.dataHoraInicio = DataHoraInicio;
        this.dataHoraFim = DataHoraFim;
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

    public getDataHoraInicio(): Date {
        return this.dataHoraInicio;
    }

    public setdDtaHoraInicio(DataHoraInicio: Date): void {
        this.dataHoraInicio = DataHoraInicio;
    }

    public getDataHoraFim(): Date {
        return this.dataHoraFim;
    }

    public setDataHoraFim(DataHoraFim: Date): void {
        this.dataHoraFim = DataHoraFim;
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
                    linha.data_hora_inicio,
                    linha.data_hora_fim
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

    /**
     
Remove uma Sessao do banco de dados
@param idSessao ID da Sessao a ser removido
 
@returns Boolean indicando se a remoção foi bem-sucedida,
*/
static async deletarSessao(idSessao: number): Promise<Boolean> {
    // variável para controle de resultado da consulta (query)
    let queryResult = false;

    try {// Cria a consulta (query) para remover a Sessao

            // Construção da query SQL para deletar o Sessao.
            const queryDeleteSessao = `UPDATE Sessao 
                                        SET status_sessao = FALSE
                                            WHERE id_Sessao=${idSessao};`;

            // Executa a query de exclusão e verifica se a operação foi bem-sucedida.
            await database.query(queryDeleteSessao)
            .then((result) => {
                if (result.rowCount != 0) {
                    queryResult = true; // Se a operação foi bem-sucedida, define queryResult como true.
                }
            });

            // retorna o resultado da query
            return queryResult;

        // captura qualquer erro que aconteça
        } catch (error) {
            // Em caso de erro na consulta, exibe o erro no console e retorna false.
            console.log(`Erro na consulta: ${error}`);
            // retorna false
            return queryResult;
        }
    }
    

}
