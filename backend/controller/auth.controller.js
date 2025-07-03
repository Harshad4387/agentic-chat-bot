const User = require('../models/user.model.js');
const bcrypt = require("bcryptjs");
const generatejwt = require("../utils/generatetoken.js");

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are mandatory" });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      passwordHash
    });

    await newUser.save();
    await generatejwt(newUser._id, res);

    res.status(201).json({
      id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      createdAt: newUser.createdAt
    });

  } catch (error) {
    console.log("Signup error:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    await generatejwt(user._id, res);

    res.status(200).json({
      id: user._id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt
    });

  } catch (error) {
    console.log("Login error:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

const logout = async (req, res) => {
  try {
    res.cookie("jwt", "", {
      httpOnly: true,
      secure: true
    });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Logout error:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

const checkauth = async (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.log("CheckAuth error:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// NOTE: updateprofile is removed since your User model doesn't include profilePic.
// You can add that field later and reimplement it if needed.

module.exports = { signup, login, logout, checkauth };
