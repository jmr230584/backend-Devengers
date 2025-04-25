// Importa os tipos Request e Response da biblioteca 'express', usados para tipar as requisições e respostas na API.
import { Request, Response } from "express";  

// Importa o modelo 'Filme', que provavelmente contém métodos e propriedades relacionadas aos filmes.
import { Filme } from "../model/Filme";  

// Declara a classe 'FilmeController', que herda de 'Filme', permitindo acesso aos métodos e propriedades da classe 'Filme'.
export class FilmeController extends Filme {  
    // Define o método estático 'todos', que é assíncrono e recebe os parâmetros 'req' (requisição) e 'res' (resposta).
    static async todos(req: Request, res: Response): Promise<any> {  
        // Inicia um bloco 'try', que vai tentar executar o código dentro dele e tratar possíveis erros.
        try {  
            // Chama o método 'listarFilmes' da classe 'Filme' para obter a lista de filmes de forma assíncrona.
            const lista = await Filme.listarFilmes();  

            // Verifica se a lista de filmes foi retornada com sucesso (não é null ou undefined).
            if (lista) {  
                // Retorna uma resposta com status HTTP 200 (OK) e envia a lista de filmes como resposta no formato JSON.
                return res.status(200).json(lista);  
            } else {  
                // Se a lista de filmes for nula ou indefinida, executa o bloco abaixo.
                // Retorna uma resposta com status HTTP 400 (Bad Request) e uma mensagem de erro no formato JSON.
                return res.status(400).json({ mensagem: "Erro ao buscar filmes." });  
            }
        // Se ocorrer algum erro dentro do bloco 'try', o código irá para o bloco 'catch'.
        } catch (error) {  
            // Exibe o erro no console para fins de depuração.
            console.log("Erro na controller de Filme:", error);  
            // Retorna uma resposta com status HTTP 400 (Bad Request) e uma mensagem de erro no formato JSON.
            return res.status(400).json({ mensagem: "Falha ao listar filmes." });  
        }
    }
}
