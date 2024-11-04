const { Curso, Aluno } = require('../models');

exports.createCurso = async (req, res) => {
  // Validação simples de entrada
  const { nome, dataConclusao } = req.body;
  if (!nome || !dataConclusao) {
    return res.status(400).json({ error: 'Nome e data de conclusao do curso são obrigatórios' });
  }

  try {
    const curso = await Curso.create(req.body);
    res.status(201).json(curso);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllCursos = async (req, res) => {
  try {
    const cursos = await Curso.findAll();
    res.status(200).json(cursos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getCursoById = async (req, res) => {
  try {
    const curso = await Curso.findByPk(req.params.id);
    if (!curso) {
      return res.status(404).json({ error: 'Curso não encontrado' });
    }
    res.status(200).json(curso);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateCurso = async (req, res) => {
  // Validação simples de entrada
  const { nome, dataConclusao } = req.body;
  if (!nome || !dataConclusao) {
    return res.status(400).json({ error: 'Nome e data de conclusao do curso são obrigatórios' });
  }

  try {
    const curso = await Curso.findByPk(req.params.id);
    if (!curso) {
      return res.status(404).json({ error: 'Curso não encontrado' });
    }
    await curso.update(req.body);
    res.status(200).json(curso);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteCurso = async (req, res) => {
  try {
    const curso = await Curso.findByPk(req.params.id);
    if (!curso) {
      return res.status(404).json({ error: 'Curso não encontrado' });
    }

    // Verifica se o curso está vinculado a algum aluno
    const alunosVinculados = await curso.getAlunos(); // Supondo que você tenha a relação definida
    if (alunosVinculados.length > 0) {
      return res.status(400).json({ error: 'Curso não pode ser deletado enquanto houver alunos vinculados' });
    }

    await curso.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
