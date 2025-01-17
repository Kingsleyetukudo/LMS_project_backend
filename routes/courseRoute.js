const express = require("express");
const courseController = require("../controllers/courseController");

const router = express.Router();

// Get all courses
router.get("/", courseController.getAllCourses);

// Get a single course by ID
router.get("/:id", courseController.getCourse);

// Create a new course
router.post("/", courseController.createCourse);

// Update a course by ID
router.put("/:id", courseController.updateCourse);

// Delete a course by ID
router.delete("/:id", courseController.deleteCourse);

module.exports = router;
