// Importa a classe DataBaseModel, que gerencia a conexão com o banco de dados.
import { DataBaseModel } from "./DataBaseModel";  

// Cria uma instância do DataBaseModel e acessa o pool de conexões ao banco de dados.
const database = new DataBaseModel().pool;  

// Define a classe 'Sala', que modela os dados de uma sala de cinema no sistema.
export class Sala {  
    // Declara as propriedades privadas da classe 'Sala', que representam as informações da sala.
    private idSala: number = 0;  
    private numeroSala: number;  
    private tipoSala: string;  
    private numeroAssento: number;  
    private fileira: number;  

    // Construtor da classe 'Sala', inicializa as propriedades com os valores passados ao instanciar o objeto.
    constructor(numeroSala: number, tipoSala: string, numeroAssento: number, fileira: number) {  
        this.numeroSala = numeroSala;  
        this.tipoSala = tipoSala;  
        this.numeroAssento = numeroAssento;  
        this.fileira = fileira;  
    }

    // Método para definir o id da sala. É utilizado para atribuir um valor à propriedade 'idSala'.
    public setIdSala(id: number): void {  
        this.idSala = id;  
    }

    // Método estático assíncrono que retorna uma lista de objetos 'Sala' a partir dos dados no banco de dados.
    static async listarSalas(): Promise<Array<Sala> | null> {  
        const lista: Array<Sala> = [];  // Cria um array vazio para armazenar as salas.

        try {  
            // Define a consulta SQL para buscar todas as salas da tabela 'Sala'.
            const query = `SELECT * FROM Sala;`;  
            // Executa a consulta e espera pela resposta.
            const resposta = await database.query(query);

            // Itera sobre cada linha da resposta do banco de dados.
            resposta.rows.forEach((linha: any) => {  
                // Cria um novo objeto 'Sala' a partir dos dados da linha.
                const sala = new Sala(
                    linha.numero_sala,
                    linha.tipo_sala,
                    linha.numero_assento,
                    linha.fileira
                );
                // Atribui o id_sala à instância do objeto 'Sala'.
                sala.setIdSala(linha.id_sala);  
                // Adiciona a sala à lista.
                lista.push(sala);  
            });

            // Retorna a lista de salas.
            return lista;  
        } catch (error) {  
            // Exibe o erro no console se a consulta falhar.
            console.log("Erro ao listar salas:", error);  
            // Retorna null se ocorrer algum erro na consulta.
            return null;  
        }
    }
}
