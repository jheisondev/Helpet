module.exports = {
  up: (queryInterface, Sequelize) => {
    // nome da tabela e nome da coluna que sera add
    return queryInterface.addColumn('users', 'avatar_id', {
      // caracteristicas da tabela
      type: Sequelize.INTEGER,
      // id da tabala file sera passado para avatarId do usuario
      references: { model: 'files', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
      allowNull: true,
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('users', 'avatar_id');
  },
};
