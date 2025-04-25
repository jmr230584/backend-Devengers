// Define um objeto que contém as rotas da API para os diversos recursos (clientes, ingressos, sessões, filmes e salas).
const SERVER_ROUTES = {  
    // Rota para listar os clientes.
    LISTAR_CLIENTES: '/lista/cliente',  

    // Rota para listar os ingressos.
    LISTAR_INGRESSO: '/lista/ingressos',  

    // Rota para listar as sessões de cinema.
    LISTAR_SESSAO: '/lista/sessao',  

    // Rota para listar os filmes.
    LISTAR_FILME: '/lista/filme',  

    // Rota para listar as salas de cinema.
    LISTAR_SALA: '/lista/sala'  
}

// Exporta o objeto SERVER_ROUTES para que ele possa ser usado em outras partes da aplicação.
export { SERVER_ROUTES }
