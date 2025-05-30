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
    static async cadastrarSala(sala: Sala): Promise<boolean> {
        try {
            const queryInsertSala = `
                INSERT INTO Sala (numero_sala, tipo_sala, numero_assento, fileira)
                VALUES (
                    ${sala.getNumeroSala()},
                    '${sala.getTipoSala()}',
                    ${sala.getNumeroAssento()},
                    ${sala.getFileira()}
                )
                RETURNING id_sala;
            `;
    
            const result = await database.query(queryInsertSala);
    
            if (result.rows.length > 0) {
                console.log(`Sala cadastrada com sucesso. ID: ${result.rows[0].id_sala}`);
                return true;
            }
    
            return false;
        } catch (error) {
            console.error(`Erro ao cadastrar sala: ${error}`);
            return false;
        }
    }

    /**
         * Atualiza os dados de uma Sala no banco de dados.
         * @param Sala Objeto do tipo Sala com os novos dados
         * @returns true caso sucesso, false caso erro
         */
        static async atualizarSala(sala: Sala): Promise<boolean> {
            try {
                    // Construção da query SQL para atualizar os dados da Sala no banco de dados.
                    const queryAtualizarSala = `UPDATE Sala SET 
                                                numero_sala = '${sala.getNumeroSala()}', 
                                                tipo_sala = '${sala.getTipoSala()}',
                                                numero_assento = '${sala.getNumeroAssento()}',
                                                fileira = '${sala.getFileira()}'                                          
                                                WHERE id_sala = ${sala.idSala}`;
    
                    // Executa a query no banco de dados e armazena a resposta.
                const respostaBD = await database.query(queryAtualizarSala);
    
                // Verifica se alguma linha foi alterada pela operação de atualização.
                if (respostaBD.rowCount != 0) {
                    // Loga uma mensagem de sucesso no console indicando que a Sala foi atualizado.
                    console.log(`Sala atualizado com sucesso! ID: ${sala.getIdSala()}`);
                    // Retorna `true` para indicar sucesso na atualização.
                    return true;
                }
    
                // Retorna `false` se nenhuma linha foi alterada (atualização não realizada).
                return false;
    
            } catch (error) {
                // Exibe uma mensagem de erro no console caso ocorra uma exceção.
                console.log('Erro ao atualizar a Sala. Verifique os logs para mais detalhes.');
                // Loga o erro no console para depuração.
                console.log(error);
                // Retorna `false` indicando que a atualização falhou.
                return false;
            }
        }
    
    
}
     
