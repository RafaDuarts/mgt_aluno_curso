const express = require('express');
const router = express.Router();
const alunoController = require('../controllers/alunoController');

router.post('/', alunoController.createAluno);
router.get('/', alunoController.getAllAlunos);
router.get('/:id', alunoController.getAlunoById);
router.put('/:id', alunoController.updateAluno);
router.delete('/:id', alunoController.deleteAluno);

router.post('/link', alunoController.linkAlunoToCurso);
router.post('/unlink', alunoController.unlinkAlunoFromCurso);


module.exports = router;
