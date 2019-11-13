import Sequelize, { Model } from 'sequelize';

class Plan extends Model {
  static init(sequelize) {
    super.init(
      {
        title: Sequelize.STRING,
        duration: Sequelize.NUMERIC,
        price: Sequelize.NUMERIC,
      },
      {
        sequelize,
      }
    );
  }
}

export default Plan;
