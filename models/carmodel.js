'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CarModel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      CarModel.belongsTo(models.Brand, { foreignKey: 'brand_id' })
      CarModel.hasMany(models.CarListing, { foreignKey: 'model_id' })
    }
  }
  CarModel.init({
    name: DataTypes.STRING,
    year: DataTypes.INTEGER,
    brand_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'CarModel',
  });
  return CarModel;
};