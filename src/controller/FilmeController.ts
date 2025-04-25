// Importa os tipos Request e Response da biblioteca 'express', para tipar as requisições e respostas.
import { Request, Response } from "express";

// Importa a classe 'Filme' do modelo, para usá-la na controller.
import { Filme } from "../model/Filme";

interface FilmeDTO{
    titulo: string;
    sinopse: string;
    duracao: string;
    classificacaoEtaria: string;
    genero: string;
    anoLancamento: number;
    posterFilme: string;
    disponibilidade: string;
}

export class FilmeController extends Filme {
    // Método estático para listar todos os filmes da base de dados.
    static async todos(req: Request, res: Response): Promise<any> {
        try {
            // Chama o método estático 'listarFilmes' da classe 'Filme' para obter a lista de filmes.
            const listaDeFilmes = await Filme.listarFilmes();
                return res.status(200).json(listaDeFilmes);
        } catch (error) {
            console.log("Erro na controller de Filme:", error); // Exibe o erro no console para depuração.
            // Retorna um erro com status HTTP 400 e uma mensagem de erro no formato JSON.
            return res.status(400).json({ mensagem: "Falha ao listar filmes." });
        }
    }
}
