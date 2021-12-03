const GenreController = require("../controllers/GenreController");
const genreRoute = require("express").Router();

genreRoute.get("/", GenreController.getAllGenre);
genreRoute.post("/add", GenreController.addGenre);
genreRoute.put("/edit/:id", GenreController.editGenre);
genreRoute.delete("/delete/:id", GenreController);

module.exports = genreRoute;
