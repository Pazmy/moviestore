const OrderController = require("../controllers/OrderController");
const orderRoute = require("express").Router();

orderRoute.get("/", OrderController.getAllOrder);
orderRoute.get("/detail/:name", OrderController.getSingleOrder);
orderRoute.post("/add", OrderController.addOrder);
orderRoute.post("/user", OrderController.getUserOrders);
orderRoute.post("/status", OrderController.updateOrderStatus);

module.exports = orderRoute;
