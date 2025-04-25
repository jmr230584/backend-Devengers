import { DataBaseModel } from "./DataBaseModel";
const database = new DataBaseModel().pool;

export class Sessao {
    private idSessao: number = 0;
    private idFilme: number;
    private idSala: number;
    private dataHoraInicio: string;
    private dataHoraFim: string;

    constructor(idFilme: number, idSala: number, dataHoraInicio: string, dataHoraFim: string) {
        this.idFilme = idFilme;
        this.idSala = idSala;
        this.dataHoraInicio = dataHoraInicio;
        this.dataHoraFim = dataHoraFim;
    }

    public setIdSessao(id: number): void {
        this.idSessao = id;
    }

    static async listarSessoes(): Promise<Array<Sessao> | null> {
        const lista: Array<Sessao> = [];

        try {
            const query = `SELECT * FROM Sessao;`;
            const resposta = await database.query(query);

            resposta.rows.forEach((linha: any) => {
                const sessao = new Sessao(
                    linha.id_filme,
                    linha.id_sala,
                    linha.data_hora_inicio,
                    linha.data_hora_fim
                );
                sessao.setIdSessao(linha.id_sessao);
                lista.push(sessao);
            });

            return lista;
        } catch (error) {
            console.log("Erro ao listar sessões:", error);
            return null;
        }
    }
}
