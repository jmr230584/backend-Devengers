import { Express, Request, Response, Router } from "express";
import { FilmeController } from "./controller/FilmeController";
import { SalaController } from "./controller/SalaController";
import { SessaoController } from "./controller/SessaoController";
import { ClienteController } from "./controller/ClienteController";
import { IngressoController } from "./controller/IngressoController";

// Instância do roteador
const router = Router();

/**
 * Rota padrão (pode ser usada para teste de status do servidor)
 */
router.get("/", (req: Request, res: Response) => {
    res.json({ mensagem: "Servidor do cinema rodando" });
});

/**
 * ROTAS PARA FILME
 */
router.get("/lista/filmes", FilmeController.todos);

/**
 *  ROTAS PARA SALA
 */
router.get("/lista/salas", SalaController.todos);

/**
 *  ROTAS PARA SESSAO
 */
router.get("/lista/sessoes", SessaoController.todos);

/**
 *  ROTAS PARA CLIENTE
 */
router.get("/lista/clientes", ClienteController.todos);

/**
 * ROTAS PARA INGRESSO
 */
router.get("/lista/ingressos", IngressoController.todos);

/**
 * Exporta o roteador
 */
export { router };
