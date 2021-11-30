const { Genre } = require("../models");

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
}

module.exports = GenreController;
