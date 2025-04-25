// Importa a classe DataBaseModel para gerenciar a conexão com o banco de dados.
import { DataBaseModel } from "./DataBaseModel";

// Cria uma instância do DataBaseModel para acessar o pool de conexões.
const database = new DataBaseModel().pool;

/**
 * Classe que representa um Filme no sistema.
 */
export class Filme {

    // Propriedades privadas do Filme
    private idFilme: number = 0;
    private titulo: string;
    private sinopse: string;
    private duracao: string;
    private classificacaoEtaria: string;
    private genero: string;
    private anoLancamento: number;
    private posterFilme: string;
    private disponibilidade: string;

    /**
     * Construtor da classe Filme
     * 
     * @param titulo Título do filme
     * @param sinopse Sinopse do filme
     * @param duracao Duração do filme
     * @param classificacaoEtaria Classificação etária do filme
     * @param genero Gênero do filme
     * @param anoLancamento Ano de lançamento do filme
     * @param posterFilme URL do poster do filme
     * @param disponibilidade Status de disponibilidade
     */
    constructor(
        titulo: string,
        sinopse: string,
        duracao: string,
        classificacaoEtaria: string,
        genero: string,
        anoLancamento: number,
        posterFilme: string,
        disponibilidade: string
    ) {
        this.titulo = titulo;
        this.sinopse = sinopse;
        this.duracao = duracao;
        this.classificacaoEtaria = classificacaoEtaria;
        this.genero = genero;
        this.anoLancamento = anoLancamento;
        this.posterFilme = posterFilme;
        this.disponibilidade = disponibilidade;
    }

    // Getters e Setters

    public getIdFilme(): number {
        return this.idFilme;
    }

    public setIdFilme(id: number): void {
        this.idFilme = id;
    }

    public getTitulo(): string {
        return this.titulo;
    }

    public setTitulo(titulo: string): void {
        this.titulo = titulo;
    }

    public getSinopse(): string {
        return this.sinopse;
    }

    public setSinopse(sinopse: string): void {
        this.sinopse = sinopse;
    }

    public getDuracao(): string {
        return this.duracao;
    }

    public setDuracao(duracao: string): void {
        this.duracao = duracao;
    }

    public getClassificacaoEtaria(): string {
        return this.classificacaoEtaria;
    }

    public setClassificacaoEtaria(classificacao: string): void {
        this.classificacaoEtaria = classificacao;
    }

    public getGenero(): string {
        return this.genero;
    }

    public setGenero(genero: string): void {
        this.genero = genero;
    }

    public getAnoLancamento(): number {
        return this.anoLancamento;
    }

    public setAnoLancamento(ano: number): void {
        this.anoLancamento = ano;
    }

    public getPosterFilme(): string {
        return this.posterFilme;
    }

    public setPosterFilme(poster: string): void {
        this.posterFilme = poster;
    }

    public getDisponibilidade(): string {
        return this.disponibilidade;
    }

    public setDisponibilidade(disponibilidade: string): void {
        this.disponibilidade = disponibilidade;
    }

    /**
     * Lista todos os filmes cadastrados no banco de dados.
     * @returns Lista de filmes ou null em caso de erro.
     */
    static async listarFilmes(): Promise<Array<Filme> | null> {
        const lista: Array<Filme> = [];

        try {
            const query = `SELECT * FROM filme;`;
            const resposta = await database.query(query);

            resposta.rows.forEach((linha: any) => {
                const filme = new Filme(
                    linha.titulo,
                    linha.sinopse,
                    linha.duracao,
                    linha.classificacao_etaria,
                    linha.genero,
                    linha.ano_lancamento,
                    linha.poster_filme,
                    linha.disponibilidade
                );
                filme.setIdFilme(linha.id_filme);
                lista.push(filme);
            });

            return lista;
        } catch (error) {
            console.log("Erro ao listar filmes:", error);
            return null;
        }

        
    }
}
