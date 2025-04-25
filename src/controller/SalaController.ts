import { Request, Response } from "express";
import { Sala } from "../model/Sala";

export class SalaController extends Sala {
    static async todos(req: Request, res: Response): Promise<any> {
        try {
            const lista = await Sala.listarSalas();
            return res.status(200).json(lista);
        } catch (error) {
            console.log("Erro ao listar salas:", error);
            return res.status(400).json({ mensagem: "Não foi possível listar as salas." });
        }
    }
}
