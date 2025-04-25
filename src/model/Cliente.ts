// Importa a classe DataBaseModel, que provavelmente gerencia a conexão com o banco de dados.
import { DataBaseModel } from "./DataBaseModel";  

// Cria uma instância do DataBaseModel e acessa a propriedade 'pool', que representa a conexão com o banco de dados.
const database = new DataBaseModel().pool;  

// Define a classe 'Cliente', que modela os dados de um cliente no sistema.
export class Cliente {  
    // Declara as propriedades privadas da classe, que representam os dados de um cliente.
    private idCliente: number = 0;  
    private nomeCompleto: string;  
    private email: string;  
    private senha: string;  
    private cpf: string;  
    private celular: string;  

    // O construtor inicializa as propriedades da classe com os valores passados ao instanciar o objeto.
    constructor(nomeCompleto: string, email: string, senha: string, cpf: string, celular: string) {  
        this.nomeCompleto = nomeCompleto;  
        this.email = email;  
        this.senha = senha;  
        this.cpf = cpf;  
        this.celular = celular;  
    }

    // Método para definir o id do cliente. É utilizado para atribuir um valor ao idCliente.
    public setIdCliente(id: number): void {  
        this.idCliente = id;  
    }

    // Método estático assíncrono que retorna uma lista de objetos 'Cliente' a partir de dados no banco de dados.
    static async listarClientes(): Promise<Array<Cliente> | null> {  
        const lista: Array<Cliente> = [];  // Cria um array vazio para armazenar os clientes.

        try {  
            // Define a consulta SQL para buscar todos os clientes da tabela 'Cliente'.
            const query = `SELECT * FROM Cliente;`;  
            // Executa a consulta e espera pela resposta.
            const resposta = await database.query(query);

            // Itera sobre cada linha da resposta do banco de dados.
            resposta.rows.forEach((linha: any) => {  
                // Cria um novo objeto 'Cliente' a partir dos dados da linha.
                const cliente = new Cliente(
                    linha.nome_completo,
                    linha.email,
                    linha.senha,
                    linha.cpf,
                    linha.celular
                );
                // Atribui o id_cliente à instância do objeto 'Cliente'.
                cliente.setIdCliente(linha.id_cliente);  
                // Adiciona o cliente à lista.
                lista.push(cliente);  
            });

            // Retorna a lista de clientes.
            return lista;  
        } catch (error) {  
            // Exibe o erro no console se a consulta falhar.
            console.log("Erro ao listar clientes:", error);  
            // Retorna null se ocorrer algum erro na consulta.
            return null;  
        }
    }
}
