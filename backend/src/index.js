const express = require("express");
const cors = require("cors");
require("dotenv").config();
const bodyParser = require("body-parser");

const otpRoutes = require("./otp-verify/routes/otpRouter");
const loginRoutes = require("../src/login/routes/loginRoutes");
const roomRoutes = require("./room-chat/route/room-routes");
const searchRoute = require("./searchUser/routes/search-routes");
const chatRoutes = require("./chat-sockets/routes/chatRoute");

const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");

app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(bodyParser.json());

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});
io.on("connection", (socket) => {
  socket.on("register", (username) => {
    socket.data.username = username;
  });
  socket.on("join private", ({ withUser }) => {
    socket.join(withUser);
  });
  socket.on("private", ({ to, message }) => {
    socket.to(to).emit("private", {
      from: socket.data.username,
      message
    });
  });
});

app.use("/otp", otpRoutes);
app.use("/", loginRoutes);
app.use("/room", roomRoutes);
app.use("/search", searchRoute);
app.use("/chat", chatRoutes);

server.listen(3001, () => {
});
