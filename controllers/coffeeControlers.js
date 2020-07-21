const slugify = require("slugify");

//Data
let coffees = require("../coffees");

exports.coffeeList = (req, res) => {
  res.json(coffees);
};

exports.coffeeCreate = (req, res) => {
  const id = coffees[coffees.length - 1].id + 1;
  const slug = slugify(req.body.name, { lower: true });
  const newCoffee = { id, slug, ...req.body };
  coffees.push(newCoffee);

  res.status(201).json(newCoffee);
};

exports.coffeeUpdate = (req, res) => {
  const { coffeeId } = req.params;
  const foundCoffee = coffees.find((coffee) => coffee.id === +coffeeId);
  if (foundCoffee) {
    for (const key in req.body) foundCoffee[key] = req.body[key];
    res.status(204).end();
  } else {
    res.status(404).json({ message: "Coffee not found" });
  }
};

exports.coffeeDelete = (req, res) => {
  const { coffeeId } = req.params;

  const foundCoffee = coffees.find((coffee) => coffee.id === +coffeeId);

  if (foundCoffee) {
    coffees = coffees.filter((coffee) => coffee.id !== +coffeeId);
    res.status(204).end();
  } else {
    res.status(404).json({ message: "Coffee not found" });
  }
};
