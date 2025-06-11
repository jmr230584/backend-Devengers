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
    private cpf: number;
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
    constructor(nomeCompleto: string, email: string, senha: string, cpf: number, celular: string) {
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

    public getCpf(): number {
        return this.cpf;
    }


    public setCpf(cpf: number): void {
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
    static async cadastrarCliente(cliente: Cliente): Promise<Boolean> {
        try {
            // Cria a consulta (query) para inserir o registro de um  no banco de dados, retorna o ID do cliente que foi criado no final
            const queryInsertCliente = `
                INSERT INTO Cliente (nome_completo, email, senha, cpf, celular)
                VALUES (
                    '${cliente.getNomeCompleto().toUpperCase()}',
                    '${cliente.getEmail().toUpperCase()}',
                    '${cliente.getSenha()}',
                    '${cliente.getCpf()}',
                    '${cliente.getCelular().toLowerCase()}'
                )
                RETURNING id_cliente;`;

            // Executa a query no banco de dados e armazena o resultado
            const resultBD = await database.query(queryInsertCliente);

            // verifica se a quantidade de linhas que foram alteradas é maior que 0
            if (resultBD.rows.length > 0) {
                // Exibe a mensagem de sucesso
                console.log(`Cliente cadastrado com sucesso. ID: ${resultBD.rows[0].id_cliente}`);
                // retorna verdadeiro
                return true;
            }

            // caso a consulta não tenha tido sucesso, retorna falso
            return false;
            // captura erro
        } catch (error) {
            // Exibe mensagem com detalhes do erro no console
            console.error(`Erro ao cadastrar cliente: ${error}`);
            // retorna falso
            return false;
        }
    }

    /**
     * Atualiza os dados de um Cliente no banco de dados.
     * @param Cliente Objeto do tipo Cliente com os novos dados
     * @returns true caso sucesso, false caso erro
     */
    static async atualizarCliente(cliente: Cliente): Promise<boolean> {
        try {
                // Construção da query SQL para atualizar os dados do Cliente no banco de dados.
                const queryAtualizarCliente = `UPDATE Cliente SET 
                                            nome_completo = '${cliente.getNomeCompleto().toUpperCase()}', 
                                            email = '${cliente.getEmail().toLowerCase()}',
                                            senha = '${cliente.getSenha().toUpperCase()}',
                                            cpf = '${cliente.getCpf()}', 
                                            celular = '${cliente.getCelular()}'                                            
                                            WHERE id_cliente = ${cliente.idCliente}`;

                // Executa a query no banco de dados e armazena a resposta.
            const respostaBD = await database.query(queryAtualizarCliente);

            // Verifica se alguma linha foi alterada pela operação de atualização.
            if (respostaBD.rowCount != 0) {
                // Loga uma mensagem de sucesso no console indicando que o Aluno foi atualizado.
                console.log(`Cliente atualizado com sucesso! ID: ${cliente.getIdCliente()}`);
                // Retorna `true` para indicar sucesso na atualização.
                return true;
            }

            // Retorna `false` se nenhuma linha foi alterada (atualização não realizada).
            return false;

        } catch (error) {
            // Exibe uma mensagem de erro no console caso ocorra uma exceção.
            console.log('Erro ao atualizar o Cliente. Verifique os logs para mais detalhes.');
            // Loga o erro no console para depuração.
            console.log(error);
            // Retorna `false` indicando que a atualização falhou.
            return false;
        }
    }

    static async deletarCliente(idCliente: number): Promise<Boolean> {
    // variável para controle de resultado da consulta (query)
    let queryResult = false;

    try {// Cria a consulta (query) para remover a Cliente

            // Construção da query SQL para deletar o Cliente.
            const queryDeleteCliente = `UPDATE Cliente
                                        SET status_cliente = FALSE
                                            WHERE id_Cliente=${idCliente};`;

            // Executa a query de exclusão e verifica se a operação foi bem-sucedida.
            await database.query(queryDeleteCliente)
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
