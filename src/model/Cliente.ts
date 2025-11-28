import { DataBaseModel } from "./DataBaseModel";

const database = new DataBaseModel().pool;

export class Cliente {
    private idCliente: number = 0;
    private nomeCompleto: string;
    private email: string;
    private senha: string;
    private cpf: string;
    private celular: string;
    private imagemPerfil: string = ''; 

    constructor(nomeCompleto: string, email: string, senha: string, cpf: string, celular: string) {
        this.nomeCompleto = nomeCompleto;
        this.email = email;
        this.senha = senha;
        this.cpf = cpf;
        this.celular = celular;
    }

    public getIdCliente(): number { return this.idCliente; }
    public setIdCliente(id: number): void { this.idCliente = id; }

    public getNomeCompleto(): string { return this.nomeCompleto; }
    public setNomeCompleto(nome: string): void { this.nomeCompleto = nome; }

    public getEmail(): string { return this.email; }
    public setEmail(email: string): void { this.email = email; }

    public getSenha(): string { return this.senha; }
    public setSenha(senha: string): void { this.senha = senha; }

    public getCpf(): string { return this.cpf; }
    public setCpf(cpf: string): void { this.cpf = cpf; }

    public getCelular(): string { return this.celular; }
    public setCelular(celular: string): void { this.celular = celular; }

    public getImagemPerfil(): string { return this.imagemPerfil; }
    public setImagemPerfil(imagem: string): void { this.imagemPerfil = imagem; }

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
                cliente.setImagemPerfil(linha.imagem_perfil);
                lista.push(cliente);
            });

            return lista;
        } catch (error) {
            console.log("Erro ao listar clientes:", error);
            return null;
        }
    }

    static async cadastrarCliente(cliente: Cliente): Promise<boolean> {

        console.log("Cadastrando cliente:", cliente);
        try {
            const queryInsertCliente = `
                INSERT INTO Cliente (nome_completo, email, senha, cpf, celular, imagem_perfil)
                VALUES ($1, $2, $3, $4, $5, $6)
                RETURNING id_cliente;
            `;

            const values = [
                cliente.getNomeCompleto(),
                cliente.getEmail(),
                cliente.getSenha(),
                cliente.getCpf(),
                cliente.getCelular(),
                cliente.getImagemPerfil()
            ];

            console.log("URL salva no banco:", cliente.getImagemPerfil());

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
            const queryDeleteCliente = `DELETE FROM Cliente WHERE id_Cliente = $1;`;
            const result = await database.query(queryDeleteCliente, [id_Cliente]);

            if (result.rowCount != 0) {
                queryResult = true;
            }

            return queryResult;

        } catch (error) {
            console.log(`Erro na consulta: ${error}`);
            return queryResult;
        }
    }
}

//
