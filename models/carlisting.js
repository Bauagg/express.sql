'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CarListing extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      CarListing.belongsTo(models.User, { foreignKey: 'seller_id' })
      CarListing.belongsTo(models.CarModel, { foreignKey: 'model_id' })
      CarListing.hasMany(models.FavoriteCars, { foreignKey: 'listing_id' })
    }
  }
  CarListing.init({
    seller_id: DataTypes.INTEGER,
    model_id: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    condition: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'CarListing',
  });
  return CarListing;
};