// Importa a classe DataBaseModel, que provavelmente gerencia a conexão com o banco de dados.
import { DataBaseModel } from "./DataBaseModel";

// Cria uma instância do DataBaseModel e acessa a propriedade 'pool', que representa a conexão com o banco de dados.
const database = new DataBaseModel().pool;

/**
 * Classe que representa um Cliente no sistema.
 */
export class Cliente {

    /* Atributos privados */
    private idCliente: number = 0;
    private nomeCompleto: string;
    private email: string;
    private senha: string;
    private cpf: string;
    private celular: string;

    /**
     * Construtor da classe Cliente
     * 
     * @param nomeCompleto Nome completo do cliente
     * @param email Email do cliente
     * @param senha Senha do cliente
     * @param cpf CPF do cliente
     * @param celular Celular do cliente
     */
    constructor(nomeCompleto: string, email: string, senha: string, cpf: string, celular: string) {
        this.nomeCompleto = nomeCompleto;
        this.email = email;
        this.senha = senha;
        this.cpf = cpf;
        this.celular = celular;
    }

    /* Métodos Get e Set */

    public getIdCliente(): number {
        return this.idCliente;
    }


    public setIdCliente(id: number): void {
        this.idCliente = id;
    }

    public getNomeCompleto(): string {
        return this.nomeCompleto;
    }

    public setNomeCompleto(nome: string): void {
        this.nomeCompleto = nome;
    }

    public getEmail(): string {
        return this.email;
    }

    public setEmail(email: string): void {
        this.email = email;
    }

    public getSenha(): string {
        return this.senha;
    }

    public setSenha(senha: string): void {
        this.senha = senha;
    }

    public getCpf(): string {
        return this.cpf;
    }
    

    public setCpf(cpf: string): void {
        this.cpf = cpf;
    }

    public getCelular(): string {
        return this.celular;
    }

    public setCelular(celular: string): void {
        this.celular = celular;
    }

    /**
     * Método estático para listar todos os clientes do banco de dados
     * @returns Lista de clientes ou null em caso de erro
     */
    static async listarClientes(): Promise<Array<Cliente> | null> {
        const lista: Array<Cliente> = [];

        try {
            const query = `SELECT * FROM Cliente;`;
            const resposta = await database.query(query);

            resposta.rows.forEach((linha: any) => {
                const cliente = new Cliente(
                    linha.nome_completo,
                    linha.email,
                    linha.senha,
                    linha.cpf,
                    linha.celular
                );
                cliente.setIdCliente(linha.id_cliente);
                lista.push(cliente);
            });

            return lista;
        } catch (error) {
            console.log("Erro ao listar clientes:", error);
            return null;
        }
    }
}
