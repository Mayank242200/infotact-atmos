const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const router = express.Router();

router.post("/login", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(404).json({ msg: "User not found" });

  // (For now plain compare – mention bcrypt improvement in interview)
  if (user.password !== req.body.password) {
    return res.status(401).json({ msg: "Invalid credentials" });
  }

  const token = jwt.sign(
    { id: user._id, role: user.role, teamId: user.teamId },
    "SECRET"
  );

  res.json({ token });
});

module.exports = router;
