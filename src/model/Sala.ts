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

    static async atualizarSala(sala: Sala): Promise<boolean> {
        try {
            const queryAtualizarSala = `UPDATE Sala SET 
                numero_sala = ${sala.getNumeroSala()}, 
                tipo_sala = '${sala.getTipoSala().toUpperCase()}', 
                numero_assento = ${sala.getNumeroAssento()}, 
                fileira = ${sala.getFileira()}
                WHERE id_sala = ${sala.getIdSala()};`
    
            const respostaBD = await database.query(queryAtualizarSala);
    
            if (respostaBD.rowCount !== 0) {
                console.log(`Sala atualizada com sucesso! ID: ${sala.getIdSala()}`);
                return true;
            }
    
            return false;
        } catch (error) {
            console.log("Erro ao atualizar a Sala. Verifique os logs para mais detalhes.");
            console.error(error);
            return false;
        }
    }
    
     static async deletarSala(idSala: number): Promise<Boolean> {
    // variável para controle de resultado da consulta (query)
    let queryResult = true;

    try {// Cria a consulta (query) para remover a Sala

            // Construção da query SQL para deletar o Sala.
            const queryDeleteSala = `DELETE FROM Sala
                                            WHERE id_Sala=${idSala};`;

            // Executa a query de exclusão e verifica se a operação foi bem-sucedida.
            await database.query(queryDeleteSala)
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
     
