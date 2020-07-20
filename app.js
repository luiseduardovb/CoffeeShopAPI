const express = require("express");

//Data
let coffees = require("./coffees");

const cors = require("cors");

//Create Express App instance
const app = express();

app.use(cors());

app.get("/coffees", (req, res) => {
  res.json(coffees);
});

//Coffee Delete

app.delete("/coffees/:coffeeId", (req, res) => {
  const { coffeeId } = req.params;

  const foundCoffee = coffees.find((coffee) => coffee.id === +coffeeId);

  if (foundCoffee) {
    coffees = coffees.filter((coffee) => coffee.id !== +coffeeId);
    res.status(204).end();
  } else {
    res.status(404).json({ message: "Coffee not found" });
  }
});

app.listen(8000, () => {
  console.log("The app is running on localhost:8000");
});
