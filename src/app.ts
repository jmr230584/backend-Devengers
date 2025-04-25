// Importa o servidor configurado a partir do arquivo 'server.ts'.
import { server } from './server';  

// Define a porta na qual o servidor vai escutar as requisições.
const port: number = 3333;  

// Faz o servidor começar a escutar na porta especificada.
server.listen(port, () => {  
  // Exibe no console o endereço do servidor, indicando onde ele está sendo executado.
  console.log(`Endereço do servidor: http://localhost:${port}`);  
});
