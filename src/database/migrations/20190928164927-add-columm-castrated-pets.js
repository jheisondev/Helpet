module.exports = {
  up: (queryInterface, Sequelize) => {
    // nome da tabela e nome da coluna que sera add
    return queryInterface.addColumn('pets', 'castrated', {
      // caracteristicas da tabela
      type: Sequelize.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('pets', 'castrated');
  },
};
