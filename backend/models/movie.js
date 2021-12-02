"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Movie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Movie.belongsToMany(models.User, { through: models.Comment });
      Movie.belongsToMany(models.Genre, { through: models.MovieGenre });
      Movie.belongsToMany(models.Actor, { through: models.MovieActor });
      // Movie.belongsToMany(models.Order,{through:models.MovieOrder})
    }
  }
  Movie.init(
    {
      title: DataTypes.STRING,
      director: DataTypes.STRING,
      studio: DataTypes.STRING,
      duration: DataTypes.STRING,
      release: DataTypes.STRING,
      rate: DataTypes.STRING,
      trailer: DataTypes.STRING,
      views: DataTypes.STRING,
      price: DataTypes.INTEGER,
      image: DataTypes.STRING,
      poster: DataTypes.STRING,
      overview: DataTypes.TEXT,
      status: DataTypes.STRING,
      episode: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Movie",
    }
  );
  return Movie;
};
