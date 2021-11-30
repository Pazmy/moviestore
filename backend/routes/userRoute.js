const UserController = require("../controllers/UserController");
const { admin } = require("../middleware/admin");
const { authenticateToken } = require("../middleware/auth");

const userRoute = require("express").Router();

userRoute.post("/add", UserController.addUser);
userRoute.post("/login", UserController.login);

userRoute.post("/admin/add", authenticateToken, admin, UserController.addUser);

module.exports = userRoute;
