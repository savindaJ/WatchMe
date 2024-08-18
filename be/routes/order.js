const express = require("express");
const router = express.Router();
const orderController = require("../controller/OrderController");

router.get("/", function (req, res, next) {
  orderController.getAllOrders(req, res);
});

router.post("/add", function (req, res, next) {
  orderController.addOrder(req.body, res);
});

router.get("/find/:name", function (req, res, next) {
  const orderName = req.params.name;
  orderController.findByName(orderName, res);
});

router.put("/update", function (req, res, next) {
  const orderId = req.body.id;
  const dileveryDate = req.body.date;
  console.log("orderId", orderId,dileveryDate);
  orderController.addDileveryDate(orderId, dileveryDate, res);
});

router.put("/updateStatus/:id", function (req, res, next) {
  const orderId = req.params.id;
  orderController.updateStatus(orderId, res);
});

router.delete("/delete", function (req, res, next) {
  const orderId = req.params.id;
  orderController.deleteOrder(orderId, res);
});

module.exports = router;
