// Importa os módulos necessários:
// 'express' para criar o servidor,
// 'cors' para permitir requisições de outros domínios,
// 'router' que contém as rotas da API.
import express from 'express';  
import cors from 'cors';  
import { router } from './routes'; 
import path from 'path'; 

// Cria uma instância do servidor express.
const server = express();  

// Configura o servidor para aceitar requisições de outros domínios (CORS).
// Isso é necessário para permitir que o servidor seja acessado por clientes em domínios diferentes.
server.use(cors());  

// Configura o servidor para aceitar e processar requisições no formato JSON.
// Isso permite que o servidor manipule dados JSON no corpo das requisições.
server.use(express.json());  

// Configura as rotas no servidor, usando o roteador importado.
server.use(router);  

// Serve os arquivos da pasta uploads
server.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads'))); 

// Exporta o servidor configurado para que ele possa ser usado em outros arquivos.
export { server };  
