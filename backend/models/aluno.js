'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Aluno extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Define a associação muitos-para-muitos entre Aluno e Curso
      this.belongsToMany(models.Curso, {
        through: 'AlunoCurso', // Nome da tabela intermediária
        foreignKey: 'alunoId', // Chave estrangeira que referencia Aluno
        otherKey: 'cursoId', // Chave estrangeira que referencia Curso
        as: 'cursos' // Alias para acessar os cursos associados a um aluno
      });
    }
  }

  Aluno.init({
    nome: DataTypes.STRING,
    sobrenome: DataTypes.STRING,
    data_nascimento: DataTypes.DATE,
    cpf: DataTypes.STRING,
    genero: DataTypes.STRING,
    email: DataTypes.STRING,
    cep: DataTypes.STRING,
    pais: DataTypes.STRING,
    rua: DataTypes.STRING,
    bairro: DataTypes.STRING,
    numero: DataTypes.STRING,
    complemento: DataTypes.STRING,
    cidade: DataTypes.STRING,
    estado: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Aluno',
  });

  return Aluno;
};
