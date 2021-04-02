const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const mongoose = require("mongoose");
const config = require("config");
const morgan = require("morgan");
const dotevn = require("dotenv");

const app = express();

app.use(express.json());

dotevn.config({ path: "./config.env" });

const server = http.createServer(app);
const io = socketio(server).sockets;

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

const db = config.get("mongoURI");
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
  })
  .then(() => console.log("MongoDb Connected"))
  .catch((err) => console.log(err));

app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));

const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`Server started on port ${port}`));
