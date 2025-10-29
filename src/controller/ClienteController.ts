import { Request, Response } from "express";  
import { Cliente } from "../model/Cliente";  
import path from "path";
import fs from "fs";

interface ClienteDTO {
    nomeCompleto: string;
    email: string;
    senha: string;
    cpf: string;
    celular: string;
}

export class ClienteController extends Cliente {  

    static async todos(req: Request, res: Response): Promise<any> {  
        try {  
            const listaDeClientes = await Cliente.listarClientes();  
            return res.status(200).json(listaDeClientes);  
        } catch (error) {  
            console.log("Erro ao listar clientes:", error);  
            return res.status(400).json({ mensagem: "Não foi possível listar os clientes." });  
        }
    }

    static async cadastrar(req: Request, res: Response): Promise<any> {
        try {
            console.log(req.body);
            const dadosRecebidos: ClienteDTO = req.body;
            
            const novoCliente = new Cliente(
                dadosRecebidos.nomeCompleto,
                dadosRecebidos.email,
                dadosRecebidos.senha,
                dadosRecebidos.cpf,
                dadosRecebidos.celular
            );

            console.log("Dados do novo cliente:", novoCliente);
            console.log("Arquivo recebido:", req.file);

            // Caso tenha recebido uma imagem do multer
            if (req.file) {
                const ext = path.extname(req.file.originalname); 
                const novoNome = `${Date.now()}${ext}`; 
                const antigoPath = req.file.path; 
                const novoPath = path.resolve(req.file.destination, novoNome); 

                fs.renameSync(antigoPath, novoPath); 

                // Gera a URL pública da imagem
                const urlImagem = `${req.protocol}://${req.get("host")}/uploads/${novoNome}`;
                novoCliente.setImagemPerfil(urlImagem);
            }

            const cadastrado = await Cliente.cadastrarCliente(novoCliente);

            if (!cadastrado) {
                return res.status(500).json({ erro: "Erro ao cadastrar cliente" });
            }

            return res.status(201).json({ mensagem: "Cliente cadastrado com sucesso" });
        } catch (error) {
            console.error("Erro ao cadastrar cliente:", error);
            res.status(500).json({ erro: "Erro ao cadastrar cliente", detalhes: error });
        }
    }

    static async atualizar(req: Request, res: Response): Promise<any> {
        try {
            const dadosRecebidos: ClienteDTO = req.body;
            
            const cliente = new Cliente(
                dadosRecebidos.nomeCompleto,
                dadosRecebidos.email,
                dadosRecebidos.senha,
                dadosRecebidos.cpf,
                dadosRecebidos.celular              
            );
    
            cliente.setIdCliente(parseInt(req.query.idCliente as string));

            if (req.file) {
                const ext = path.extname(req.file.originalname); 
                const novoNome = `${cliente.getIdCliente()}${ext}`; 
                const antigoPath = req.file.path; 
                const novoPath = path.resolve(req.file.destination, novoNome); 

                fs.renameSync(antigoPath, novoPath); 

                // Gera a URL pública da imagem
                const urlImagem = `${req.protocol}://${req.get("host")}/uploads/${novoNome}`;
                cliente.setImagemPerfil(urlImagem);
            }
    
            if (await Cliente.atualizarCliente(cliente)) {
                return res.status(200).json({ mensagem: "Cliente atualizado com sucesso!" });
            } else {
                return res.status(400).json("Não foi possível atualizar o Cliente no banco de dados");
            }
        } catch (error) {
            console.error("Erro no modelo:", error);
            return res.status(500).json({ mensagem: "Erro ao atualizar Cliente." });
        }
    }

    static async deletar (req: Request, res: Response) : Promise<any>{
        try {
            const idCliente = parseInt(req.query.idCliente as string);
      
            if (isNaN(idCliente)) {
              return res.status(400).json("ID inválido");
            }
      
            const resultado = await Cliente.deletarCliente(idCliente);
      
            if (resultado) {
              return res.status(200).json("Cliente deletado com sucesso");
            } else {
              return res.status(404).json("Cliente não encontrado");
            }
        } catch (error) {
            console.error("Erro ao deletar cliente:", error);
            return res.status(500).json("Erro no servidor ao deletar cliente");
        }
    }
}
