const GenreController = require("../controllers/GenreController");
const genreRoute = require("express").Router();

genreRoute.get("/", GenreController.getAllGenre);
genreRoute.post("/add", GenreController.addGenre);

module.exports = genreRoute;
