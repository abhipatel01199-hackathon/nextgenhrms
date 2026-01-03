const User = require("../models/User");
const Leave = require("../models/Leave");
const Attendance = require("../models/Attendance");

exports.dashboard = async (req, res) => {
  const employees = await User.countDocuments({ role: "EMPLOYEE" });
  const pendingLeaves = await Leave.countDocuments({ status: "Pending" });
  res.json({ employees, pendingLeaves });
};

exports.updateLeave = async (req, res) => {
  const { status } = req.body;
  await Leave.findByIdAndUpdate(req.params.id, { status });
  res.json({ message: "Updated" });
};