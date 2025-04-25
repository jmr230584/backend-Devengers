import { Request, Response } from "express";
import { Cliente } from "../model/Cliente";

export class ClienteController extends Cliente {
    static async todos(req: Request, res: Response): Promise<any> {
        try {
            const lista = await Cliente.listarClientes();
            return res.status(200).json(lista);
        } catch (error) {
            console.log("Erro ao listar clientes:", error);
            return res.status(400).json({ mensagem: "Não foi possível listar os clientes." });
        }
    }
}
