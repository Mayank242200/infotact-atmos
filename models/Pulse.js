const mongoose = require("mongoose");

const PulseSchema = new mongoose.Schema({
  teamId: mongoose.Schema.Types.ObjectId,
  status: { type: String, enum: ["Light", "Good", "Heavy"] },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Pulse", PulseSchema);
