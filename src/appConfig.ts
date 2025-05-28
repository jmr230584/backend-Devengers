// Define um objeto que contém as rotas da API para os diversos recursos (clientes, ingressos, sessões, filmes e salas).
const SERVER_ROUTES = {  
    // Rota para listar os clientes.
    LISTAR_CLIENTES: '/lista/cliente',  
    // Rota para cadastrar um cliente.
    CADASTRAR_CLIENTE: '/cadastro/cliente',
    //Rota para atualizar um cliente.
    ATUALIZAR_CLIENTE: '/atualizar/cliente',  


    // Rota para listar os ingressos.
    LISTAR_INGRESSO: '/lista/ingressos', 
    // Rota para cadastrar um ingresso.
    CADASTRAR_INGRESSO: '/cadastro/ingresso',   

    // Rota para listar as sessões de cinema.
    LISTAR_SESSAO: '/lista/sessao',  
    // Rota para cadastrar uma sessão de cinema.
    CADASTRAR_SESSAO: '/cadastro/sessao',  

    // Rota para listar os filmes.
    LISTAR_FILME: '/lista/filme',  
    // Rota para cadastrar um filme.
    CADASTRAR_FILME: '/cadastro/filme',

    // Rota para listar as salas de cinema.
    LISTAR_SALA: '/lista/sala',
    // Rota para cadastrar uma sala de cinema.
    CADASTRAR_SALA: '/cadastro/sala'
}

// Exporta o objeto SERVER_ROUTES para que ele possa ser usado em outras partes da aplicação.
export { SERVER_ROUTES }
