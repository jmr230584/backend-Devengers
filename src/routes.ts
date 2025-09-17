// Importa os módulos necessários do 'express', incluindo o tipo 'Express', 'Request', 'Response', e 'Router'.
// Importa também os controladores de cada recurso (Filme, Sala, Sessao, Cliente, Ingresso).
import { Request, Response, Router } from "express";  
import { FilmeController } from "./controller/FilmeController";  
import { SalaController } from "./controller/SalaController";  
import { SessaoController } from "./controller/SessaoController";  
import { ClienteController } from "./controller/ClienteController";  
import { IngressoController } from "./controller/IngressoController";  
import { SERVER_ROUTES } from "./appConfig";
import { Auth } from "./utils/Auth";
import upload from "./config/multerConfig"; // caminho pode variar dependendo da estrutura


import swaggerUi from 'swagger-ui-express';
import swaggerOutput from "../docs/swagger_doc.json"

// Cria uma instância do roteador para definir as rotas da API.
const router = Router();  

/**
 * Rota padrão (pode ser usada para teste de status do servidor)
 * Quando acessada via GET, retorna uma mensagem indicando que o servidor está funcionando.
 */
router.get("/", (req: Request, res: Response) => {  
    res.json({ mensagem: "Servidor do cinema rodando" });  
});  

router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerOutput)); // Rota para acessar a documentação 

/**
 * ROTAS PARA FILME
 * Define a rota para listar todos os filmes. Quando acessada via GET, chama o método 'todos' do FilmeController.
 */
router.get(SERVER_ROUTES.LISTAR_FILME, FilmeController.todos);  
router.post(SERVER_ROUTES.CADASTRAR_FILME, FilmeController.cadastrar);
router.delete(SERVER_ROUTES.DELETAR_FILME, FilmeController.deletar);
router.put(SERVER_ROUTES.ATUALIZAR_FILME, FilmeController.atualizar);


/**
 *  ROTAS PARA SALA
 * Define a rota para listar todas as salas. Quando acessada via GET, chama o método 'todos' do SalaController.
 */
router.get(SERVER_ROUTES.LISTAR_SALA, SalaController.todos);  
router.post(SERVER_ROUTES.CADASTRAR_SALA, SalaController.cadastrar);
router.delete(SERVER_ROUTES.DELETAR_SALA, SalaController.deletar);
router.put(SERVER_ROUTES.ATUALIZAR_SALA, SalaController.atualizar);


/**
 *  ROTAS PARA SESSAO
 * Define a rota para listar todas as sessões. Quando acessada via GET, chama o método 'todos' do SessaoController.
 */
router.get(SERVER_ROUTES.LISTAR_SESSAO, SessaoController.todos);  
router.post(SERVER_ROUTES.CADASTRAR_SESSAO, SessaoController.cadastrar);
router.delete(SERVER_ROUTES.DELETAR_SESSAO, SessaoController.deletar);
router.put(SERVER_ROUTES.ATUALIZAR_SESSAO, SessaoController.atualizar);


/**
 *  ROTAS PARA CLIENTE
 * Define a rota para listar todos os clientes. Quando acessada via GET, chama o método 'todos' do ClienteController.
 */
router.get(SERVER_ROUTES.LISTAR_CLIENTES, ClienteController.todos);  
// router.post(SERVER_ROUTES.CADASTRAR_CLIENTE, ClienteController.cadastrar);
router.delete(SERVER_ROUTES.DELETAR_CLIENTE, ClienteController.deletar);
router.put(SERVER_ROUTES.ATUALIZAR_CLIENTE, ClienteController.atualizar);
router.post('/login', Auth.validacaoCliente);
router.get('/rota-protegida', Auth.verifyToken, (req, res) => { res.send('Rota protegida, se você está vendo essa mensagem é porque está autenticado no sistema') });

/**
 * ROTAS PARA INGRESSO
 * Define a rota para listar todos os ingressos. Quando acessada via GET, chama o método 'todos' do IngressoController.
 */
router.get(SERVER_ROUTES.LISTAR_INGRESSO, IngressoController.todos);  
router.post(SERVER_ROUTES.CADASTRAR_INGRESSO, IngressoController.cadastrar);
router.delete(SERVER_ROUTES.DELETAR_INGRESSO, IngressoController.deletar);
router.put(SERVER_ROUTES.ATUALIZAR_INGRESSO, IngressoController.atualizar);

// Cadastro de Usuário com Upload de Imagem de Perfil
router.post(SERVER_ROUTES.CADASTRAR_CLIENTE, upload.single('imagemPerfil'), ClienteController.cadastrar);

/**
 * Exporta o roteador para ser usado em outras partes da aplicação.
 */
export { router };   

//