const ActorController = require("../controllers/ActorController");
const { upload, uploadActor } = require("../middleware/multer");
const actorRoute = require("express").Router();

actorRoute.get("/:id", ActorController.getSingleActor);
actorRoute.post("/add", uploadActor.single("image"), ActorController.addActor);
actorRoute.delete("/movieactor/delete/:id?", ActorController.deleteMovieActor);

module.exports = actorRoute;
