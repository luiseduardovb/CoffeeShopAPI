const slugify = require("slugify");

//Data
const { Coffee } = require("../db/models");

exports.coffeeList = async (req, res) => {
  try {
    const coffees = await Coffee.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    res.json(coffees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.coffeeCreate = async (req, res) => {
  try {
    const newCoffee = await Coffee.create(req.body);
    res.status(201).json(newCoffee);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.coffeeUpdate = async (req, res) => {
  try {
    const { coffeeId } = req.params;
    const foundCoffee = await Coffee.findByPk(coffeeId);

    if (foundCoffee) {
      await foundCoffee.update(req.body);
      res.status(204).end();
    } else {
      res.status(404).json({ message: "Coffee not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.coffeeDelete = async (req, res) => {
  try {
    const { coffeeId } = req.params;
    const foundCoffee = await Coffee.findByPk(coffeeId);

    if (foundCoffee) {
      await foundCoffee.destroy();
      res.status(204).end();
    } else {
      res.status(404).json({ message: "Coffee not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
