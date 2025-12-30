const express = require("express");
const http = require("http");
const cors = require("cors");
const connectDB = require("./config/db");
const socketInit = require("./socket");

const app = express();
const server = http.createServer(app);

connectDB();
app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/kudos", require("./routes/kudos.routes"));
app.use("/api/pulse", require("./routes/pulse.routes"));

app.get("/", (req, res) => {
  console.log("🔥 ROOT HIT");
  res.send("SERVER WORKING");
});

app.post("/test", (req, res) => {
  console.log("🔥 TEST HIT");
  res.json({ ok: true });
});

socketInit(server);

server.listen(5001, () => {
  console.log("🚀 Server running on port 5001");
});
