const { DataTypes, Model } = require("sequelize");
const SequelizeSlugify = require("sequelize-slugify");
const db = require("../db");

class Coffee extends Model {}

Coffee.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    slug: {
      type: DataTypes.STRING,
      unique: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
      validate: {
        min: {
          args: 1,
          msg: "Price must be greater or equal to 1",
        },
      },
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: db,
  }
);

SequelizeSlugify.slugifyModel(Coffee, {
  source: ["name"],
});

module.exports = Coffee;
