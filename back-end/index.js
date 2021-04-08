const express = require("express");
const db = require("./models/");
const app = express();
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 3000;
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.post("/quotes", (req, res) => {
  console.log("Hellooooooooooooooooo!");
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
