const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema({
  question: String,
  upvotes: { type: Number, default: 0 },
  teamId: mongoose.Schema.Types.ObjectId,
});

module.exports = mongoose.model("Question", QuestionSchema);
