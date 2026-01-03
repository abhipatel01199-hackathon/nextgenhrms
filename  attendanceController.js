const Attendance = require("../models/Attendance");

exports.checkIn = async (req, res) => {
  const today = new Date().toISOString().split("T")[0];

  const existing = await Attendance.findOne({ userId: req.user.id, date: today });
  if (existing) return res.status(400).json({ message: "Already checked in" });

  await Attendance.create({
    userId: req.user.id,
    date: today,
    checkIn: new Date()
  });

  res.json({ message: "Checked in" });
};

exports.checkOut = async (req, res) => {
  const today = new Date().toISOString().split("T")[0];

  const attendance = await Attendance.findOne({ userId: req.user.id, date: today });
  if (!attendance || attendance.checkOut)
    return res.status(400).json({ message: "Invalid checkout" });

  attendance.checkOut = new Date();
  await attendance.save();

  res.json({ message: "Checked out" });
};