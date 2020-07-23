const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

//DB
const db = require("./db/db");

//Routes
const coffeeRoutes = require("./routes/coffees");

//Create Express App instance
const app = express();

app.use(cors());
app.use(bodyParser.json());

//Routers
app.use("/coffees", coffeeRoutes);

const run = async () => {
  try {
    await db.authenticate();
    console.log("Connection to the database successful!");
  } catch (error) {
    console.error("Error connecting to the database: ", error);
  }

  await app.listen(8000, () => {
    console.log("The application is running on localhost:8000");
  });
};

run();
