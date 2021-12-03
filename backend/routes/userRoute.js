const UserController = require("../controllers/UserController");
const { admin } = require("../middleware/admin");
const { authenticateToken } = require("../middleware/auth");
const { upload } = require("../middleware/multer");

const userRoute = require("express").Router();

userRoute.post("/add", UserController.addUser);
userRoute.post("/login", UserController.login);

userRoute.post("/admin/add", authenticateToken, admin, UserController.addUser);

//implement later
userRoute.put(
  "/edit/:id",
  authenticateToken,
  upload.single("avatar"),
  UserController.editUser
);

userRoute.delete(
  "/admin/delete/:id",
  authenticateToken,
  admin,
  UserController.deleteUser
);

module.exports = userRoute;
