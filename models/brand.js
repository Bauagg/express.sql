'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Brand extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Brand.hasOne(models.CarModel, { foreignKey: 'brand_id' })
    }
  }
  Brand.init({
    name: DataTypes.STRING,
    country: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Brand',
  });
  return Brand;
};