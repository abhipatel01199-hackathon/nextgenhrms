const express = require("express");
const auth = require("../middleware/authMiddleware");
const {
  applyLeave,
  myLeaves
} = require("../controllers/leaveController");

const router = express.Router();

router.post("/apply", auth, applyLeave);
router.get("/my", auth, myLeaves);

module.exports = router;