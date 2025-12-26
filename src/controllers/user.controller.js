const User = require("../models/User");
const APIFeatures = require("../utils/apiFeatures");
const catchAsync = require("../utils/catchAsync");

exports.getUsers = catchAsync(async (req, res) => {
  const total = await User.countDocuments();

  const features = new APIFeatures(User.find(), req.query)
    .filter()
    .search()
    .paginate();

  const users = await features.query;

  res.status(200).json({
    status: "success",
    results: users.length,
    total,
    data: users
  });
});
