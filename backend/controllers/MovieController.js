const { Movie, Genre, Actor, MovieGenre, MovieActor } = require("../models");
const { URLBACKDROP, URLPOSTER, URLPERSON } = require("../helper/tmdbUrl");
const axios = require("axios");
class MovieController {
  static async getAllMovies(req, res) {
    try {
      const data = await Movie.findAll();
      res.status(200).json({ results: data });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }
  static async getSingleMovie(req, res) {
    try {
      const id = +req.params.id;
      const data = await Movie.findByPk(id);
      res.status(200).json({ result: data });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }
  static async addMovie(req, res) {
    try {
      const {
        title,
        director,
        studio,
        duration,
        release,
        rate,
        trailer,
        views,
        price,
        image,
        poster,
        overview,
        status,
        genresId,
      } = req.body;
      const images = req.files;
      if (!genresId) {
        res.status(400).json("Genre must be checked");
      }
      if (!images) {
        res.status(400).json("Need upload image");
      }
      const movie = await Movie.create({
        title,
        director,
        studio,
        duration,
        release,
        rate,
        trailer,
        views,
        price,
        image,
        poster,
        overview,
        status,
        poster: images[0].path,
        image: images[1].path,
      });

      if (Array.isArray(genresId)) {
        genresId.forEach(async (genre) => {
          await MovieGenre.create({
            MovieId: movie.id,
            GenreId: Number(genre),
          });
        });
      } else {
        await MovieGenre.create({
          MovieId: movie.id,
          GenreId: Number(genresId),
        });
      }

      res.status(201).json({ message: "Success created" });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }
  static async deleteMovie(req, res) {
    try {
      const id = +req.params.id;
      await Movie.destroy({ where: { id } });
      res.status(200).json({ message: "Delete Success" });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }
  //implement later
  static async editMovie(req, res) {
    try {
      const id = +req.params.id;
    } catch (error) {}
  }
}

module.exports = MovieController;
