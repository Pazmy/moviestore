const { User } = require("../models");
const { comparePwd } = require("../helper/bcrypt");
const { generateAccessToken } = require("../helper/jwt");

class UserController {
  static async getAllUsers(req, res) {
    try {
      const data = await User.findAll();
      res.status(200).json({ results: data });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }
  static async addUser(req, res) {
    const { name, email, password, role } = req.body;
    try {
      if (email) {
        const checkEmail = await User.findOne({ where: { email } });
        if (checkEmail?.email === email) {
          res.status(400).json({
            status: "error",
            message: "Email already used, try different email",
          });
        }
      }
      await User.create({ name, email, password, role });
      res
        .status(201)
        .json({ status: "success", message: "created", name, email });
    } catch (err) {
      if (err.name == "SequelizeValidationError") {
        if (err.errors[0].path === "name") {
          res.status(400).json({ message: "name can't be empty" });
        }
        if (err.errors[0].path === "email") {
          res.status(400).json({ message: "email can't be empty" });
        }
        if (err.errors[0].path === "password") {
          res.status(400).json({ message: "password can't be empty" });
        }
      } else if (err.name == "SequelizeDatabaseError") {
        res.status(500).json({ message: "Something went wrong" });
      }

      res.status(500).json({ message: "Something went wrong" });
    }
  }
  static async login(req, res) {
    const { email, password } = req.body;
    console.log(req.body);
    try {
      const userResult = await User.findOne({ where: { email } });
      if (userResult) {
        if (comparePwd(password, userResult.password)) {
          const token = generateAccessToken({
            email,
            name: userResult.name,
            role: userResult.role,
          });
          res.status(200).json({
            token,
            email,
            name: userResult.name,
            role: userResult.role,
          });
        } else {
          throw { message: "Email or password is not correct" };
        }
      } else {
        res
          .status(400)
          .json({ message: "A user with this email does not exist" });
      }
    } catch (error) {
      res.status(400).json(error);
    }
  }
  static async editUser(req, res) {
    //will update
    try {
      const id = +req.params.id;
      const { name, email, gender } = req.body;

      const data = await User.update(
        { avatarpath: req.file.path, gender, name, email },
        { where: { id } }
      );
      res.status(200).json({ message: "Edit Success", result: data });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }
  static async deleteUser(req, res) {
    try {
      const id = +req.params.id;
      await User.destroy({ where: { id } });
      res.status(200).json({ message: "Delete Success" });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }
}

module.exports = UserController;
