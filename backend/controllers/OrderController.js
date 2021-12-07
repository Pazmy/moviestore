const { Order, MovieOrder, User, Movie } = require("../models");

class OrderController {
  static async getAllOrder(req, res) {
    try {
      const data = await Order.findAll();

      res.status(200).json({ results: data });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }

  static async addOrder(req, res) {
    try {
      const { movies, quantity, total, user } = req.body;
      const userResult = await User.findOne({ where: { email: user.email } });
      const orderResult = await Order.create({
        quantity,
        total,
        UserId: userResult.id,
      });
      await movies.forEach(async (movie) => {
        await MovieOrder.create({
          MovieId: movie.id,
          OrderId: orderResult.id,
        });
      });
      res.status(201).json({ message: "Success" });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }
  static async getUserOrders(req, res) {
    try {
      const { email } = req.body;

      const userResult = await User.findOne({ where: { email } });
      let AllMovieOrders = await MovieOrder.findAll({
        include: [Movie, Order],
      });
      let filterMovieOrders = AllMovieOrders.filter((item) => {
        if (item.Order.UserId == userResult.id) {
          return item;
        }
      });
      let results = [];
      let tempOrderId = 0;
      let tempObj = {};
      filterMovieOrders.forEach((item) => {
        if (tempOrderId != item.OrderId) {
          tempObj = {};
          tempObj.orderId = item.OrderId;
          tempObj.orderDetail = item.Order;
          tempObj.movies = [];
          tempObj.movies.push(item.Movie);
          results.push(tempObj);
          tempOrderId = item.OrderId;
        } else {
          tempObj.movies.push(item.Movie);
        }
      });
      res.status(200).json({ results });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }
  static async getSingleOrder(req, res) {
    try {
      const { name } = req.params;
      let orderResult = await Order.findOne({
        where: { name },
        include: [User],
      });
      const movieResults = await MovieOrder.findAll({
        where: { OrderId: orderResult.id },
        include: [Movie],
      });
      const tempMovie = [];
      movieResults.forEach((item) => {
        tempMovie.push(item.Movie);
      });

      orderResult.dataValues.movies = tempMovie;
      orderResult.dataValues.User = {
        id: orderResult.id,
        email: orderResult.User.email,
        name: orderResult.User.name,
      };

      res.status(200).json({ result: orderResult });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }
  static async updateOrderStatus(req, res) {
    try {
      const { status, id } = req.body;
      console.log(status, id);
      await Order.update({ status }, { where: { id } });
      res.status(200).json({ message: "success" });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }
}

module.exports = OrderController;
