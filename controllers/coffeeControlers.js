const slugify = require("slugify");

//Data
const { Coffee } = require("../db/models");

exports.coffeeList = async (req, res, next) => {
  try {
    const coffees = await Coffee.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    res.json(coffees);
  } catch (error) {
    next(error);
  }
};

exports.coffeeCreate = async (req, res, next) => {
  try {
    const newCoffee = await Coffee.create(req.body);
    res.status(201).json(newCoffee);
  } catch (error) {
    next(error);
  }
};

exports.coffeeUpdate = async (req, res, next) => {
  try {
    const { coffeeId } = req.params;
    const foundCoffee = await Coffee.findByPk(coffeeId);

    if (foundCoffee) {
      await foundCoffee.update(req.body);
      res.status(204).end();
    } else {
      const err = new Error("Coffee not found");
      err.status = 404;
      next(err);
    }
  } catch (error) {
    next(error);
  }
};

exports.coffeeDelete = async (req, res, next) => {
  try {
    const { coffeeId } = req.params;
    const foundCoffee = await Coffee.findByPk(coffeeId);

    if (foundCoffee) {
      await foundCoffee.destroy();
      res.status(204).end();
    } else {
      const err = new Error("Coffee not found");
      err.status = 404;
      next(err);
    }
  } catch (error) {
    next(error);
  }
};
