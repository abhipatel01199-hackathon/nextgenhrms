const express = require("express");
const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");
const {
  dashboard,
  updateLeave
} = require("../controllers/adminController");

const router = express.Router();

router.get("/dashboard", auth, role("ADMIN"), dashboard);
router.put("/leave/:id", auth, role("ADMIN"), updateLeave);

module.exports = router;