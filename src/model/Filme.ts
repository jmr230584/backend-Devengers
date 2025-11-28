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

    static async cadastrarFilme(filme: Filme): Promise<boolean> {
        try {
            // Cria a consulta para inserir um novo filme no banco de dados, retornando o ID do filme inserido
            const queryInsertFilme = `
                INSERT INTO Filme (titulo, sinopse, duracao, classificacao_etaria, genero, ano_lancamento, poster_filme, disponibilidade)
                VALUES (
                    '${filme.getTitulo().toUpperCase()}',
                    '${filme.getSinopse()}',
                    '${filme.getDuracao()}',
                    '${filme.getClassificacaoEtaria()}',
                    '${filme.getGenero().toUpperCase()}',
                    ${filme.getAnoLancamento()},
                    '${filme.getPosterFilme()}',
                    '${filme.getDisponibilidade()}'
                )
                RETURNING id_filme;
            `;
    
            // Executa a query no banco de dados
            const result = await database.query(queryInsertFilme);
    
            // Verifica se a inserção foi bem-sucedida
            if (result.rows.length > 0) {
                console.log(`Filme cadastrado com sucesso. ID: ${result.rows[0].id_filme}`);
                return true;
            }
    
            return false;
        } catch (error) {
            console.error(`Erro ao cadastrar filme: ${error}`);
            return false;
        }
    }

    static async atualizarFilme(filme: Filme): Promise<boolean> {
        try {
          // Construção da query SQL para atualizar os dados do Filme no banco de dados.
      const queryAtualizarFilme = `UPDATE Filme SET 
                         titulo = '${filme.getTitulo().toUpperCase()}', 
                         sinopse = '${filme.getSinopse()}', 
                         duracao = '${filme.getDuracao()}', 
                         classificacao_etaria = '${filme.getClassificacaoEtaria()}', 
                         genero = '${filme.getGenero().toUpperCase()}', 
                         ano_lancamento = ${filme.getAnoLancamento()}, 
                         poster_filme = '${filme.getPosterFilme()}'
                          WHERE id_filme = ${filme.getIdFilme()}`;
 
         // Executa a query no banco de dados e armazena a resposta.
         const respostaBD = await database.query(queryAtualizarFilme);
 
         // Verifica se alguma linha foi alterada pela operação de atualização.
         if (respostaBD.rowCount != 0) {
             console.log(`Filme atualizado com sucesso! ID: ${filme.getIdFilme()}`);
             return true;
         }
 
         return false;
 
     } catch (error) {
         console.log('Erro ao atualizar o Filme. Verifique os logs para mais detalhes.');
         console.log(error);
         return false;
     }
 }

    static async deletarFilme(idFilme: number): Promise<Boolean> {
    // variável para controle de resultado da consulta (query)
    let queryResult = false;

    try {// Cria a consulta (query) para remover a Filme

            // Construção da query SQL para deletar o Filme.
            const queryDeleteFilme = `DELETE FROM Filme
                                            WHERE id_Filme=${idFilme};`;

            // Executa a query de exclusão e verifica se a operação foi bem-sucedida.
            await database.query(queryDeleteFilme)
            .then((result) => {
                if (result.rowCount != 0) {
                    queryResult = true; // Se a operação foi bem-sucedida, define queryResult como true.
                }
            });

            // retorna o resultado da query
            return queryResult;

        // captura qualquer erro que aconteça
        } catch (error) {
            // Em caso de erro na consulta, exibe o erro no console e retorna false.
            console.log(`Erro na consulta: ${error}`);
            // retorna false
            return queryResult;
        }
    }
    
}
//
