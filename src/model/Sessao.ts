// Importa a classe DataBaseModel, que gerencia a conexão com o banco de dados.
import { DataBaseModel } from "./DataBaseModel";  

// Cria uma instância do DataBaseModel e acessa o pool de conexões ao banco de dados.
const database = new DataBaseModel().pool;  

// Define a classe 'Sessao', que modela os dados de uma sessão de cinema no sistema.
export class Sessao {  
    // Declara as propriedades privadas da classe 'Sessao', que representam as informações de uma sessão.
    private idSessao: number = 0;  
    private idFilme: number;  
    private idSala: number;  
    private dataHoraInicio: string;  
    private dataHoraFim: string;  

    // Construtor da classe 'Sessao', inicializa as propriedades com os valores passados ao instanciar o objeto.
    constructor(idFilme: number, idSala: number, dataHoraInicio: string, dataHoraFim: string) {  
        this.idFilme = idFilme;  
        this.idSala = idSala;  
        this.dataHoraInicio = dataHoraInicio;  
        this.dataHoraFim = dataHoraFim;  
    }

    // Método para definir o id da sessão. É utilizado para atribuir um valor à propriedade 'idSessao'.
    public setIdSessao(id: number): void {  
        this.idSessao = id;  
    }

    // Método estático assíncrono que retorna uma lista de objetos 'Sessao' a partir dos dados no banco de dados.
    static async listarSessoes(): Promise<Array<Sessao> | null> {  
        const lista: Array<Sessao> = [];  // Cria um array vazio para armazenar as sessões.

        try {  
            // Define a consulta SQL para buscar todas as sessões da tabela 'Sessao'.
            const query = `SELECT * FROM Sessao;`;  
            // Executa a consulta e espera pela resposta.
            const resposta = await database.query(query);

            // Itera sobre cada linha da resposta do banco de dados.
            resposta.rows.forEach((linha: any) => {  
                // Cria um novo objeto 'Sessao' a partir dos dados da linha.
                const sessao = new Sessao(
                    linha.id_filme,
                    linha.id_sala,
                    linha.data_hora_inicio,
                    linha.data_hora_fim
                );
                // Atribui o id_sessao à instância do objeto 'Sessao'.
                sessao.setIdSessao(linha.id_sessao);  
                // Adiciona a sessão à lista.
                lista.push(sessao);  
            });

            // Retorna a lista de sessões.
            return lista;  
        } catch (error) {  
            // Exibe o erro no console se a consulta falhar.
            console.log("Erro ao listar sessões:", error);  
            // Retorna null se ocorrer algum erro na consulta.
            return null;  
        }
    }
}
