const express = require("express");
const router = express.Router();
const prodController = require("../controller/ProductController");
/**
 * This is a sample route that will be used to get all the products
 */
router.get("/all-active", function (req, res, next) {
  /**
   * This is a sample data that will be sent
   */
  prodController.getProductByPagination(req, res);
});

router.get("/all", function (req, res, next) {
  /**
   * This is a sample data that will be sent
   */
  prodController.getAll(req, res);
});

router.post("/add", function (req, res, next) {
  /**
   * This is a sample data that will be sent
   */
  prodController.addProduct(req.body, res);
});

router.get("/find/:name", function (req, res, next) {
  /**
   * This is a sample data that will be sent
   */
  const productName = req.params.name;
  prodController.findByName(productName, res);
});

router.put("/disable/:isstatus/:name", function (req, res, next) {
  /**
   * This is a sample data that will be sent
   */
  const status = req.params.isstatus;
  const passName = req.params.name;
  console.log(status);
  prodController.changeStatus(status, passName, res);
});

router.put("/update", function (req, res, next) {
  console.log(req.body.name);
  /**
   * This is a sample data that will be sent
   */
  prodController.updateProduct(req.body, res);
});

router.delete("/delete", function (req, res, next) {
  /**
   * This is a sample data that will be sent
   */
  prodController.deleteAll(req, res);
});

// Export the router
module.exports = router;
