const e = require("express");
const Order = require("../scheema/order");
const Watch = require("../scheema/Scheema");

const orderController = {
  getAllOrders: async function getAllOrders(req, res) {
    try {
      const orders = await Order.find({ status: "Pending" });
      //   console.log(orders);
      res.json(orders);
    } catch (error) {
      console.log(error);
    }
  },
  addOrder: async function addOrder(req, res) {
    const watchList = req.watchList;
    const newDropList = await Promise.all(
      watchList.map(async (name) => {
        const watch = await Watch.findOne({ name: name });
        const wtatchQyt = watch.qoh - 1;
        await Watch.updateOne({ name: watch.name }, { qoh: wtatchQyt });
        const newWatch = {
          name: watch.name,
          price: watch.price,
          description: watch.description,
          qoh: watch.qoh,
        };
        return newWatch;
      })
    );

    const newOrder = new Order({
      watchList: newDropList,
      quantity: req.quantity,
      total: req.total,
      deliveryDate: req.deliveryDate,
      email: req.email,
      address: req.address,
      phone: req.phone,
      status: "Pending",
      isActive: true,
    });

    try {
      const savedOrder = await newOrder.save();
      console.log("Order saved successfully:", savedOrder);
      res.status(200).json(savedOrder);
    } catch (error) {
      console.log("Error saving order:", error);
    }
  },
  findByName: async function findOne(name, res) {
    try {
      const order = await Order.findOne({ name: name });
      res.json(order);
    } catch (error) {
      console.log(error);
    }
  },
  addDileveryDate: async function addDileveryDate(id, date, res) {
    const order = await Order.findOne({ _id: id });
    // console.log(date);
    order.deliveryDate = date;
    try {
      const updatedOrder = await order.save();
      res.json(updatedOrder);
    } catch (error) {
      console.log(error);
    }
  },
  updateStatus: async function updateStatus(id, res) {
    const order = await Order.findOne({ _id: id });
    order.status = "Delivered";
    try {
      const updatedOrder = await order.save();
      res.json(updatedOrder);
    } catch (error) {
      console.log(error);
    }
  },
  deleteOrder: async function deleteOrder(id, res) {
    await Order.deleteMany({});
    res.status(200).json({ message: "All orders deleted" });
  },
};

module.exports = orderController;
