const bcrypt = require("bcryptjs");
const User = require("../models/User");
const generateToken = require("../utils/generateToken");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");
// Register
exports.register = catchAsync(async (req, res, next) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    return next(new AppError("User already exists", 400));
  }
 

  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({ message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword
  });
res.status(201).json({
  id: user._id,
  name: user.name,
  email: user.email,
  role: user.role,
  token: generateToken(user._id)
});


};

// Login
exports.login = = catchAsync(async (req, res, next) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    return next(new AppError("User already exists", 400));
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

 res.json({
  id: user._id,
  name: user.name,
  email: user.email,
  role: user.role,
  token: generateToken(user._id)
});

};
