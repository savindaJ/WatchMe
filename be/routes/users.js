var express = require("express");
var router = express.Router();

const userController = require("../controller/UserController");

router.get("/", function (req, res, next) {
  userController.getAllUsers(req, res);
});

router.post("/add", function (req, res, next) {
  userController.addUser(req, res);
});

router.get("/find/:email", function (req, res, next) {
  const userName = req.params.email;
  userController.findByName(userName, res);
});

router.put("/update", function (req, res, next) {
  userController.updateUser(req, res);
});

router.delete("/delete", function (req, res, next) {
  userController.deleteUser(req, res);
});

module.exports = router;
