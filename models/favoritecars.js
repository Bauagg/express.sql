'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class FavoriteCars extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      FavoriteCars.belongsTo(models.User, { foreignKey: 'user_id' })
      FavoriteCars.belongsTo(models.CarListing, { foreignKey: 'listing_id' })
    }
  }
  FavoriteCars.init({
    user_id: DataTypes.INTEGER,
    listing_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'FavoriteCars',
  });
  return FavoriteCars;
};