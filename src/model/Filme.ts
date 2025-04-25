// Importa a classe DataBaseModel, que gerencia a conexão com o banco de dados.
import { DataBaseModel } from "./DataBaseModel";  

// Cria uma instância do DataBaseModel e acessa o pool de conexões ao banco de dados.
const database = new DataBaseModel().pool;  

// Define a classe 'Filme', que modela os dados de um filme no sistema.
export class Filme {  
    // Declara as propriedades privadas da classe 'Filme', que representam as informações do filme.
    private idFilme: number = 0;  
    private titulo: string;  
    private sinopse: string;  
    private duracao: string;  
    private classificacaoEtaria: string;  
    private genero: string;  
    private anoLancamento: number;  
    private posterFilme: string;  

    // Construtor da classe 'Filme', inicializa as propriedades com os valores passados ao instanciar o objeto.
    constructor(
        titulo: string,
        sinopse: string,
        duracao: string,
        classificacaoEtaria: string,
        genero: string,
        anoLancamento: number,
        posterFilme: string
    ) {  
        this.titulo = titulo;  
        this.sinopse = sinopse;  
        this.duracao = duracao;  
        this.classificacaoEtaria = classificacaoEtaria;  
        this.genero = genero;  
        this.anoLancamento = anoLancamento;  
        this.posterFilme = posterFilme;  
    }

    // Método para definir o id do filme. É utilizado para atribuir um valor à propriedade 'idFilme'.
    public setIdFilme(id: number): void {  
        this.idFilme = id;  
    }

    // Método para obter o id do filme.
    public getIdFilme(): number {  
        return this.idFilme;  
    }

    // Método estático assíncrono que retorna uma lista de objetos 'Filme' a partir dos dados no banco de dados.
    static async listarFilmes(): Promise<Array<Filme> | null> {  
        const lista: Array<Filme> = [];  // Cria um array vazio para armazenar os filmes.

        try {  
            // Define a consulta SQL para buscar todos os filmes da tabela 'filme'.
            const query = `SELECT * FROM filme;`;  
            // Executa a consulta e espera pela resposta.
            const resposta = await database.query(query);

            // Itera sobre cada linha da resposta do banco de dados.
            resposta.rows.forEach((linha: any) => {  
                // Cria um novo objeto 'Filme' a partir dos dados da linha.
                const filme = new Filme(
                    linha.titulo,
                    linha.sinopse,
                    linha.duracao,
                    linha.classificacao_etaria,
                    linha.genero,
                    linha.ano_lancamento,
                    linha.poster_filme
                );
                // Atribui o id_filme à instância do objeto 'Filme'.
                filme.setIdFilme(linha.id_filme);  
                // Adiciona o filme à lista.
                lista.push(filme);  
            });

            // Retorna a lista de filmes.
            return lista;  
        } catch (error) {  
            // Exibe o erro no console se a consulta falhar.
            console.log("Erro ao listar filmes:", error);  
            // Retorna null se ocorrer algum erro na consulta.
            return null;  
        }
    }
}
