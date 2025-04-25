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
    
}
