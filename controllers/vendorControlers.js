const slugify = require("slugify");

//Data
const { Vendor, Coffee } = require("../db/models");

exports.fetchVendor = async (vendorId, next) => {
  try {
    const vendor = await Vendor.findByPk(vendorId);
    return vendor;
  } catch (error) {
    next(error);
  }
};
exports.vendorList = async (req, res, next) => {
  try {
    const vendors = await Vendor.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
      include: [
        {
          model: Coffee,
          as: "coffees",
          attributes: ["id"],
        },
      ],
    });
    res.json(vendors);
  } catch (error) {
    next(error);
  }
};

exports.vendorCreate = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `${req.protocol}://${req.get("host")}/media/${
        req.file.filename
      }`;
    }
    const newVendor = await Vendor.create(req.body);
    res.status(201).json(newVendor);
  } catch (error) {
    next(error);
  }
};

exports.vendorUpdate = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `${req.protocol}://${req.get("host")}/media/${
        req.file.filename
      }`;
    }
    await req.vendor.update(req.body);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

exports.vendorDelete = async (req, res, next) => {
  try {
    await req.vendor.destroy();
    res.status(204).end();
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
    req.body.vendorId = req.vendor.id;
    const newCoffee = await Coffee.create(req.body);
    res.status(201).json(newCoffee);
  } catch (error) {
    next(error);
  }
};
