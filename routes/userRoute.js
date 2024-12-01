const express = require("express");
const {
  createUser,
  getAllUsers,
  updateUser,
  deleteUser,
} = require("../controller/userController");

const { loginController } = require("../auth/login");

const route = express.Router();

route.post("/createUser", createUser);
route.get("/getAllUsers", getAllUsers);
route.put("/updateUser/:id", updateUser);
route.delete("/deleteUser/:id", deleteUser);

// login and signup routes
route.post("/loginController", loginController);

module.exports = route;
