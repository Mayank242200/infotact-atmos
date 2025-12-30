const express = require("express");
const auth = require("../middleware/auth.middleware");
const Kudos = require("../models/Kudos");
const router = express.Router();

router.post("/", auth, async (req, res) => {
  const kudos = await Kudos.create(req.body);
  global.io.to("company-feed").emit("new_kudos", kudos);
  res.json(kudos);
});

module.exports = router;
