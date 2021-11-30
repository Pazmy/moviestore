"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Actor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Actor.belongsTo(models.Movie);
    }
  }
  Actor.init(
    {
      name: DataTypes.STRING,
      gender: DataTypes.STRING,
      birthday: DataTypes.STRING,
      placeofbirth: DataTypes.STRING,
      biography: DataTypes.STRING,
      MovieId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Actor",
    }
  );
  return Actor;
};
