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
    private imagemPerfil: string = '' // Imagem de perfil do usuário

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
     * Retorna a o caminho da imagem do usuario
     * @returns caminho da imagem do usuário
     */
    public getImagemPerfil(): string {
        return this.imagemPerfil;
    }

    /**
     * Atribui um valor à imagem do usuário
     * @param senha caminho da imagem do usuário
     */
    public setImagemPerfil(imagem: string): void {
        this.imagemPerfil = imagem;
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

   static async cadastrarCliente(cliente: Cliente): Promise<boolean> {
    try {
        // Query usando parâmetros para evitar SQL Injection
        const queryInsertCliente = `
            INSERT INTO Cliente (nome_completo, email, senha, cpf, celular, imagem_perfil)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING id_cliente;
        `;

        // Valores que vão substituir os parâmetros $1...$6
        const values = [
            cliente.getNomeCompleto(),
            cliente.getEmail(),
            cliente.getSenha(),
            cliente.getCpf(),
            cliente.getCelular(),
            cliente.getImagemPerfil()  // Caminho salvo pelo Multer
        ];

        const resultBD = await database.query(queryInsertCliente, values);

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
        const queryAtualizarCliente = `
            UPDATE Cliente 
            SET nome_completo = $1, 
                email = $2,
                senha = $3,
                cpf = $4,
                celular = $5,
                imagem_perfil = $6
            WHERE id_cliente = $7;
        `;

        const values = [
            cliente.getNomeCompleto(),
            cliente.getEmail(),
            cliente.getSenha(),
            cliente.getCpf(),
            cliente.getCelular(),
            cliente.getImagemPerfil(),
            cliente.getIdCliente()
        ];

        const respostaBD = await database.query(queryAtualizarCliente, values);

        if (respostaBD.rowCount != 0) {
            console.log(`Cliente atualizado com sucesso! ID: ${cliente.getIdCliente()}`);
            return true;
        }

        return false;
    } catch (error) {
        console.log("Erro ao atualizar Cliente:", error);
        return false;
    }
}


    static async deletarCliente(id_Cliente: number): Promise<Boolean> {
        let queryResult = false;

        try {
            const queryDeleteCliente = `DELETE FROM Cliente
                                        WHERE id_Cliente=${id_Cliente};`;

            // Executa a query de exclusão e verifica se a operação foi bem-sucedida.
            await database.query(queryDeleteCliente)
                .then((result) => {
                    if (result.rowCount != 0) {
                        queryResult = true;
                    }
                });

            // retorna o resultado da query
            return queryResult;

        // captura qualquer erro que aconteça
        } catch (error) {
            // Em caso de erro na consulta, exibe o erro no console e retorna false.
            console.log(`Erro na consulta: ${error}`);
            return queryResult;
        }
    }
}


//