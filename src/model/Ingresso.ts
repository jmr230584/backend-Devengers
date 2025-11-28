import { DataBaseModel } from "./DataBaseModel";
const database = new DataBaseModel().pool;

export interface IngressoDTO {
  id?: number;
  preco: number;
  status?: string;
  filme_id: number | null;
  titulo_filme: string | null;
  tipo_sala: string | null;
  data_hora: string | null;
  poltrona: string | null;
  id_cliente?: number;
}

export default class IngressoModel {
  // retorna todos os ingressos com aliases amigáveis
  static async todos(): Promise<any[]> {
    const sql = `
      SELECT 
        id AS id_ingresso,
        preco,
        status,
        filme_id,
        titulo_filme,
        tipo_sala,
        data_hora,
        poltrona,
        id_cliente
      FROM ingresso
      ORDER BY id DESC;
    `;
    const result = await database.query(sql);
    return result.rows;
  }

  // cadastra novo ingresso
  static async cadastrar(data: IngressoDTO): Promise<any> {
    const sql = `
      INSERT INTO ingresso 
        (preco, status, filme_id, titulo_filme, tipo_sala, data_hora, poltrona, id_cliente)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *;
    `;

    const values = [
      data.preco,
      data.status || "Concluído",
      data.filme_id,
      data.titulo_filme,
      data.tipo_sala,
      data.data_hora,
      data.poltrona,
      data.id_cliente || null,
    ];

    const result = await database.query(sql, values);
    return result.rows[0];
  }

  // deleta ingresso por id (id_ingresso)
  static async deletar(id: number): Promise<boolean> {
    const sql = "DELETE FROM ingresso WHERE id = $1";
    const result = await database.query(sql, [id]);
    return (result.rowCount ?? 0) > 0;
  }
}
