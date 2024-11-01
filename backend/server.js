const express = require('express');
const cors = require('cors');
const { sequelize } = require('./models'); // Importa a conexão com o banco

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.use(express.json());

// Importa as rotas
const alunoRoutes = require('./routes/alunoRoutes');
const cursoRoutes = require('./routes/cursoRoutes');

// Usa as rotas
app.use('/api/alunos', alunoRoutes);
app.use('/api/cursos', cursoRoutes);

// Testa a conexão com o banco de dados
sequelize.authenticate()
  .then(() => {
    console.log('Conexão com o banco de dados estabelecida com sucesso.');
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Erro ao conectar ao banco de dados:', err);
  });
