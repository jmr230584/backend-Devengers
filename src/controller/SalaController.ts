// Importa os tipos Request e Response da biblioteca 'express', usados para tipar as requisições e respostas na API.
import { Request, Response } from "express";  

// Importa o modelo 'Sala', que provavelmente contém métodos e propriedades relacionadas às salas.
import { Sala } from "../model/Sala"; 

interface SalaDTO{
    numeroSala: number;
    tipoSala: string;
    numeroAssento: number;
    fileira: number;
}

// Declara a classe 'SalaController', que herda de 'Sala', permitindo acesso aos métodos e propriedades da classe 'Sala'.
export class SalaController extends Sala {  
    // Define o método estático 'todos', que é assíncrono e recebe os parâmetros 'req' (requisição) e 'res' (resposta).
    static async todos(req: Request, res: Response): Promise<any> {  
        // Inicia um bloco 'try', que vai tentar executar o código dentro dele e tratar possíveis erros.
        try {  
            // Chama o método 'listarSalas' da classe 'Sala' para obter a lista de salas de forma assíncrona.
            const lista = await Sala.listarSalas();  

            // Retorna uma resposta com status HTTP 200 (OK) e envia a lista de salas como resposta no formato JSON.
            return res.status(200).json(lista);  
        // Se ocorrer algum erro dentro do bloco 'try', o código irá para o bloco 'catch'.
        } catch (error) {  
            // Exibe o erro no console para fins de depuração.
            console.log("Erro ao listar salas:", error);  
            // Retorna uma resposta com status HTTP 400 (Bad Request) e uma mensagem de erro no formato JSON.
            return res.status(400).json({ mensagem: "Não foi possível listar as salas." });  
        }
    }

    static async cadastrar(req: Request, res: Response): Promise<any> {
        try {
            // Desestruturando objeto recebido do front-end
            const dadosRecebidos: SalaDTO = req.body;
    
            // Instanciando objeto Sala
            const novaSala = new Sala(
                dadosRecebidos.numeroSala,
                dadosRecebidos.tipoSala,
                dadosRecebidos.numeroAssento,
                dadosRecebidos.fileira
            );
    
            // Chama o método de persistência no banco
            const result = await Sala.cadastrarSala(novaSala);
    
            // Verifica o resultado da operação
            if (result) {
                return res.status(200).json('Sala cadastrada com sucesso');
            } else {
                return res.status(400).json('Não foi possível cadastrar a sala no banco de dados');
            }
        } catch (error) {
            console.error(`Erro ao cadastrar a sala: ${error}`);
            return res.status(400).json('Erro ao cadastrar a sala');
        }
    }
}
