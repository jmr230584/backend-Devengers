// Importa os tipos Request e Response da biblioteca 'express', usados para tipar as requisições e respostas na API.
import { Request, Response } from "express";  

// Importa o modelo 'Sessao', que provavelmente contém métodos e propriedades relacionadas às sessões.
import { Sessao } from "../model/Sessao";  

interface SessaoDTO{
    idFilme: number;
    idSala: number;
    dataHoraInicio: string;
    dataHoraFim: string;
}

// Declara a classe 'SessaoController', que herda de 'Sessao', permitindo acesso aos métodos e propriedades da classe 'Sessao'.
export class SessaoController extends Sessao {  
    // Define o método estático 'todos', que é assíncrono e recebe os parâmetros 'req' (requisição) e 'res' (resposta).
    static async todos(req: Request, res: Response): Promise<any> {  
        // Inicia um bloco 'try', que vai tentar executar o código dentro dele e tratar possíveis erros.
        try {  
            // Chama o método 'listarSessoes' da classe 'Sessao' para obter a lista de sessões de forma assíncrona.
            const listaDeSessoes = await Sessao.listarSessoes();  

            // Retorna uma resposta com status HTTP 200 (OK) e envia a lista de sessões como resposta no formato JSON.
            return res.status(200).json(listaDeSessoes);  
        // Se ocorrer algum erro dentro do bloco 'try', o código irá para o bloco 'catch'.
        } catch (error) {  
            // Exibe o erro no console para fins de depuração.
            console.log("Erro ao listar sessões:", error);  
            // Retorna uma resposta com status HTTP 400 (Bad Request) e uma mensagem de erro no formato JSON.
            return res.status(400).json({ mensagem: "Não foi possível listar as sessões." });  
        }
    }
}
