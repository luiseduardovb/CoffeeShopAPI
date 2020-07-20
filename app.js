const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const slugify = require("slugify");

//Data
let coffees = require("./coffees");

//Create Express App instance
const app = express();

app.use(cors());
app.use(bodyParser.json());

//Coffee List
app.get("/coffees", (req, res) => {
  res.json(coffees);
});

//Coffee Create
app.post("/coffees", (req, res) => {
  const id = coffees[coffees.length - 1].id + 1;
  const slug = slugify(req.body.name, { lower: true });
  const newCoffee = { id, slug, ...req.body };
  coffees.push(newCoffee);

  res.status(201).json(newCoffee);
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
