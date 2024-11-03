const express = require('express');
const router = express.Router();
const alunoController = require('../controllers/alunoController');

// Rotas CRUD para aluno
router.post('/', alunoController.createAluno);
router.get('/', alunoController.getAllAlunos);
router.get('/:id', alunoController.getAlunoById);
router.put('/:id', alunoController.updateAluno);
router.delete('/:id', alunoController.deleteAluno);

// Rotas para vinculação e desvinculação de cursos ao aluno
router.post('/:alunoId/cursos/:cursoId/link', alunoController.linkAlunoToCurso);
router.delete('/:alunoId/cursos/:cursoId/unlink', alunoController.unlinkAlunoFromCurso);

module.exports = router;
