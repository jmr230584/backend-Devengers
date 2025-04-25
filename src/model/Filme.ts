import { DataBaseModel } from "./DataBaseModel";

const database = new DataBaseModel().pool;

export class Filme {
    private idFilme: number = 0;
    private titulo: string;
    private sinopse: string;
    private duracao: string;
    private classificacaoEtaria: string;
    private genero: string;
    private anoLancamento: number;
    private posterFilme: string;

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

    public setIdFilme(id: number): void {
        this.idFilme = id;
    }

    public getIdFilme(): number {
        return this.idFilme;
    }

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
                    linha.poster_filme
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
