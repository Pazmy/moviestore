const ActorController = require("../controllers/ActorController");
const actorRoute = require("express").Router();

actorRoute.get("/:id", ActorController.getSingleActor);

module.exports = actorRoute;
