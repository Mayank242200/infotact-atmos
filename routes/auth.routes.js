const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const router = express.Router();

router.post("/login", async (req, res) => {
  console.log("🔥 LOGIN HIT", req.body);
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(404).json({ msg: "User not found" });

  const token = jwt.sign(
    { id: user._id, role: user.role, teamId: user.teamId },
    "SECRET"
  );

  res.json({ token });
});
console.log("✅ auth.routes loaded");

module.exports = router;
