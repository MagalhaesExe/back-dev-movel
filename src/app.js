const express = require('express');
const swaggerUi = require('swagger-ui-express');
const cors = require('cors');

// Importando os módulos separados
const swaggerDocument = require('./docs/swagger');
const rotasUsuarios = require('./routes/routes');
require('./config/database');

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/', rotasUsuarios);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  console.log(`Documentação do Swagger disponível em: http://localhost:${PORT}/api-docs`);
});