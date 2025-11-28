// Importa os tipos Request e Response da biblioteca 'express', usados para tipar as requisições e respostas na API.
import { Request, Response } from "express";  

// Importa o modelo 'Sessao', que provavelmente contém métodos e propriedades relacionadas às sessões.
import { Sessao } from "../model/Sessao";  

interface SessaoDTO{
    idFilme: number;
    idSala: number;
    dataHoraInicio: Date;
    dataHoraFim: Date;
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
    static async cadastrar(req: Request, res: Response): Promise<any> {
        try {
            // Desestruturando objeto recebido do front-end
            const dadosRecebidos: SessaoDTO = req.body;
    
            // Instanciando objeto Sessao
            const novaSessao = new Sessao(
                dadosRecebidos.idFilme,
                dadosRecebidos.idSala,
                dadosRecebidos.dataHoraInicio,
                dadosRecebidos.dataHoraFim
            );
    
            // Chama o método de persistência no banco
            const result = await Sessao.cadastrarSessao(novaSessao);
    
            // Verifica o resultado da operação
            if (result) {
                return res.status(200).json('Sessão cadastrada com sucesso');
            } else {
                return res.status(400).json('Não foi possível cadastrar a sessão no banco de dados');
            }
        } catch (error) {
            console.error(`Erro ao cadastrar a sessão: ${error}`);
            return res.status(400).json('Erro ao cadastrar a sessão');
            }
    }

    static async atualizar(req: Request, res: Response): Promise<any> {
      try {
          // Desestruturando o objeto recebido do front-end
          const dadosRecebidos: SessaoDTO = req.body;
  
          // Instanciando o objeto Sessao
          const sessao = new Sessao(
              dadosRecebidos.idFilme,
              dadosRecebidos.idSala,
              dadosRecebidos.dataHoraInicio,
              dadosRecebidos.dataHoraFim
          );
  
          // Define o ID da Sessao, passado via query string
          sessao.setIdSessao(parseInt(req.query.idSessao as string));
  
          // Chama o método para atualizar a sessão no banco de dados
          if (await Sessao.atualizarSessao(sessao)) {
              return res.status(200).json({ mensagem: "Sessão atualizada com sucesso!" });
          } else {
              return res.status(400).json({ mensagem: "Não foi possível atualizar a Sessão no banco de dados." });
          }
      } catch (error) {
          console.error(`Erro ao atualizar Sessão: ${error}`);
          return res.status(500).json({ mensagem: "Erro ao atualizar Sessão." });
      }
  }
    
    static async deletar(req: Request, res: any) {
        try {
          const idSessao = parseInt(req.query.idSessao as string);
    
          if (isNaN(idSessao)) {
            return res.status(400).json("ID inválido");
          }
    
          const resultado = await Sessao.deletarSessao(idSessao);
    
          if (resultado) {
            return res.status(200).json("Sessão deletada com sucesso");
          } else {
            return res.status(404).json(resultado);
          }
        } catch (error) {
          console.error("Erro ao deletar sessão:", error);
          return res.status(500).json("Erro no servidor ao deletar sessão");
        }
}
}
//
