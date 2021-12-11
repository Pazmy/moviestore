const { Actor, MovieActor, Movie } = require("../models");

class ActorController {
  static async getSingleActor(req, res) {
    try {
      const id = +req.params.id;
      const data = await Actor.findByPk(id);
      let credits = await MovieActor.findAll({
        where: { ActorId: id },
        include: [Movie],
      });
      credits = credits.map((movie) => {
        return movie.Movie;
      });
      data.dataValues.credits = credits;

      res.status(200).json({ result: data });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }
  static async addActor(req, res) {
    try {
      const {
        MovieId,
        name,
        gender,
        birthday,
        placeofbirth,
        biography,
        character,
      } = req.body;
      const image = req?.file;
      const actor = await Actor.create({
        name,
        gender,
        birthday,
        placeofbirth,
        biography,
        image: image ? image.path : null,
      });
      await MovieActor.create({ MovieId, ActorId: actor.id, character });
      res.status(201).json({ message: "success" });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }
  static async deleteMovieActor(req, res) {
    try {
      const ActorId = +req.params.id;
      const { MovieId } = req.query;

      await MovieActor.destroy({ where: { ActorId, MovieId } });

      res.status(200).json({ message: "Delete success" });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }
}

module.exports = ActorController;
