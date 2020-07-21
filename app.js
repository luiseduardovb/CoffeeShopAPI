const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

//Routes
const coffeeRoutes = require("./routes/coffees");

//Create Express App instance
const app = express();

app.use(cors());
app.use(bodyParser.json());

//Routers
app.use("/coffees", coffeeRoutes);

app.listen(8000, () => {
  console.log("The app is running on localhost:8000");
});
