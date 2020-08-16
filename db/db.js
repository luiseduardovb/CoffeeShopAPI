const { Sequelize } = require("sequelize");

const db = process.env.DATABASE_URL
  ? new Sequelize(process.env.DATABASE_URL, {
      dialect: "postgres",
      logging: false,
    })
  : new Sequelize({
      username: "postgres",
      password: "Kuwaithon.2020",
      database: "coffeebeans_db",
      dialect: "postgres",
      host: "localhost",
    });

module.exports = db;
