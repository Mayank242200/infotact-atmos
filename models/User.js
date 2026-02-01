const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ["Employee", "Manager", "Admin"] },
  teamId: mongoose.Schema.Types.ObjectId,
});

module.exports = mongoose.model("User", UserSchema);
