const db = require('./models');

const runTest = async () => {
  try {
    // Sincronizar os modelos com o banco de dados
    await db.sequelize.sync({ force: true });

    // Criar um aluno
    const aluno = await db.Aluno.create({
      nome: 'João',
      sobrenome: 'Silva',
      dataNascimento: new Date('2000-01-01'),
      cpf: '12345678901',
      genero: 'Masculino',
      email: 'joao.silva@example.com',
      cep: '12345-678',
      pais: 'Brasil',
      rua: 'Rua A',
      bairro: 'Bairro A',
      numero: '123',
      complemento: '',
      cidade: 'Cidade A',
      estado: 'Estado A',
    });

    // Criar um curso
    const curso = await db.Curso.create({
      nome: 'Curso de Programação',
      descricao: 'Aprenda a programar do zero.',
      dataInicio: new Date(),
      dataFim: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
    });

    // Vincular aluno ao curso
    await aluno.addCurso(curso);

    // Buscar e exibir os alunos do curso
    const cursos = await curso.getAlunos();
    console.log('Alunos no curso:', cursos.map(c => c.nome));

    // Desvincular aluno do curso
    await aluno.removeCurso(curso);
    console.log('Aluno desvinculado do curso.');

  } catch (error) {
    console.error('Erro durante o teste:', error);
  } finally {
    await db.sequelize.close();
  }
};

runTest();
