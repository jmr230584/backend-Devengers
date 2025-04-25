import { Request, Response } from "express";
import { Filme } from "../model/Filme";

export class FilmeController extends Filme {
    static async todos(req: Request, res: Response): Promise<any> {
        try {
            const lista = await Filme.listarFilmes();

            if (lista) {
                return res.status(200).json(lista);
            } else {
                return res.status(400).json({ mensagem: "Erro ao buscar filmes." });
            }
        } catch (error) {
            console.log("Erro na controller de Filme:", error);
            return res.status(400).json({ mensagem: "Falha ao listar filmes." });
        }
    }
}
