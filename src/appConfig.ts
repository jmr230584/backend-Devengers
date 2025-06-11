// Define um objeto que contém as rotas da API para os diversos recursos (clientes, ingressos, sessões, filmes e salas).
const SERVER_ROUTES = {  
    // Rota para listar os clientes.
    LISTAR_CLIENTES: '/lista/cliente',  
    // Rota para cadastrar um cliente.
    CADASTRAR_CLIENTE: '/cadastro/cliente',
    //Rota para atualizar um cliente.
    ATUALIZAR_CLIENTE: '/atualizar/cliente',  
    // rota para deletar uma cliente de cinema
    DELETAR_CLIENTE: '/deletar/cliente',


    // Rota para listar os ingressos.
    LISTAR_INGRESSO: '/lista/ingressos', 
    // Rota para cadastrar um ingresso.
    CADASTRAR_INGRESSO: '/cadastro/ingresso',   
     // Rota para atualizar um ingresso.
     ATUALIZAR_INGRESSO: '/atualizar/ingresso',   
    // rota para deletar uma imgresso de cinema
    DELETAR_INGRESSO: '/deletar/ingresso',  

    // Rota para listar as sessões de cinema.
    LISTAR_SESSAO: '/lista/sessao',  
    // Rota para cadastrar uma sessão de cinema.
    CADASTRAR_SESSAO: '/cadastro/sessao',  
     // Rota para atualizar uma sessao.
     ATUALIZAR_SESSAO: '/atualizar/sessao',   
    // rota para deletar uma sessão de cinema
    DELETAR_SESSAO: '/deletar/sessao',

    // Rota para listar os filmes.
    LISTAR_FILME: '/lista/filme',  
    // Rota para cadastrar um filme.
    CADASTRAR_FILME: '/cadastro/filme',
     // Rota para atualizar um filme.
     ATUALIZAR_FILME: '/atualizar/filme',   
    // rota para deletar uma filme de cinema
    DELETAR_FILME: '/deletar/filme',

    // Rota para listar as salas de cinema.
    LISTAR_SALA: '/lista/sala',
    CADASTRAR_SALA: '/cadastro/sala',
   //Rota para atualizar uma sala.
    ATUALIZAR_SALA: '/atualizar/sala', 
    // rota para deletar uma sala de cinema
    DELETAR_SALA: '/deletar/sala',
}

// Exporta o objeto SERVER_ROUTES para que ele possa ser usado em outras partes da aplicação.
export { SERVER_ROUTES }
