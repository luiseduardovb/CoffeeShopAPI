const { Sequelize } = require("sequelize");

const db = new Sequelize({
  username: "postgres",
  password: "Kuwaithon.2020",
  database: "coffeebeans_db",
  dialect: "postgres",
  host: "localhost",
});

module.exports = db;
