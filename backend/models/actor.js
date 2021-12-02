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
      Actor.belongsToMany(models.Movie, { through: models.MovieActor });
    }
  }
  Actor.init(
    {
      name: DataTypes.STRING,
      gender: DataTypes.STRING,
      birthday: DataTypes.STRING,
      placeofbirth: DataTypes.STRING,
      biography: DataTypes.TEXT,
      image: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Actor",
    }
  );
  return Actor;
};
