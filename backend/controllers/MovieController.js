const {
  Movie,
  Genre,
  Actor,
  MovieGenre,
  MovieActor,
  Comment,
  User,
} = require("../models");

class MovieController {
  static async getAllMovies(req, res) {
    try {
      const page = req.query.page;
      const limit = req.query.limit;
      const startIndex = (page - 1) * limit;
      // const endIndex = page * limit;
      let totalPage = await Movie.count();
      totalPage = Math.round(totalPage / limit);

      const data = await Movie.findAll({
        offset: startIndex,
        limit: limit,
        order: [["id", "ASC"]],
      });

      res.status(200).json({ results: data, totalPage });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }
  static async getPopularMovies(req, res) {
    try {
      const data = await Movie.findAll({ limit: 10 });
      res.status(200).json({ results: data });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }
  static async getSingleMovie(req, res) {
    try {
      const id = +req.params.id;
      let data = await Movie.findByPk(id);
      let genres = await MovieGenre.findAll({
        where: { MovieId: id },
        include: [Genre],
      });
      let actors = await MovieActor.findAll({
        where: { MovieId: id },
        include: [Actor],
      });
      let comments = await Comment.findAll({
        where: { MovieId: id },
        include: [User],
        order: [["createdAt", "DESC"]],
      });
      // let allGenres = await Genre.findAll();
      genres = genres.map((item) => {
        return item.Genre.name;
      });
      actors = actors.map((actor) => {
        return {
          id: actor.Actor.id,
          name: actor.Actor.name,
          character: actor.character,
          image: actor.Actor.image,
        };
      });
      comments = comments.map((i) => {
        const date = new Date(i.createdAt).toString().slice(0, 15);
        return {
          comment: i.comment,
          rate: i.rate,
          date,
          user: i.User.name,
          avatarpath: i.User.avatarpath,
        };
      });

      data.dataValues.genres = genres;
      data.dataValues.actors = actors;
      data.dataValues.comments = comments;

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
      await MovieGenre.destroy({ where: { MovieId: id } });
      await MovieActor.destroy({ where: { MovieId: id } });
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
        poster,
        overview,
        status,
      } = req.body;
      await Movie.update(
        {
          title,
          director,
          studio,
          duration,
          release,
          rate,
          trailer,
          views,
          price,
          poster,
          overview,
          status,
        },
        { where: { id } }
      );
      res.status(200).json({ message: "Update success" });
    } catch (error) {
      res.status(500).json({ message: "Something went wrong" });
    }
  }
}

module.exports = MovieController;
