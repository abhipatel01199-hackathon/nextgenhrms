const express = require("express");
const auth = require("../middleware/authMiddleware");
const {
  checkIn,
  checkOut
} = require("../controllers/attendanceController");


const router = express.Router();

router.post("/check-in", auth, checkIn);
router.post("/check-out", auth, checkOut);

module.exports = router;