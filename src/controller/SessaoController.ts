import { Request, Response } from "express";
import { Sessao } from "../model/Sessao";

export class SessaoController extends Sessao {
    static async todos(req: Request, res: Response): Promise<any> {
        try {
            const lista = await Sessao.listarSessoes();
            return res.status(200).json(lista);
        } catch (error) {
            console.log("Erro ao listar sessões:", error);
            return res.status(400).json({ mensagem: "Não foi possível listar as sessões." });
        }
    }
}
