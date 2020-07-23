const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

//DB
const db = require("./db/index");

//Routes
const coffeeRoutes = require("./routes/coffees");
const { Coffee } = require("./db/models");

//Create Express App instance
const app = express();

app.use(cors());
app.use(bodyParser.json());

//Routers
app.use("/coffees", coffeeRoutes);

const run = async () => {
  try {
    await db.sync();
  } catch (error) {
    console.log("run->error", error);
  }

  await app.listen(8000, () => {
    console.log("The application is running on localhost:8000");
  });
};

run();
