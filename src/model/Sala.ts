// Importa a classe DataBaseModel, que gerencia a conexão com o banco de dados.
import { DataBaseModel } from "./DataBaseModel";

// Cria uma instância do DataBaseModel e acessa o pool de conexões ao banco de dados.
const database = new DataBaseModel().pool;

/**
 * Classe que representa uma Sala de cinema no sistema.
 */
export class Sala {

    // Propriedades privadas da Sala
    private idSala: number = 0;
    private numeroSala: number;
    private tipoSala: string;
    private numeroAssento: number;
    private fileira: number;

    /**
     * Construtor da classe Sala
     * 
     * @param numeroSala Número da sala de cinema
     * @param tipoSala Tipo da sala (por exemplo: 2D, 3D, IMAX)
     * @param numeroAssento Quantidade total de assentos na sala
     * @param fileira Quantidade de fileiras da sala
     */
    constructor(numeroSala: number, tipoSala: string, numeroAssento: number, fileira: number) {
        this.numeroSala = numeroSala;
        this.tipoSala = tipoSala;
        this.numeroAssento = numeroAssento;
        this.fileira = fileira;
    }

    // Getters 

    public getIdSala(): number {
        return this.idSala;
    }

    public setIdSala(id: number): void {
        this.idSala = id;
    }

    public getNumeroSala(): number {
        return this.numeroSala;
    }

    //setters 

    public setNumeroSala(numero: number): void {
        this.numeroSala = numero;
    }

    public getTipoSala(): string {
        return this.tipoSala;
    }

    public setTipoSala(tipo: string): void {
        this.tipoSala = tipo;
    }

    public getNumeroAssento(): number {
        return this.numeroAssento;
    }

    public setNumeroAssento(numero: number): void {
        this.numeroAssento = numero;
    }

    public getFileira(): number {
        return this.fileira;
    }

    
    public setFileira(fileira: number): void {
        this.fileira = fileira;
    }

    /**
     * Método estático que lista todas as salas cadastradas no banco de dados.
     * 
     * @returns Uma lista de objetos do tipo Sala ou null em caso de erro.
     */
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
