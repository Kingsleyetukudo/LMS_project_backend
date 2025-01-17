const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    courseTitle: {
      type: String,
      required: true,
      trim: true,
    },
    courseCode: {
      type: String,
      required: true,
      trim: true,
    },
    creditUnit: {
      type: Number,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

const Course = mongoose.model("Courses", courseSchema);
module.exports = Course;
