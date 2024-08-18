const Watch = require("../scheema/Scheema");
const productController = {
  getAllAciveProducts: async function getAllAciveProducts(req, res) {
    try {
      const watches = await Watch.find({ 
        isActive: true,
        qty: { $gt: 0 }
       });
      res.json(watches);
    } catch (error) {
      console.log(error);
    }
  },
  getProductByPagination: async function getProductByPagination(req, res) {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    try {
      const skip = (page -1) * limit;
      console.log("skip", skip, "page", page, "limit", limit);
      const totalRecords = await Watch.countDocuments({ isActive: true });
      const watches = await Watch.find({ isActive: true })
        .limit(limit)
        .skip(skip);
      res.json({
        page,
        limit,
        totalRecords,
        totalPages: Math.ceil(totalRecords / limit),
        data: watches,
      });
    } catch (error) {
      console.log(error);
    }
  },
  addProduct: async function addProduct(req, res) {
    const newWatch = new Watch({
      name: req.name,
      image: req.image,
      rating: req.rating,
      price: req.price,
      description: req.description,
      qoh: req.qoh,
      isActive: true,
      gender: req.gender,
    });

    try {
      const savedWatch = await newWatch.save();
      console.log("Watch saved successfully:", savedWatch);
      res.status(200).json(savedWatch);
    } catch (error) {
      console.log("Error saving watch:", error);
    }
  },
  findByName: async function findOne(name, res) {
    try {
      const watch = await Watch.findOne({ name: name });
      res.json(watch);
    } catch (error) {
      console.log(error);
    }
  },
  updateProduct: async function updateProduct(req, res) {
    console.log(req.name);
    try {
      const watch = await Watch.findOne({ name: req.name });
      watch.name = req.name;
      watch.image = req.image;
      watch.rating = req.rating;
      watch.price = req.price;
      watch.description = req.description;
      watch.qoh = req.qoh;
      watch.isActive = req.isActive;
      watch.gender = req.gender;
      watch.updatedAt = Date.now();
      const updatedWatch = await watch.save();
      res.json(updatedWatch);
    } catch (error) {
      console.log(error);
    }
  },
  getAll: async function getAll(req, res) {
    try {
      const watches = await Watch.find();
      res.json(watches);
    } catch (error) {
      console.log(error);
    }
  },
  deleteAll: async function deleteAll(req, res) {
    try {
      const watches = await Watch.deleteMany();
      res.json(watches);
    } catch (error) {
      console.log(error);
    }
  },
  changeStatus: (disableProduct = async function disableProduct(
    status,
    name,
    res
  ) {
    try {
      const watch = await Watch.findOne({ name: name });
      watch.isActive = status;
      const updatedWatch = await watch.save();
      res.json(updatedWatch);
    } catch (error) {
      console.log(error);
    }
  }),
};

module.exports = productController;
exports.disableProduct = disableProduct;
