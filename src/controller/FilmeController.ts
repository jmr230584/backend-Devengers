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
    
     /**
     * Cadastra um novo aluno.
     * @param req Objeto de requisição HTTP com os dados do aluno.
     * @param res Objeto de resposta HTTP.
     * @returns Mensagem de sucesso ou erro em formato JSON.
     */

     static async cadastrar(req: Request, res: Response): Promise<any> {
        try {
            // Desestruturando objeto recebido do front-end
            const dadosRecebidos: FilmeDTO = req.body;
    
            // Instanciando objeto Filme
            const novoFilme = new Filme(
                dadosRecebidos.titulo,
                dadosRecebidos.sinopse,
                dadosRecebidos.duracao,
                dadosRecebidos.classificacaoEtaria,
                dadosRecebidos.genero,
                dadosRecebidos.anoLancamento,
                dadosRecebidos.posterFilme,
                dadosRecebidos.disponibilidade
            );
    
            // Chama o método de persistência no banco
            const result = await Filme.cadastrarFilme(novoFilme);
    
            // Verifica o resultado da operação
            if (result) {
                return res.status(200).json('Filme cadastrado com sucesso');
            } else {
                return res.status(400).json('Não foi possível cadastrar o filme no banco de dados');
            }
        } catch (error) {
            console.error(`Erro ao cadastrar o filme: ${error}`);
            return res.status(400).json('Erro ao cadastrar o filme');
        }
    }
    
      /**
         * Método para atualizar o cadastro de um filme.
         * 
         * @param req Objeto de requisição do Express, contendo os dados atualizados do filme
         * @param res Objeto de resposta do Express
         * @returns Retorna uma resposta HTTP indicando sucesso ou falha na atualização
         */
            static async atualizar(req: Request, res: Response): Promise<any> {
                try {
                    // Desestruturando objeto recebido pelo front-end
                    const dadosRecebidos: FilmeDTO = req.body;
                    
                    // Instanciando objeto Filme
                    const filme = new Filme(
                        dadosRecebidos.titulo,
                        dadosRecebidos.sinopse,
                        dadosRecebidos.duracao,
                        dadosRecebidos.classificacaoEtaria,
                        dadosRecebidos.genero,
                        dadosRecebidos.anoLancamento,
                        dadosRecebidos.posterFilme,
                        dadosRecebidos.disponibilidade  
                    );
        
                    // Define o ID do Filme, que deve ser passado na query string
                    filme.setIdFilme(parseInt(req.query.idFilme as string));
        
                    // Chama o método para atualizar o cadastro do Filme no banco de dados
                    if (await Filme.atualizarFilme(filme)) {
                        return res.status(200).json({ mensagem: "Cadastro atualizado com sucesso!" });
                    } else {
                        return res.status(400).json('Não foi possível atualizar o Filme no banco de dados');
                    }
                } catch (error) {
                    // Caso ocorra algum erro, este é registrado nos logs do servidor
                    console.error(`Erro no modelo: ${error}`);
                    // Retorna uma resposta com uma mensagem de erro
                    return res.json({ mensagem: "Erro ao atualizar Filme." });
                }
            }


}
