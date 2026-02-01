const mongoose = require("mongoose"); // ✅ ADD THIS LINE

const KudosSchema = new mongoose.Schema({
  from: String,
  message: String,
  teamId: mongoose.Schema.Types.ObjectId,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Kudos", KudosSchema);
