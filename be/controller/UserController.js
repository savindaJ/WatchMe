const User = require("../scheema/user");

const userController = {
  getAllUsers: async function getAllUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (error) {
      console.log(error);
    }
  },
  addUser: async function addUser(req, res) {
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      role: req.body.role,
    });

    try {
      const savedUser = await newUser.save();
      console.log("User saved successfully:", savedUser);
      res.status(200).json(savedUser);
    } catch (error) {
      console.log("Error saving user:", error);
    }
  },
  findByName: async function findOne(name, res) {
    try {
      const user = await User.findOne({ email: name });
      if (!user) {
        throw new Error("User not found");
      }
      res.json(user, 200);
    } catch (error) {
      res.json({ message: "User not found" }, 404);
    }
  },
  updateUser: async function updateUser(req, res) {
    try {
      const updatedUser = await User.findOneAndUpdate(
        { name: req.body.name },
        {
          email: req.body.email,
          password: req.body.password,
          role: req.body.role,
        },
        { new: true }
      );
      console.log("User updated successfully:", updatedUser);
      res.status(200).json(updatedUser);
    } catch (error) {
      console.log("Error updating user:", error);
    }
  },
  deleteUser: async function deleteUser(req, res) {
    const deleteMany = async () => {
      await User.deleteMany({});
    };
    deleteMany();
    res.status(200).json({ message: "All users deleted" });
    // try {
    //   const deletedUser = await User.findOneAndDelete({ name: req.body.name });
    //   console.log("User deleted successfully:", deletedUser);
    //   res.status(200).json(deletedUser);
    // } catch (error) {
    //   console.log("Error deleting user:", error);
    // }
  },
};

module.exports = userController;
