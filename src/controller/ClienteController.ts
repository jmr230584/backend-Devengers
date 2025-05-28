// Importa os tipos Request e Response da biblioteca 'express', usados para tipar as requisições e respostas na API.
import { Request, Response } from "express";  

// Importa o modelo 'Cliente', que provavelmente contém métodos e propriedades relacionadas aos clientes.
import { Cliente } from "../model/Cliente";  

interface ClienteDTO{
    nomeCompleto: string;
    email: string;
    senha: string;
    cpf: number;
    celular: string
}

// Declara a classe 'ClienteController', que herda de 'Cliente', permitindo acesso aos métodos e propriedades da classe 'Cliente'.
export class ClienteController extends Cliente {  
    // Define o método estático 'todos', que é assíncrono e recebe os parâmetros 'req' (requisição) e 'res' (resposta).
    static async todos(req: Request, res: Response): Promise<any> {  
        // Inicia um bloco 'try', que vai tentar executar o código dentro dele e tratar possíveis erros.
        try {  
            // Chama o método 'listarClientes' da classe 'Cliente' para obter a lista de clientes de forma assíncrona.
            const listaDeClientes = await Cliente.listarClientes();  

            // Retorna uma resposta com status HTTP 200 (OK) e envia a lista de clientes como resposta no formato JSON.
            return res.status(200).json(listaDeClientes);  
        // Se ocorrer algum erro dentro do bloco 'try', o código irá para o bloco 'catch'.
        } catch (error) {  
            // Exibe o erro no console para fins de depuração.
            console.log("Erro ao listar clientes:", error);  
            // Retorna uma resposta com status HTTP 400 (Bad Request) e uma mensagem de erro no formato JSON.
            return res.status(400).json({ mensagem: "Não foi possível listar os clientes." });  
        }
    }

    static async cadastrar(req: Request, res: Response): Promise<any>{
        try {
            // Desestruturando objeto recebido do front-end
            const dadosRecebidos: ClienteDTO = req.body;
            
            // Instanciando objeto Cliente
            const novoCliente = new Cliente(
                dadosRecebidos.nomeCompleto,
                dadosRecebidos.email,
                dadosRecebidos.senha,
                dadosRecebidos.cpf,
                dadosRecebidos.celular
            );

            // Chama o método de persistência no banco
            const result = await Cliente.cadastrarCliente(novoCliente);
    
            // Verifica o resultado da operação
            if (result) {
                return res.status(200).json('Cliente cadastrado com sucesso');
            } else {
                return res.status(400).json('Não foi possível cadastrar o cliente no banco de dados');
            }
        } catch (error) {
            console.error(`Erro ao cadastrar o cliente: ${error}`);
            return res.status(400).json('Erro ao cadastrar o cliente');
        }
    }

}
