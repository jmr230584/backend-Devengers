// Importa os tipos Request e Response da biblioteca 'express', usados para tipar as requisições e respostas na API.
import { Request, Response } from "express";  

// Importa o modelo 'Ingresso', que provavelmente contém métodos e propriedades relacionadas aos ingressos.
import { Ingresso } from "../model/Ingresso";  

interface IngressoDTO{
    idSessao: number;
    idCliente: number;
    statusIngresso: string;
    precoIngresso: number;
}

// Declara a classe 'IngressoController', que herda de 'Ingresso', permitindo acesso aos métodos e propriedades da classe 'Ingresso'.
export class IngressoController extends Ingresso {  
    // Define o método estático 'todos', que é assíncrono e recebe os parâmetros 'req' (requisição) e 'res' (resposta).
    static async todos(req: Request, res: Response): Promise<any> {  
        // Inicia um bloco 'try', que vai tentar executar o código dentro dele e tratar possíveis erros.
        try {  
            // Chama o método 'listarIngressos' da classe 'Ingresso' para obter a lista de ingressos de forma assíncrona.
            const listaDeIngressos = await Ingresso.listarIngressos();  

            // Retorna uma resposta com status HTTP 200 (OK) e envia a lista de ingressos como resposta no formato JSON.
            return res.status(200).json(listaDeIngressos);  
        // Se ocorrer algum erro dentro do bloco 'try', o código irá para o bloco 'catch'.
        } catch (error) {  
            // Exibe o erro no console para fins de depuração.
            console.log("Erro ao listar ingressos:", error);  
            // Retorna uma resposta com status HTTP 400 (Bad Request) e uma mensagem de erro no formato JSON.
            return res.status(400).json({ mensagem: "Não foi possível listar os ingressos." });  
        }
    }
}
