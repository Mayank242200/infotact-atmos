const express = require("express");
const auth = require("../middleware/auth.middleware");
const role = require("../middleware/role.middleware");
const Pulse = require("../models/Pulse");
const router = express.Router();

// EMPLOYEES submit pulse
router.post("/submit", auth, role(["Employee"]), async (req, res) => {
  await Pulse.create({
    teamId: req.user.teamId,
    status: req.body.status,
  });

  // aggregation
  const pulses = await Pulse.find({ teamId: req.user.teamId });

  const summary = {
    Light: pulses.filter((p) => p.status === "Light").length,
    Good: pulses.filter((p) => p.status === "Good").length,
    Heavy: pulses.filter((p) => p.status === "Heavy").length,
  };

  // live update to managers
  global.io.to(req.user.teamId).emit("pulse_update", summary);

  res.json({ msg: "Pulse submitted" });
});

// MANAGERS view pulse summary
router.get("/summary", auth, role(["Manager"]), async (req, res) => {
  const pulses = await Pulse.find({ teamId: req.user.teamId });

  const summary = {
    Light: pulses.filter((p) => p.status === "Light").length,
    Good: pulses.filter((p) => p.status === "Good").length,
    Heavy: pulses.filter((p) => p.status === "Heavy").length,
  };

  res.json(summary);
});

module.exports = router;
