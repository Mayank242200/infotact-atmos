const express = require("express");
const auth = require("../middleware/auth.middleware");
const Pulse = require("../models/Pulse");
const router = express.Router();

router.post("/", auth, async (req, res) => {
  await Pulse.create({
    teamId: req.user.teamId,
    status: req.body.status,
  });
  res.json({ msg: "Pulse submitted" });
});

module.exports = router;
