// Importa a classe DataBaseModel, que gerencia a conexão com o banco de dados.
import { DataBaseModel } from "./DataBaseModel";  

// Cria uma instância do DataBaseModel e acessa o pool de conexões ao banco de dados.
const database = new DataBaseModel().pool;  

// Define a classe 'Ingresso', que modela os dados de um ingresso no sistema.
export class Ingresso {  
    // Declara as propriedades privadas da classe 'Ingresso', que representam as informações do ingresso.
    private idIngresso: number = 0;  
    private idSessao: number;  
    private idCliente: number;  
    private statusIngresso: string;  
    private precoIngresso: number;  

    // Construtor da classe 'Ingresso', inicializa as propriedades com os valores passados ao instanciar o objeto.
    constructor(idSessao: number, idCliente: number, statusIngresso: string, precoIngresso: number) {  
        this.idSessao = idSessao;  
        this.idCliente = idCliente;  
        this.statusIngresso = statusIngresso;  
        this.precoIngresso = precoIngresso;  
    }

    // Método para definir o id do ingresso. É utilizado para atribuir um valor à propriedade 'idIngresso'.
    public setIdIngresso(id: number): void {  
        this.idIngresso = id;  
    }

    // Método estático assíncrono que retorna uma lista de objetos 'Ingresso' a partir dos dados no banco de dados.
    static async listarIngressos(): Promise<Array<Ingresso> | null> {  
        const lista: Array<Ingresso> = [];  // Cria um array vazio para armazenar os ingressos.

        try {  
            // Define a consulta SQL para buscar todos os ingressos da tabela 'Ingresso'.
            const query = `SELECT * FROM Ingresso;`;  
            // Executa a consulta e espera pela resposta.
            const resposta = await database.query(query);

            // Itera sobre cada linha da resposta do banco de dados.
            resposta.rows.forEach((linha: any) => {  
                // Cria um novo objeto 'Ingresso' a partir dos dados da linha.
                const ingresso = new Ingresso(
                    linha.id_sessao,
                    linha.id_cliente,
                    linha.status_ingresso,
                    parseFloat(linha.preco_ingresso)  // Converte o preço do ingresso para um número de ponto flutuante.
                );
                // Atribui o id_ingresso à instância do objeto 'Ingresso'.
                ingresso.setIdIngresso(linha.id_ingresso);  
                // Adiciona o ingresso à lista.
                lista.push(ingresso);  
            });

            // Retorna a lista de ingressos.
            return lista;  
        } catch (error) {  
            // Exibe o erro no console se a consulta falhar.
            console.log("Erro ao listar ingressos:", error);  
            // Retorna null se ocorrer algum erro na consulta.
            return null;  
        }
    }
}
