// Importa a classe DataBaseModel, que gerencia a conexão com o banco de dados.
import { DataBaseModel } from "./DataBaseModel";

// Cria uma instância do DataBaseModel e acessa o pool de conexões ao banco de dados.
const database = new DataBaseModel().pool;

/**
 * Classe que representa um Ingresso no sistema.
 */
export class Ingresso {

    // Propriedades privadas do Ingresso
    private idIngresso: number = 0;
    private idSessao: number;
    private idCliente: number;
    private statusIngresso: string;
    private precoIngresso: number;

    /**
     * Construtor da classe Ingresso
     * 
     * @param idSessao ID da sessão relacionada ao ingresso
     * @param idCliente ID do cliente que comprou o ingresso
     * @param statusIngresso Status do ingresso (por exemplo: "ativo", "cancelado")
     * @param precoIngresso Valor pago pelo ingresso
     */
    constructor(idSessao: number, idCliente: number, statusIngresso: string, precoIngresso: number) {
        this.idSessao = idSessao;
        this.idCliente = idCliente;
        this.statusIngresso = statusIngresso;
        this.precoIngresso = precoIngresso;
    }

    // Getters e Setters

    public getIdIngresso(): number {
        return this.idIngresso;
    }

    public setIdIngresso(id: number): void {
        this.idIngresso = id;
    }

    public getIdSessao(): number {
        return this.idSessao;
    }

    public setIdSessao(idSessao: number): void {
        this.idSessao = idSessao;
    }

    public getIdCliente(): number {
        return this.idCliente;
    }

    public setIdCliente(idCliente: number): void {
        this.idCliente = idCliente;
    }

    public getStatusIngresso(): string {
        return this.statusIngresso;
    }

    public setStatusIngresso(status: string): void {
        this.statusIngresso = status;
    }

    public getPrecoIngresso(): number {
        return this.precoIngresso;
    }

    public setPrecoIngresso(preco: number): void {
        this.precoIngresso = preco;
    }

    /**
     * Método estático que lista todos os ingressos registrados no banco de dados.
     * 
     * @returns Uma lista de objetos do tipo Ingresso ou null em caso de erro.
     */
    static async listarIngressos(): Promise<Array<Ingresso> | null> {
        const lista: Array<Ingresso> = [];

        try {
            const query = `SELECT * FROM Ingresso;`;
            const resposta = await database.query(query);

            resposta.rows.forEach((linha: any) => {
                const ingresso = new Ingresso(
                    linha.id_sessao,
                    linha.id_cliente,
                    linha.status_ingresso,
                    parseFloat(linha.preco_ingresso)
                );
                ingresso.setIdIngresso(linha.id_ingresso);
                lista.push(ingresso);
            });

            return lista;
        } catch (error) {
            console.log("Erro ao listar ingressos:", error);
            return null;
        }
    }
     
    static async cadastrarIngresso(ingresso: Ingresso): Promise<any> {
        let insertResult = false ;
        let objetoResposta = {queryResult:false,idIngresso:0} 
        try {
            const queryInsertIngresso = `
                INSERT INTO Ingresso (id_sessao, id_cliente, status_ingresso, preco_ingresso)
                VALUES (
                    ${ingresso.getIdSessao()},
                    ${ingresso.getIdCliente()},
                    '${ingresso.getStatusIngresso()}',
                    ${ingresso.getPrecoIngresso()}
                )
                RETURNING id_ingresso;
            `;
    
            const result = await database.query(queryInsertIngresso);
    
            if (result.rows.length > 0) {
                console.log(`Ingresso cadastrado com sucesso. ID: ${result.rows[0].id_ingresso}`);
                insertResult = true;
               let idIngresso = result.rows[0].id_ingresso;
               objetoResposta = {queryResult:insertResult,idIngresso:idIngresso}
            }
        return objetoResposta;

        } catch (error) {
            console.error(`Erro ao cadastrar ingresso: ${error}`);
            return{queryResult:false};
        }
    }

    static async atualizarIngresso(ingresso: Ingresso): Promise<boolean> {
        try {
            // Construção da query SQL para atualizar os dados do Ingresso no banco de dados.
            const queryAtualizarIngresso = `UPDATE Ingresso SET 
                                            id_sessao = ${ingresso.getIdSessao()},
                                            id_cliente = ${ingresso.getIdCliente()},
                                            status_ingresso = '${ingresso.getStatusIngresso()}',
                                            preco_ingresso = ${ingresso.getPrecoIngresso()}
                                            WHERE id_ingresso = ${ingresso.getIdIngresso()}`;
    
            // Executa a query no banco de dados
            const respostaBD = await database.query(queryAtualizarIngresso);
    
            // Verifica se alguma linha foi alterada
            if (respostaBD.rowCount !== 0) {
                console.log(`Ingresso atualizado com sucesso! ID: ${ingresso.getIdIngresso()}`);
                return true;
            }
    
            // Nenhuma linha alterada
            return false;
    
        } catch (error) {
            console.log("Erro ao atualizar o Ingresso. Verifique os logs para mais detalhes.");
            console.error(error);
            return false;
        }
    }

        static async deletarIngresso(idIngresso: number): Promise<Boolean> {
    // variável para controle de resultado da consulta (query)
    let queryResult = false;

    try {// Cria a consulta (query) para remover a Ingresso

            // Construção da query SQL para deletar o Ingresso.
            const queryDeleteIngresso = `DELETE FROM Ingresso
                                            WHERE id_Ingresso=${idIngresso};`;

            // Executa a query de exclusão e verifica se a operação foi bem-sucedida.
            await database.query(queryDeleteIngresso)
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


//