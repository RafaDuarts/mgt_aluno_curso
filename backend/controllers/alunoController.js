const { Aluno, Curso } = require('../models');

// Criar novo aluno
exports.createAluno = async (req, res) => {
  try {
    const aluno = await Aluno.create(req.body);
    res.status(201).json(aluno);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Obter todos os alunos (com cursos vinculados)
exports.getAllAlunos = async (req, res) => {
  try {
    const alunos = await Aluno.findAll({
      include: {
        model: Curso,
        as: 'cursos',
        through: { attributes: [] } // Exclui informações da tabela de junção
      }
    });
    res.status(200).json(alunos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obter aluno por ID (com cursos vinculados)
exports.getAlunoById = async (req, res) => {
  try {
    const aluno = await Aluno.findByPk(req.params.id, {
      include: {
        model: Curso,
        as: 'cursos',
        through: { attributes: [] } // Exclui informações da tabela de junção
      }
    });
    if (!aluno) {
      return res.status(404).json({ error: 'Aluno não encontrado' });
    }
    res.status(200).json(aluno);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Atualizar aluno
exports.updateAluno = async (req, res) => {
  try {
    const aluno = await Aluno.findByPk(req.params.id);
    if (!aluno) {
      return res.status(404).json({ error: 'Aluno não encontrado' });
    }
    await aluno.update(req.body);
    res.status(200).json(aluno);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Deletar aluno
exports.deleteAluno = async (req, res) => {
  try {
    const aluno = await Aluno.findByPk(req.params.id);
    if (!aluno) {
      return res.status(404).json({ error: 'Aluno não encontrado' });
    }
    await aluno.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Vincular aluno a curso
exports.linkAlunoToCurso = async (req, res) => {
  const { alunoId, cursoId } = req.params;
  try {
    const aluno = await Aluno.findByPk(alunoId);
    const curso = await Curso.findByPk(cursoId);

    if (!aluno || !curso) {
      return res.status(404).json({ error: 'Aluno ou Curso não encontrado' });
    }

    await aluno.addCurso(curso);
    res.status(200).json({ message: 'Aluno vinculado ao curso com sucesso' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Desvincular aluno de curso
exports.unlinkAlunoFromCurso = async (req, res) => {
  const { alunoId, cursoId } = req.params;
  try {
    const aluno = await Aluno.findByPk(alunoId);
    const curso = await Curso.findByPk(cursoId);

    if (!aluno || !curso) {
      return res.status(404).json({ error: 'Aluno ou Curso não encontrado' });
    }

    await aluno.removeCurso(curso);
    res.status(200).json({ message: 'Aluno desvinculado do curso com sucesso' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
