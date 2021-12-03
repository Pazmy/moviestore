const MovieController = require("../controllers/MovieController");

const movieRoute = require("express").Router();

// movieRoute.get("/", MovieController.tempAddmovie);
movieRoute.get("/", MovieController.getAllMovies);
movieRoute.get("/:id", MovieController.getSingleMovie);
movieRoute.post("/add", MovieController.addMovie);
// movieRoute.put("/edit/:id", MovieController.editMovie);
movieRoute.delete("/delete/:id", MovieController.deleteMovie);

module.exports = movieRoute;
