const express = require("express");

const route = express.Router();

const {
  createInstructor,
  getAllInstructors,
  updateInstructor,
  deleteInstructor,
} = require("../controllers/instructorController");

route.post("/createInstructor", createInstructor);
route.get("/getAllInstructors", getAllInstructors);
route.put("/updateInstructor/:id", updateInstructor);
route.delete("/deleteInstructor/:id", deleteInstructor);

module.exports = route;
