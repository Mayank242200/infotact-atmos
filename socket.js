const socketIo = require("socket.io");

module.exports = (server) => {
  const io = socketIo(server, {
    cors: { origin: "*" },
  });

  io.on("connection", (socket) => {
    console.log("🟢 User connected");

    socket.on("join_company", () => {
      socket.join("company-feed");
    });

    socket.on("join_team", (teamId) => {
      socket.join(teamId);
    });

    socket.on("submit_question", (data) => {
      io.to(data.teamId).emit("question_added", data);
    });

    socket.on("upvote_question", (data) => {
      io.to(data.teamId).emit("question_upvoted", data);
    });

    socket.on("disconnect", () => {
      console.log("🔴 User disconnected");
    });
  });

  // make io available in routes
  global.io = io;
};
