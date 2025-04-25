import { DataBaseModel } from "./DataBaseModel";
const database = new DataBaseModel().pool;

export class Ingresso {
    private idIngresso: number = 0;
    private idSessao: number;
    private idCliente: number;
    private statusIngresso: string;
    private precoIngresso: number;

    constructor(idSessao: number, idCliente: number, statusIngresso: string, precoIngresso: number) {
        this.idSessao = idSessao;
        this.idCliente = idCliente;
        this.statusIngresso = statusIngresso;
        this.precoIngresso = precoIngresso;
    }

    public setIdIngresso(id: number): void {
        this.idIngresso = id;
    }

    static async listarIngressos(): Promise<Array<Ingresso> | null> {
        const lista: Array<Ingresso> = [];

        try {
            const query = `SELECT * FROM Ingresso;`;
            const resposta = await database.query(query);

            resposta.rows.forEach((linha: any) => {
                const ingresso = new Ingresso(
                    linha.id_sessao,
                    linha.id_cliente,
                    linha.status_ingresso,
                    parseFloat(linha.preco_ingresso)
                );
                ingresso.setIdIngresso(linha.id_ingresso);
                lista.push(ingresso);
            });

            return lista;
        } catch (error) {
            console.log("Erro ao listar ingressos:", error);
            return null;
        }
    }
}
