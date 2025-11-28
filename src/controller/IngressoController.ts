import { Request, Response } from "express";
import { Pool } from "pg";
import IngressoModel, { IngressoDTO as ModelDTO } from "../model/Ingresso";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : undefined,
});

// Controller usando o model quando apropriado
export class IngressoController {
  // GET /lista/ingressos
  static async todos(req: Request, res: Response): Promise<any> {
    try {
      const rows = await IngressoModel.todos();
      return res.status(200).json(rows);
    } catch (error) {
      console.error("Erro ao listar ingressos:", error);
      return res.status(500).json({ mensagem: "Erro ao listar ingressos." });
    }
  }

  // POST /cadastro/ingresso  (recebe dados da UI e grava)
  static async cadastrar(req: Request, res: Response): Promise<any> {
    try {
      // espera keys: preco, filme_id, titulo_filme, tipo_sala, data_hora, poltrona, (status opcional)
      const data: ModelDTO = req.body;

      // validação básica
      if (!data.preco || !data.titulo_filme || !data.tipo_sala || !data.data_hora || !data.poltrona) {
        return res.status(400).json({ mensagem: "Campos obrigatórios faltando." });
      }

      const row = await IngressoModel.cadastrar(data);
      return res.status(201).json({ mensagem: "Ingresso cadastrado com sucesso!", ingresso: row });
    } catch (error) {
      console.error("Erro ao cadastrar ingresso:", error);
      return res.status(500).json({ mensagem: "Erro ao cadastrar ingresso." });
    }
  }

  // DELETE /deletar/ingresso?idIngresso=...
  static async deletar(req: Request, res: Response): Promise<any> {
    try {
      const idIngresso = parseInt((req.query.idIngresso as string) || "");
      if (isNaN(idIngresso)) return res.status(400).json({ mensagem: "ID inválido." });

      const ok = await IngressoModel.deletar(idIngresso);
      if (ok) return res.status(200).json({ mensagem: "Ingresso deletado com sucesso!" });

      return res.status(404).json({ mensagem: "Ingresso não encontrado." });
    } catch (error) {
      console.error("Erro ao deletar ingresso:", error);
      return res.status(500).json({ mensagem: "Erro no servidor ao deletar ingresso." });
    }
  }
}
