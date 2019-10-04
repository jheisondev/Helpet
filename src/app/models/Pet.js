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
    this.belongsTo(models.User, { foreignKey: 'responsible_id' });
    this.hasOne(models.File, { foreignKey: 'id_pet' });
  }
}

export default Pet;
