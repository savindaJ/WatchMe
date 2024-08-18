const mongoose = require("mongoose");

 const watchSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String,
  qoh: Number,
  gender: String,
});

const OrderScheema = new mongoose.Schema({
  watchList: [watchSchema],
  quantity: Number,
  total: Number,
  status: String,
  date: { type: Date, default: Date.now },
  deliveryDate: String,
  email: String,
  address: String,
  phone: String,
  email: String,
  approved: Boolean,
});

const Order = mongoose.model("Order", OrderScheema);

module.exports = Order;
