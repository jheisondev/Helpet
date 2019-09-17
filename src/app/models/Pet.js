import Sequelize, { Model } from 'sequelize';

class Pet extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        raca: Sequelize.STRING,
        city: Sequelize.STRING,
        state: Sequelize.STRING,
        date_birth: Sequelize.DATE,
        size: Sequelize.STRING,
        adoption_status: Sequelize.BOOLEAN,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    // esse model pertence ao model file
    // id de file sera armazendo no model User na coluna avatar_id
    this.belongsTo(models.User, { foreignKey: 'responsible_id' });
  }
}

export default Pet;
