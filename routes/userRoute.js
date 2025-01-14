const express = require("express");
const {
  createUser,
  getAllUsers,
  updateUser,
  deleteUser,
  // loginUser,
} = require("../controller/userController");

const { loginController } = require("../auth/login");

const route = express.Router();

route.post("/createUser", createUser);
route.get("/getAllUsers", getAllUsers);
route.put("/updateUser/:id", updateUser);
route.delete("/deleteUser/:id", deleteUser);
// route.post("/login", loginUser);

// login and signup routes
route.post("/login", loginController);

module.exports = route;
