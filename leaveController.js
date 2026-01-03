const Leave = require("../models/Leave");

exports.applyLeave = async (req, res) => {
  const leave = await Leave.create({ ...req.body, userId: req.user.id });
  res.json(leave);
};

exports.myLeaves = async (req, res) => {
  const leaves = await Leave.find({ userId: req.user.id });
  res.json(leaves);
};
