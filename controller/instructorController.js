const bcrypt = require("bcrypt");
const Instructor = require("../model/instructorModel");

const createInstructor = async (req, res) => {
  try {
    const instructorData = new Instructor(req.body);
    const { email } = instructorData;
    const instructorExist = await Instructor.findOne({ email });
    if (instructorExist) {
      return res.status(400).json({ message: "User already exists." });
    }

    const saltRounds = 10;

    const salt = await bcrypt.genSalt(saltRounds);

    instructorData.password = await bcrypt.hash(instructorData.password, salt);
    const savedInstructor = await instructorData.save();

    const { password, ...InstructorDetails } = savedInstructor.toObject();
    res.status(200).json(InstructorDetails);
  } catch (error) {
    res.status(500).json({ error: "Internal Server error" });
  }
};

const getAllInstructors = async (req, res) => {
  try {
    const Instructors = await Instructor.find();
    if (Instructors.length === 0) {
      return res.status(404).json({ Message: "No user founded" });
    }

    res.status(200).json(Instructors);
  } catch (error) {
    res.status(500).json({ error: "Internal Server error" });
  }
};

const updateInstructor = async (req, res) => {
  try {
    const id = req.params.id;
    const instructorExist = await Instructor.findOne({ _id: id });
    if (!instructorExist) {
      return res.status(404).json({ message: "Instructor not found" });
    }

    const update = await Instructor.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    res.status(201).json(update);
  } catch (error) {
    res.status(500).json({ error: "Internal Server error" });
  }
};

const deleteInstructor = async (req, res) => {
  try {
    const id = req.params.id;
    const InstructorExist = await User.findOne({ _id: id });
    if (!InstructorExist) {
      return res.status(404).json({ message: "Instructor not found" });
    }

    await Instructor.findByIdAndDelete(id);

    res.status(201).json({ massage: "Instructor deleted successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server error" });
  }
};

const loginInstructor = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the Instructor exists
    const Instructor = await Instructor.findOne({ email });
    if (!Instructor) {
      return res.status(404).json({ message: "Instructor not found." });
    }

    // Compare the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, Instructor.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid Password." });
    }

    // Remove sensitive information (like password) from the response
    const { password: hashedPassword, ...InstructorWithoutPassword } =
      Instructor.toObject();

    // Successful login
    res.status(200).json({
      message: "Login successful",
      Instructor: InstructorWithoutPassword,
    });
  } catch (error) {
    res.status(500).json({ error: " Opps No user found!" });
  }
};

module.exports = {
  createInstructor,
  getAllInstructors,
  updateInstructor,
  deleteInstructor,
  loginInstructor,
};
