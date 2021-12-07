"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class MovieOrder extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      MovieOrder.belongsTo(models.Movie);
      MovieOrder.belongsTo(models.Order);
    }
  }
  MovieOrder.init(
    {
      MovieId: DataTypes.INTEGER,
      OrderId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "MovieOrder",
    }
  );
  return MovieOrder;
};
