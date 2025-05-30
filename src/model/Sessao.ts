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

            console.log(lista)

            return lista;
        } catch (error) {
            console.log("Erro ao listar sessões:", error);
            return null;
        }
    }
    static async cadastrarSessao(sessao: Sessao): Promise<boolean> {
        try {
            const queryInsertSessao = `
                INSERT INTO Sessao (id_filme, id_sala, data_hora_inicio, data_hora_fim)
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
         * Atualiza os dados de uma sessao no banco de dados.
         * @param Sessao Objeto do tipo Sessao com os novos dados
         * @returns true caso sucesso, false caso erro
         */
        static async atualizarSessao(sessao: Sessao): Promise<boolean> {
            try {
                    // Construção da query SQL para atualizar os dados da Sessao no banco de dados.
                    const queryAtualizarSessao = `UPDATE Sessao SET 
                                                id_filme = '${sessao.getIdFilme()}', 
                                                id_sala = '${sessao.getIdSala()}',
                                                data_hora_inicio = '${sessao.getDataHoraInicio()}',
                                                data_hora_fim = '${sessao.getDataHoraFim()}'                                     
                                                WHERE id_sessao = ${sessao.idSessao}`;
    
                    // Executa a query no banco de dados e armazena a resposta.
                const respostaBD = await database.query(queryAtualizarSessao);
    
                // Verifica se alguma linha foi alterada pela operação de atualização.
                if (respostaBD.rowCount != 0) {
                    // Loga uma mensagem de sucesso no console indicando que a Sessao foi atualizado.
                    console.log(`Sessao atualizado com sucesso! ID: ${sessao.getIdSessao()}`);
                    // Retorna `true` para indicar sucesso na atualização.
                    return true;
                }
    
                // Retorna `false` se nenhuma linha foi alterada (atualização não realizada).
                return false;
    
            } catch (error) {
                // Exibe uma mensagem de erro no console caso ocorra uma exceção.
                console.log('Erro ao atualizar a Sessao. Verifique os logs para mais detalhes.');
                // Loga o erro no console para depuração.
                console.log(error);
                // Retorna `false` indicando que a atualização falhou.
                return false;
            }
        }
    

}
