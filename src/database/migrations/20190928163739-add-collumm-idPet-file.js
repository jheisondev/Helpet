module.exports = {
  up: (queryInterface, Sequelize) => {
    // nome da tabela e nome da coluna que sera add
    return queryInterface.addColumn('files', 'id_pet', {
      // caracteristicas da tabela
      type: Sequelize.INTEGER,
      // id da tabala file sera passado para avatarId do usuario
      references: { model: 'pets', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      allowNull: true,
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('files', 'id_pet');
  },
};
