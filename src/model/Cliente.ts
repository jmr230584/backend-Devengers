import {DataBaseModel } from "./DataBaseModel";
const database = new DataBaseModel().pool;

export class Cliente {
    private idCliente: number = 0;
    private nomeCompleto: string;
    private email: string;
    private senha: string;
    private cpf: string;
    private celular: string;

    constructor(nomeCompleto: string, email: string, senha: string, cpf: string, celular: string) {
        this.nomeCompleto = nomeCompleto;
        this.email = email;
        this.senha = senha;
        this.cpf = cpf;
        this.celular = celular;
    }

    public setIdCliente(id: number): void {
        this.idCliente = id;
    }

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
