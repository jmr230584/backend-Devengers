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

    static async cadastrar(req: Request, res: Response): Promise<any> {
        try {
            // Desestruturando objeto recebido do front-end
            const dadosRecebidos: IngressoDTO = req.body;
    
            // Instanciando objeto Ingresso
            const novoIngresso = new Ingresso(
                dadosRecebidos.idSessao,
                dadosRecebidos.idCliente,
                dadosRecebidos.statusIngresso,
                dadosRecebidos.precoIngresso
            );
    
            // Chama o método de persistência no banco
            const result = await Ingresso.cadastrarIngresso(novoIngresso);
    
            // Verifica o resultado da operação
            if (result) {
                return res.status(200).json('Ingresso cadastrado com sucesso');
            } else {
                return res.status(400).json('Não foi possível cadastrar o ingresso no banco de dados');
            }
        } catch (error) {
            console.error(`Erro ao cadastrar o ingresso: ${error}`);
            return res.status(400).json('Erro ao cadastrar o ingresso');
        }
    }
    
    static async atualizar(req: Request, res: Response): Promise<any> {
    try {
        // Desestruturando o objeto recebido do front-end
        const dadosRecebidos: IngressoDTO = req.body;

        // Instanciando o objeto Ingresso
        const ingresso = new Ingresso(
            dadosRecebidos.idSessao,
            dadosRecebidos.idCliente,
            dadosRecebidos.statusIngresso,
            dadosRecebidos.precoIngresso
        );

        // Define o ID do Ingresso, passado via query string
        ingresso.setIdIngresso(parseInt(req.query.idIngresso as string));

        // Chama o método para atualizar o ingresso no banco de dados
        if (await Ingresso.atualizarIngresso(ingresso)) {
            return res.status(200).json({ mensagem: "Ingresso atualizado com sucesso!" });
        } else {
            return res.status(400).json({ mensagem: "Não foi possível atualizar o Ingresso no banco de dados." });
        }
    } catch (error) {
        // Caso ocorra algum erro, este é registrado nos logs do servidor
        console.error(`Erro ao atualizar Ingresso: ${error}`);
        return res.status(500).json({ mensagem: "Erro ao atualizar Ingresso." });
    }
}



      /**
         * Método para atualizar o cadastro de um ingresso.
         * 
         * @param req Objeto de requisição do Express, contendo os dados atualizados do ingresso
         * @param res Objeto de resposta do Express
         * @returns Retorna uma resposta HTTP indicando sucesso ou falha na atualização
         */
            static async atualizar(req: Request, res: Response): Promise<any> {
                try {
                    // Desestruturando objeto recebido pelo front-end
                    const dadosRecebidos: IngressoDTO = req.body;
                    
                    // Instanciando objeto Ingresso
                    const ingresso = new Ingresso(
                        dadosRecebidos.idSessao,
                        dadosRecebidos.idCliente,
                        dadosRecebidos.statusIngresso,
                        dadosRecebidos.precoIngresso              
                    );
        
                    // Define o ID do Ingresso, que deve ser passado na query string
                    ingresso.setIdIngresso(parseInt(req.query.idIngresso as string));
        
                    // Chama o método para atualizar o cadastro do ingresso no banco de dados
                    if (await Ingresso.atualizarIngresso(ingresso)) {
                        return res.status(200).json({ mensagem: "Cadastro atualizado com sucesso!" });
                    } else {
                        return res.status(400).json('Não foi possível atualizar o Ingresso no banco de dados');
                    }
                } catch (error) {
                    // Caso ocorra algum erro, este é registrado nos logs do servidor
                    console.error(`Erro no modelo: ${error}`);
                    // Retorna uma resposta com uma mensagem de erro
                    return res.json({ mensagem: "Erro ao atualizar Ingresso." });
                }
            }



}

//
