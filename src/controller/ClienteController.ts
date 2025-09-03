// Importa os tipos Request e Response da biblioteca 'express', usados para tipar as requisições e respostas na API.
import { Request, Response } from "express";  

// Importa o modelo 'Cliente', que provavelmente contém métodos e propriedades relacionadas aos clientes.
import { Cliente } from "../model/Cliente";  

// DTO do Cliente
interface ClienteDTO {
    nomeCompleto: string;
    email: string;
    senha: string;
    cpf: string;   // ALTERADO para string
    celular: string;
}

// Declara a classe 'ClienteController', que herda de 'Cliente', permitindo acesso aos métodos e propriedades da classe 'Cliente'.
export class ClienteController extends Cliente {  
    static async todos(req: Request, res: Response): Promise<any> {  
        try {  
            const listaDeClientes = await Cliente.listarClientes();  
            return res.status(200).json(listaDeClientes);  
        // Se ocorrer algum erro dentro do bloco 'try', o código irá para o bloco 'catch'.
        } catch (error) {  
            console.log("Erro ao listar clientes:", error);  
            return res.status(400).json({ mensagem: "Não foi possível listar os clientes." });  
        }
    }

    static async cadastrar(req: Request, res: Response): Promise<any> {
        try {
            const dadosRecebidos: ClienteDTO = req.body;
            
            const novoCliente = new Cliente(
                dadosRecebidos.nomeCompleto,
                dadosRecebidos.email,
                dadosRecebidos.senha,
                dadosRecebidos.cpf,     // string
                dadosRecebidos.celular
            );

            const result = await Cliente.cadastrarCliente(novoCliente);
    
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

    static async atualizar(req: Request, res: Response): Promise<any> {
        try {
            const dadosRecebidos: ClienteDTO = req.body;
            
            const cliente = new Cliente(
                dadosRecebidos.nomeCompleto,
                dadosRecebidos.email,
                dadosRecebidos.senha,
                dadosRecebidos.cpf,   // string
                dadosRecebidos.celular              
            );
    
            cliente.setIdCliente(parseInt(req.query.idCliente as string));

            console.log(dadosRecebidos);
    
            if (await Cliente.atualizarCliente(cliente)) {
                return res.status(200).json({ mensagem: "Cadastro atualizado com sucesso!" });
            } else {
                return res.status(400).json('Não foi possível atualizar o Cliente no banco de dados');
            }
        } catch (error) {
            console.error(`Erro no modelo: ${error}`);
            return res.json({ mensagem: "Erro ao atualizar Cliente." });
        }
    }

    static async deletar(req: Request, res: any) {
        try {
            const idCliente = parseInt(req.query.idCliente as string);
      
            if (isNaN(idCliente)) {
              return res.status(400).json("ID inválido");
            }
      
            const resultado = await Cliente.deletarCliente(idCliente);
      
            if (resultado) {
              return res.status(200).json("Cliente deletado com sucesso");
            } else {
              return res.status(404).json(resultado);
            }
        } catch (error) {
            console.error("Erro ao deletar cliente:", error);
            return res.status(500).json("Erro no servidor ao deletar cliente");
        }
    }
}


