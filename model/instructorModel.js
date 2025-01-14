const mongoose = require("mongoose");

const instructorSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    middleName: {
      type: String,
      // required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      validate: {
        validator: function (v) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
        },
        message: (props) => `${props.value} is not a valid email!`,
      },
    },

    bio: {
      type: String,
      // required: true,
    },

    phone: {
      type: Number,
      // required: true,
    },

    address: {
      type: String,
    },

    photo: {
      type: String,
      // required: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
    },
  },
  { timestamps: true }
);

const Instructor = mongoose.model("Instructors", instructorSchema);
module.exports = Instructor;
