const router = require("express").Router();

const userRoute = require("./userRoute");
router.use("/users", userRoute);

const movieRoute = require("./movieRoute");
router.use("/movies", movieRoute);

const genreRoute = require("./genreRoute");
router.use("/genres", genreRoute);

const actorRoute = require("./actorRoute");
router.use("/actors", actorRoute);

const commentRoute = require("./commentRoute");
router.use("/comments", commentRoute);

const orderRoute = require("./orderRoute");
router.use("/orders", orderRoute);

const stripeRoute = require("./stripeRoute");
router.use("/stripe", stripeRoute);

module.exports = router;
