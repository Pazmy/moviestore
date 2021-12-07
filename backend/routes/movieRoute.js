const MovieController = require("../controllers/MovieController");
const { uploads } = require("../middleware/multer");

const movieRoute = require("express").Router();

// movieRoute.get("/", MovieController.tempAddmovie);
movieRoute.get("/", MovieController.getAllMovies);
movieRoute.get("/popular", MovieController.getPopularMovies);
movieRoute.get("/:id", MovieController.getSingleMovie);
movieRoute.post("/add", uploads.array("image", 2), MovieController.addMovie);
// movieRoute.put("/edit/:id", MovieController.editMovie);
movieRoute.delete("/delete/:id", MovieController.deleteMovie);

module.exports = movieRoute;
