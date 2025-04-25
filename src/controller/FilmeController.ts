// Importa os tipos Request e Response da biblioteca 'express', para tipar as requisições e respostas.
import { Request, Response } from "express";

// Importa a classe 'Filme' do modelo, para usá-la na controller.
import { Filme } from "../model/Filme";

export class FilmeController extends Filme {
    // Método estático para listar todos os filmes da base de dados.
    static async todos(req: Request, res: Response): Promise<any> {
        try {
            // Chama o método estático 'listarFilmes' da classe 'Filme' para obter a lista de filmes.
            const lista = await Filme.listarFilmes();

            // Verifica se a lista de filmes foi retornada com sucesso.
            if (lista) {
                // Se a lista não for vazia, converte cada objeto 'Filme' para um objeto JSON usando o método 'toJSON'.
                const listaJSON = lista.map(filme => filme.toJSON());

                // Retorna a lista de filmes no formato JSON com status HTTP 200 (OK).
                return res.status(200).json(listaJSON);
            } else {
                // Se a lista estiver vazia ou houver algum erro, retorna um erro com status 400 (Bad Request).
                return res.status(400).json({ mensagem: "Erro ao buscar filmes." });
            }
        } catch (error) {
            console.log("Erro na controller de Filme:", error); // Exibe o erro no console para depuração.
            // Retorna um erro com status HTTP 400 e uma mensagem de erro no formato JSON.
            return res.status(400).json({ mensagem: "Falha ao listar filmes." });
        }
    }
    
}
