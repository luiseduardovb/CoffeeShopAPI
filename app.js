const express = require("express");

const coffees = require("./coffees");

const cors = require("cors");

const app = express();

app.use(cors());

app.get("/coffees", (req, res) => {
  res.json(coffees);
});

app.get("/", (req, res) => {
  console.log("Hello");
  res.json({ message: "Hello World" });
});

app.listen(8000, () => {
  console.log("The app is running on localhost:8000");
});
