const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../model/userModel");

const JWT_SECRET = process.env.JWT_SECRET || "some_unknown_keys_and_code";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "1h";

// Login Controller Function
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required." });
    }

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Invalid email or password." });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    // Generate JWT
    const token = jwt.sign(
      { userId: user._id, email: user.email }, // Payload
      JWT_SECRET, // Secret
      { expiresIn: JWT_EXPIRES_IN } // Options
    );

    // Remove sensitive information (like password) from the response
    const { password: hashedPassword, ...userDetails } = user.toObject();

    // Send success response
    res.status(200).json({
      message: "Login successful",
      token,
      userDetails,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

module.exports = { loginController };
