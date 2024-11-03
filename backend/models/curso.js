'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Curso extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Define a associação muitos-para-muitos entre Curso e Aluno
      this.belongsToMany(models.Aluno, {
        through: 'AlunoCurso', // Nome da tabela intermediária
        foreignKey: 'cursoId', // Chave estrangeira que referencia Curso
        otherKey: 'alunoId', // Chave estrangeira que referencia Aluno
        as: 'alunos' // Alias para acessar os alunos associados a um curso
      });
    }
  }

  Curso.init({
    nome: DataTypes.STRING,
    data_conclusao: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Curso',
  });

  return Curso;
};
