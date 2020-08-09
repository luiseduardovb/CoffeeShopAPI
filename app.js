const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const { Coffee } = require("./db/models");
const { Vendor } = require("./db/models");
const { User } = require("./db/models");
//DB
const db = require("./db/index");

//Routes
const coffeeRoutes = require("./routes/coffees");
const vendorRoutes = require("./routes/vendors");
const userRoutes = require("./routes/users");

//Create Express App instance
const app = express();

app.use(cors());
app.use(bodyParser.json());

//Routers
app.use("/coffees", coffeeRoutes);
app.use("/media", express.static(path.join(__dirname, "media")));
app.use("/vendors", vendorRoutes);
app.use(userRoutes);

// Non Existing Path Middleware
app.use((req, res, next) => {
  // res.status(404).json({ message: "Path Not Found" });
  const err = new Error("Path not Found");
  err.status = 404;
  next(error);
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json(err.message || "Internal Server Error");
});

const run = async () => {
  try {
    await db.sync({ alter: true });
  } catch (error) {
    console.log("run->error", error);
  }

  await app.listen(8000, () => {
    console.log("The application is running on localhost:8000");
  });
};

run();
