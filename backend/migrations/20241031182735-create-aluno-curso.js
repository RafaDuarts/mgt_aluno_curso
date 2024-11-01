'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('AlunoCurso', {
      alunoId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Alunos', // Nome da tabela que armazena os alunos
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: false,
      },
      cursoId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Cursos', // Nome da tabela que armazena os cursos
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'), // Valor padrão para createdAt
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'), // Atualiza automaticamente o timestamp
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('AlunoCurso');
  },
};
