// Importa o servidor configurado a partir do arquivo 'server.ts'.
import { DataBaseModel } from './model/DataBaseModel';
import { server } from './server';
import dotenv from 'dotenv';

// Define a porta na qual o servidor vai escutar as requisições.
const port: number = 3333;

new DataBaseModel().testeConexao().then((resbd) => {
  console.clear();
  if (resbd) {
    // Faz o servidor começar a escutar na porta especificada.
    server.listen(port, () => {
      // Exibe no console o endereço do servidor, indicando onde ele está sendo executado.
      console.log(`Endereço do servidor: http://localhost:${port}`);
    });
  } else {
    console.error('Não foi possível conectar ao banco de dados');
  }
})

