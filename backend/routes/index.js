const router = require("express").Router();

const userRoute = require("./userRoute");
router.use("/users", userRoute);

const movieRoute = require("./movieRoute");
router.use("/movies", movieRoute);

const genreRoute = require("./genreRoute");
router.use("/genres", genreRoute);

// const orderRoute = require("./orderRoute");
// router.use("/orders", orderRoute);

module.exports = router;
