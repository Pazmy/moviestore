const UserController = require("../controllers/UserController");
const { admin } = require("../middleware/admin");
const { authenticateToken } = require("../middleware/auth");
const { upload } = require("../middleware/multer");

const userRoute = require("express").Router();

userRoute.get("/", UserController.getAllUsers);
userRoute.post("/add", UserController.addUser);
userRoute.post("/login", UserController.login);

userRoute.post("/admin/add", authenticateToken, admin, UserController.addUser);
userRoute.get(
  "/admin/dashboard",
  authenticateToken,
  admin,
  UserController.getAdminDashboard
);
//implement later
// userRoute.put(
//   "/edit/:id",
//   authenticateToken,
//   upload.single("avatar"),
//   UserController.editUser
// );

userRoute.put(
  "/info/avatar",
  authenticateToken,
  upload.single("image"),
  UserController.updateAvatar
);

userRoute.delete(
  "/delete/:id",
  authenticateToken,
  admin,
  UserController.deleteUser
);

module.exports = userRoute;
