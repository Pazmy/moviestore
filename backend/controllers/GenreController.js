const { Op } = require("sequelize/dist");
const { Genre, Movie, MovieGenre } = require("../models");

class GenreController {
  static async getAllGenre(req, res) {
    try {
      const results = await Genre.findAll();
      res.status(200).json({ results });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }
  static async addGenre(req, res) {
    try {
      const { name } = req.body;
      await Genre.create({ name });
      res.status(200).json({ name });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }
  static async editGenre(req, res) {
    try {
      const id = +req.params.id;
      const { genre } = req.body;
      await Genre.update({ genre }, { where: { id } });
      res.status(200).json({ message: "Update Success" });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }
  static async deleteGenre(req, res) {
    try {
      const id = +req.params.id;
      await Genre.destroy({ where: { id } });
      res.status(200).json({ message: "Delete Success" });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }
  static async filterByGenre(req, res) {
    try {
      const { genres } = req.body;
      const genre = await Genre.findOne({ where: { name: genres[0] } });
      let data = await MovieGenre.findAll({
        where: { GenreId: genre.id },
        include: [Movie, Genre],
        order: [["id", "ASC"]],
      });
      let tempMovies = [];
      data = data.forEach((item) => {
        tempMovies.push(item.Movie);
      });

      res.status(200).json({ results: tempMovies });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }
}

module.exports = GenreController;
