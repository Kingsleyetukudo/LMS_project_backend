const bcrypt = require("bcrypt");
const User = require("../model/userModel");
// const { param } = require("../routes/userRoute");

const createUser = async (req, res) => {
  try {
    const userData = new User(req.body);
    const { email } = userData;
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ message: "User already exists." });
    }

    const saltRounds = 10;

    const salt = await bcrypt.genSalt(saltRounds);

    userData.password = await bcrypt.hash(userData.password, salt);
    const savedUser = await userData.save();

    const { password, ...userDetails } = savedUser.toObject();
    res.status(200).json(userDetails);
  } catch (error) {
    res.status(500).json({ error: "Internal Server error" });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    if (users.length === 0) {
      return res.status(404).json({ Message: "No user founded" });
    }

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Internal Server error" });
  }
};

const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const userExist = await User.findOne({ _id: id });
    if (!userExist) {
      return res.status(404).json({ message: "user not found" });
    }

    const update = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    res.status(201).json(update);
  } catch (error) {
    res.status(500).json({ error: "Internal Server error" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const userExist = await User.findOne({ _id: id });
    if (!userExist) {
      return res.status(404).json({ message: "user not found" });
    }

    await User.findByIdAndDelete(id);

    res.status(201).json({ massage: "User deleted successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server error" });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Compare the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid Password." });
    }

    // Remove sensitive information (like password) from the response
    const { password: hashedPassword, ...userWithoutPassword } =
      user.toObject();

    // Successful login
    res.status(200).json({
      message: "Login successful",
      user: userWithoutPassword,
    });
  } catch (error) {
    res.status(500).json({ error: " Opps No user found!" });
  }
};

module.exports = {
  createUser,
  getAllUsers,
  updateUser,
  deleteUser,
  loginUser,
};
