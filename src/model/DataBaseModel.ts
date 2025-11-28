// Importa o módulo 'pg' para realizar a conexão com o banco de dados PostgreSQL.
import pg from 'pg';  

// Importa o módulo 'dotenv' para carregar variáveis de ambiente a partir de um arquivo '.env'.
import dotenv from 'dotenv';  

// Carrega as variáveis de ambiente do arquivo '.env'.
dotenv.config();  

/**
 * Classe que representa o modelo de banco de dados.
 */
export class DataBaseModel {  
    //
    
    /**
     * Configuração para conexão com o banco de dados
     */
    private _config: object;  // A configuração do banco de dados, que inclui credenciais e parâmetros de conexão.

    /**
     * Pool de conexões com o banco de dados
     */
    private _pool: pg.Pool;  // A instância do pool de conexões, que gerencia múltiplas conexões ao banco.

    /**
     * Cliente de conexão com o banco de dados
     */
    private _client: pg.Client;  // O cliente de conexão único utilizado para realizar consultas e interações.

    /**
     * Construtor da classe DatabaseModel.
     */
    constructor() {  
        // Configuração padrão para conexão com o banco de dados, utilizando variáveis de ambiente.
        this._config = {  
            user: process.env.DB_USER,  // Nome de usuário para a conexão.
            host: process.env.DB_HOST,  // Endereço do servidor do banco de dados.
            database: process.env.DB_NAME,  // Nome do banco de dados.
            password: process.env.DB_PASSWORD,  // Senha do banco de dados.
            port: process.env.DB_PORT,  // Porta usada para a conexão com o banco.
            max: 10,  // Número máximo de conexões no pool.
            idleTimoutMillis: 10000  // Tempo máximo (em milissegundos) de inatividade antes de desconectar.
        }

        // Inicializa o pool de conexões com a configuração fornecida.
        this._pool = new pg.Pool(this._config);

        // Inicializa o cliente de conexão com a mesma configuração.
        this._client = new pg.Client(this._config);
    }

    /**
     * Método para testar a conexão com o banco de dados.
     *
     * @returns **true** caso a conexão tenha sido feita, **false** caso negativo
     */
    public async testeConexao() {  
        try {  
            // Tenta conectar ao banco de dados utilizando o cliente.
            await this._client.connect();  
            console.log('Database connected!');  // Exibe uma mensagem indicando que a conexão foi bem-sucedida.
            // Encerra a conexão após o teste.
            this._client.end();  
            return true;  // Retorna verdadeiro se a conexão foi bem-sucedida.
        } catch (error) {  
            // Em caso de erro na conexão, exibe uma mensagem de erro.
            console.log('Error to connect database X( ');  
            console.log(error);  
            // Encerra a conexão em caso de erro.
            this._client.end();  
            return false;  // Retorna falso se ocorrer erro na conexão.
        }
    }

    /**
     * Getter para o pool de conexões.
     */
    public get pool() {  
        return this._pool;  // Retorna a instância do pool de conexões.
    }
}


//