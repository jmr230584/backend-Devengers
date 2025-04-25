import { DataBaseModel } from "./DataBaseModel";
const database = new DataBaseModel().pool;

export class Sala {
    private idSala: number = 0;
    private numeroSala: number;
    private tipoSala: string;
    private numeroAssento: number;
    private fileira: number;

    constructor(numeroSala: number, tipoSala: string, numeroAssento: number, fileira: number) {
        this.numeroSala = numeroSala;
        this.tipoSala = tipoSala;
        this.numeroAssento = numeroAssento;
        this.fileira = fileira;
    }

    public setIdSala(id: number): void {
        this.idSala = id;
    }

    static async listarSalas(): Promise<Array<Sala> | null> {
        const lista: Array<Sala> = [];

        try {
            const query = `SELECT * FROM Sala;`;
            const resposta = await database.query(query);

            resposta.rows.forEach((linha: any) => {
                const sala = new Sala(
                    linha.numero_sala,
                    linha.tipo_sala,
                    linha.numero_assento,
                    linha.fileira
                );
                sala.setIdSala(linha.id_sala);
                lista.push(sala);
            });

            return lista;
        } catch (error) {
            console.log("Erro ao listar salas:", error);
            return null;
        }
    }
}
