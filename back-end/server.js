// #!/usr/bin/env node
// const server = require("./app");

// const port = 5000 || process.env.PORT; //port to listen to for requests

// const listener = server.listen(port, () => {
//   console.log(`Server running on port: ${port}`);
// });

// const close = () => {
//   listener.close();
// };

// module.exports = {
//   close: close,
// };
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
  keepAlive: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB connection established");
});

const playlistsRouter = require("./routes/playlists");
const usersRouter = require("./routes/users");

app.use("/playlists", playlistsRouter);
app.use("/users", usersRouter);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
