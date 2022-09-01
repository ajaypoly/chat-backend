const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userroutes = require("./routes/userroutes");
const messagesRoute = require("./routes/messagesRoute");
const socket = require("socket.io");
const morgan = require("morgan");

const app = express();
require("dotenv").config();

app.use(cors());
app.use(express.json());

app.use(morgan("tiny"));

app.use("/api/message", messagesRoute);
app.use("/api/auth", userroutes);

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("db connection established");
  })
  .catch((err) => {
    console.log(err.message);
  });
const server = app.listen(process.env.PORT, () => {
  console.log(`server stsrted on port ${process.env.PORT}`);
});

const io = socket(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});

global.onlineUsers = new Map();
io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    global.onlineUsers.set(userId, socket.id);
  });
  socket.on("send-msg",(data)=>{
    const sendUserSocket = global.onlineUsers.get(data.to)
    if(sendUserSocket){
      socket.to(sendUserSocket).emit("msg-recived",data.message)
    }
  })
});
