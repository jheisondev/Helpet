import Sequelize from 'sequelize';

import User from '../app/models/User';
import File from '../app/models/File';
import Pet from '../app/models/Pet';

// info connection
import databaseConfig from '../config/database';

const models = [User, File, Pet];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();
