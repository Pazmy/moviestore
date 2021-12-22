const { User, Order, Movie, Comment, MovieOrder } = require("../models");
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

      let library = [];

      if (userResult) {
        if (comparePwd(password, userResult.password)) {
          const token = generateAccessToken({
            email,
            name: userResult.name,
            role: userResult.role,
          });
          const isAlreadyOrder = await Order.findOne({
            where: { UserId: userResult.id },
          });

          if (isAlreadyOrder) {
            const temp = [];
            let AllMovieOrders = await MovieOrder.findAll({
              include: [Movie, Order],
            });

            AllMovieOrders.forEach((item) => {
              if (item.Order.UserId == userResult.id) {
                temp.push({
                  movieId: item.MovieId,
                  movieName: item.Movie.title,
                });
              }
            });
            library = temp;
          }

          res.status(200).json({
            token,
            email,
            avatarpath: userResult.avatarpath,
            name: userResult.name,
            role: userResult.role,
            library,
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
      await Comment.destroy({ where: { UserId: id } });

      let userOrdersId = await Order.findAll({ where: { UserId: id } });
      let tempId = [];
      userOrdersId.forEach((order) => {
        tempId.push(order.id);
      });
      console.log(tempId);
      tempId.forEach(async (OrderId) => {
        await MovieOrder.destroy({ where: { OrderId } });
      });
      await Order.destroy({ where: { UserId: id } });

      res.status(200).json({ message: "Delete Success" });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }
  static async updateAvatar(req, res) {
    try {
      const { email } = req.body;
      await User.update({ avatarpath: req.file.path }, { where: { email } });
      const result = await User.findOne({ where: { email } });

      res.status(200).json({ message: "Update success", result });
    } catch (error) {
      res.status(500).json({ message: "Something went wrong", error });
    }
  }
  static async getAdminDashboard(req, res) {
    try {
      const totalOrder = await Order.findAll();
      const totalMovie = await Movie.findAll();
      const totalUser = await User.findAll();
      const result = {
        totalOrder: totalOrder.length,
        totalMovie: totalMovie.length,
        totalUser: totalUser.length,
      };

      res.status(200).json({ result });
    } catch (error) {
      res.status(500).json({ message: "Something went wrong", error });
    }
  }
}

module.exports = UserController;
