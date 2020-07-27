const slugify = require("slugify");

//Data
const { Coffee } = require("../db/models");

exports.fetchCoffee = async (coffeeId, next) => {
  try {
    const coffee = await Coffee.findByPk(coffeeId);
    return coffee;
  } catch (error) {
    next(error);
  }
};
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
    if (req.file) {
      req.body.image = `${req.protocol}://${req.get("host")}/media/${
        req.file.filename
      }`;
    }
    const newCoffee = await Coffee.create(req.body);
    res.status(201).json(newCoffee);
  } catch (error) {
    next(error);
  }
};

exports.coffeeUpdate = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `${req.protocol}://${req.get("host")}/media/${
        req.file.filename
      }`;
    }
    await req.coffee.update(req.body);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

exports.coffeeDelete = async (req, res, next) => {
  try {
    await req.coffee.destroy();
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};
