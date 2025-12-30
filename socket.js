const socketIo = require("socket.io");
const Question = require("./models/Question");

module.exports = (server) => {
  const io = socketIo(server, { cors: { origin: "*" } });

  io.on("connection", (socket) => {
    console.log("🟢 User connected");

    socket.on("join_company", () => {
      socket.join("company-feed");
    });

    socket.on("join_team", (teamId) => {
      socket.join(teamId);
    });

    // 🔥 SUBMIT QUESTION
    socket.on("submit_question", async (data) => {
      const question = await Question.create({
        question: data.question,
        teamId: data.teamId,
      });

      io.to(data.teamId).emit("question_added", question);
    });

    // 🔥 UPVOTE
    socket.on("upvote_question", async (id) => {
      const question = await Question.findByIdAndUpdate(
        id,
        { $inc: { upvotes: 1 } },
        { new: true }
      );

      io.to(question.teamId.toString()).emit("question_upvoted", question);
    });

    socket.on("disconnect", () => {
      console.log("🔴 User disconnected");
    });
  });

  global.io = io;
};
