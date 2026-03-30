const swaggerDocument = {
  openapi: '3.0.0',
  info: {
    title: 'API - Dev Móvel',
    version: '1.0.0',
    description: 'Documentação da API do projeto usando Express e PostgreSQL',
  },
  servers: [{ url: 'http://localhost:3000', description: 'Servidor Local' }],
  paths: {
    '/usuarios': {
      get: {
        summary: 'Lista todos os usuários cadastrados',
        tags: ['Usuários'],
        responses: {
          '200': { description: 'Lista de usuários retornada com sucesso' },
          '500': { description: 'Erro interno no servidor' }
        }
      },
      post: {
        summary: 'Cria um novo usuário',
        tags: ['Usuários'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  nome: { type: 'string', example: 'Alex Jr' },
                  email: { type: 'string', example: 'alex@devmovel.com' }
                }
              }
            }
          }
        },
        responses: {
          '201': { description: 'Usuário criado com sucesso' },
          '500': { description: 'Erro interno no servidor' }
        }
      }
    }
  }
};

module.exports = swaggerDocument;