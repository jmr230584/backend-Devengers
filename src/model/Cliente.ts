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
    private cpf: string;  // ALTERADO para string
    private celular: string;

    /**
     * Construtor da classe Cliente
     * 
     * @param nomeCompleto Nome completo do cliente
     * @param email Email do cliente
     * @param senha Senha do cliente
     * @param cpf CPF do cliente (string)
     * @param celular Celular do cliente
     */
    constructor(nomeCompleto: string, email: string, senha: string, cpf: string, celular: string) { // ALTERADO para string
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

    public getCpf(): string {   // ALTERADO para string
        return this.cpf;
    }

    public setCpf(cpf: string): void {   // ALTERADO para string
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
                    linha.cpf,   // já vem como string
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

    static async cadastrarCliente(cliente: Cliente): Promise<Boolean> {
        try {
            const queryInsertCliente = `
                INSERT INTO Cliente (nome_completo, email, senha, cpf, celular)
                VALUES (
                    '${cliente.getNomeCompleto()}',
                    '${cliente.getEmail()}',
                    '${cliente.getSenha()}',
                    '${cliente.getCpf()}',  -- agora é string
                    '${cliente.getCelular().toLowerCase()}'
                )
                RETURNING id_cliente;`;

            const resultBD = await database.query(queryInsertCliente);

            if (resultBD.rows.length > 0) {
                console.log(`Cliente cadastrado com sucesso. ID: ${resultBD.rows[0].id_cliente}`);
                return true;
            }
            return false;
        } catch (error) {
            console.error(`Erro ao cadastrar cliente: ${error}`);
            return false;
        }
    }

    static async atualizarCliente(cliente: Cliente): Promise<boolean> {
        try {
            const queryAtualizarCliente = `UPDATE Cliente SET 
                                            nome_completo = '${cliente.getNomeCompleto().toUpperCase()}', 
                                            email = '${cliente.getEmail().toLowerCase()}',
                                            senha = '${cliente.getSenha().toUpperCase()}',
                                            cpf = '${cliente.getCpf()}',   -- string
                                            celular = '${cliente.getCelular()}'                                            
                                            WHERE id_cliente = ${cliente.idCliente}`;

            const respostaBD = await database.query(queryAtualizarCliente);

            if (respostaBD.rowCount != 0) {
                console.log(`Cliente atualizado com sucesso! ID: ${cliente.getIdCliente()}`);
                return true;
            }
            return false;

        } catch (error) {
            console.log('Erro ao atualizar o Cliente. Verifique os logs para mais detalhes.');
            console.log(error);
            return false;
        }
    }

    static async deletarCliente(id_Cliente: number): Promise<Boolean> {
        let queryResult = false;

        try {
            const queryDeleteCliente = `DELETE FROM Cliente
                                        WHERE id_Cliente=${id_Cliente};`;

            await database.query(queryDeleteCliente)
                .then((result) => {
                    if (result.rowCount != 0) {
                        queryResult = true;
                    }
                });

            return queryResult;
        } catch (error) {
            console.log(`Erro na consulta: ${error}`);
            return queryResult;
        }
    }
}

