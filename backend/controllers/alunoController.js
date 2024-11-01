const { Aluno } = require('../models');

exports.createAluno = async (req, res) => {
  try {
    const aluno = await Aluno.create(req.body);
    res.status(201).json(aluno);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllAlunos = async (req, res) => {
  try {
    const alunos = await Aluno.findAll();
    res.status(200).json(alunos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAlunoById = async (req, res) => {
  try {
    const aluno = await Aluno.findByPk(req.params.id);
    if (!aluno) {
      return res.status(404).json({ error: 'Aluno não encontrado' });
    }
    res.status(200).json(aluno);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

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
    const { alunoId, cursoId } = req.body;
    try {
      const aluno = await Aluno.findByPk(alunoId);
      const curso = await Curso.findByPk(cursoId);
      
      if (!aluno || !curso) {
        return res.status(404).json({ error: 'Aluno ou Curso não encontrado' });
      }
      
      await aluno.addCurso(curso); // Usando a associação definida no Sequelize
      res.status(200).json({ message: 'Aluno vinculado ao curso com sucesso' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  // Desvincular aluno de curso
  exports.unlinkAlunoFromCurso = async (req, res) => {
    const { alunoId, cursoId } = req.body;
    try {
      const aluno = await Aluno.findByPk(alunoId);
      const curso = await Curso.findByPk(cursoId);
  
      if (!aluno || !curso) {
        return res.status(404).json({ error: 'Aluno ou Curso não encontrado' });
      }
  
      await aluno.removeCurso(curso); // Usando a associação definida no Sequelize
      res.status(200).json({ message: 'Aluno desvinculado do curso com sucesso' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  