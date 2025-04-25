// Importa a classe DataBaseModel para gerenciar a conexão com o banco de dados.
import { DataBaseModel } from "./DataBaseModel";

// Cria uma instância do DataBaseModel para acessar o pool de conexões.
const database = new DataBaseModel().pool;

export class Filme {
    // Define as propriedades privadas da classe 'Filme', incluindo a nova propriedade 'disponibilidade'.
    private idFilme: number = 0;
    private titulo: string;
    private sinopse: string;
    private duracao: string;
    private classificacaoEtaria: string;
    private genero: string;
    private anoLancamento: number;
    private posterFilme: string;
    private disponibilidade: string; // Nova propriedade para disponibilidade

    // Construtor da classe 'Filme', agora inclui o campo 'disponibilidade'.
    constructor(
        titulo: string,
        sinopse: string,
        duracao: string,
        classificacaoEtaria: string,
        genero: string,
        anoLancamento: number,
        posterFilme: string,
        disponibilidade: string // Adicionando 'disponibilidade' ao construtor
    ) {
        this.titulo = titulo;
        this.sinopse = sinopse;
        this.duracao = duracao;
        this.classificacaoEtaria = classificacaoEtaria;
        this.genero = genero;
        this.anoLancamento = anoLancamento;
        this.posterFilme = posterFilme;
        this.disponibilidade = disponibilidade; // Inicializa a propriedade de disponibilidade
    }

    // Método para definir o id do filme.
    public setIdFilme(id: number): void {
        this.idFilme = id;
    }

    // Método para obter o id do filme.
    public getIdFilme(): number {
        return this.idFilme;
    }

    // Método para obter a disponibilidade do filme.
    public getDisponibilidade(): string {
        return this.disponibilidade;
    }

    // Método para converter a instância de 'Filme' em um objeto JSON.
    public toJSON() {
        return {
            idFilme: this.idFilme,
            titulo: this.titulo,
            sinopse: this.sinopse,
            duracao: this.duracao,
            classificacaoEtaria: this.classificacaoEtaria,
            genero: this.genero,
            anoLancamento: this.anoLancamento,
            posterFilme: this.posterFilme,
            disponibilidade: this.disponibilidade // Inclui a disponibilidade no JSON
        };
    }

    // Método estático assíncrono para listar todos os filmes do banco de dados.
    static async listarFilmes(): Promise<Array<Filme> | null> {
        const lista: Array<Filme> = []; // Cria um array vazio para armazenar os filmes.

        try {
            // Consulta SQL para selecionar todos os filmes da tabela 'filme'.
            const query = `SELECT * FROM filme;`;
            const resposta = await database.query(query); // Executa a consulta no banco.

            // Para cada linha retornada pelo banco, cria uma instância de Filme e adiciona à lista.
            resposta.rows.forEach((linha: any) => {
                const filme = new Filme(
                    linha.titulo,
                    linha.sinopse,
                    linha.duracao,
                    linha.classificacao_etaria,
                    linha.genero,
                    linha.ano_lancamento,
                    linha.poster_filme,
                    linha.disponibilidade // Adiciona o valor de disponibilidade retornado pelo banco.
                );
                filme.setIdFilme(linha.id_filme); // Define o id do filme.
                lista.push(filme); // Adiciona o filme à lista.
            });

            // Retorna a lista de filmes.
            return lista;
        } catch (error) {
            console.log("Erro ao listar filmes:", error); // Caso ocorra erro, exibe no console.
            return null; // Retorna null em caso de erro.
        }
    }
}
