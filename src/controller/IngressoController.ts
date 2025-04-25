import { Request, Response } from "express";
import { Ingresso } from "../model/Ingresso";

export class IngressoController extends Ingresso {
    static async todos(req: Request, res: Response): Promise<any> {
        try {
            const lista = await Ingresso.listarIngressos();
            return res.status(200).json(lista);
        } catch (error) {
            console.log("Erro ao listar ingressos:", error);
            return res.status(400).json({ mensagem: "Não foi possível listar os ingressos." });
        }
    }
}
