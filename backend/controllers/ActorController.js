const { Actor } = require("../models");

class ActorController {
  static async getSingleActor(req, res) {
    try {
      const id = +req.params.id;
      const data = await Actor.findByPk(id);
      res.status(200).json({ result: data });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }
}

module.exports = ActorController;
