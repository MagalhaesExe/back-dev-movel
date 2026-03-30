const { Pool } = require('pg');

const pool = new Pool({
  user: 'user',        
  host: 'localhost',
  database: 'teste',    
  password: 'password',       
  port: 5433,
});

// Cria a tabela automaticamente ao iniciar
pool.query(`
    CREATE TABLE IF NOT EXISTS usuarios (
      id SERIAL PRIMARY KEY,
      nome VARCHAR(100) NOT NULL,
      email VARCHAR(100) UNIQUE NOT NULL
    )
`).then(() => {
  console.log('Banco conectado e tabela "usuarios" pronta para uso.');
}).catch(err => {
  console.error('Erro ao criar tabela:', err);
});

// Exporta a conexão para ser usada em outros arquivos
module.exports = pool;