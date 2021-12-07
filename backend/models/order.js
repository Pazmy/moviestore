"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Order.belongsTo(models.User);
      Order.belongsToMany(models.Movie, { through: models.MovieOrder });
    }
  }
  Order.init(
    {
      name: DataTypes.STRING,
      status: { type: DataTypes.STRING, defaultValue: "open" },
      quantity: DataTypes.INTEGER,
      total: DataTypes.INTEGER,
      UserId: DataTypes.INTEGER,
    },
    {
      hooks: {
        beforeCreate: (order, options) => {
          order.name = "F" + new Date().getTime();
        },
      },
      sequelize,
      modelName: "Order",
    }
  );
  return Order;
};
