const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const passport = require("passport");
const { Coffee } = require("./db/models");
const { Vendor } = require("./db/models");
const { User } = require("./db/models");
const { localStrategy, jwtStrategy } = require("./middleware/passport");

//DB
const db = require("./db/index");

//Routes
const coffeeRoutes = require("./routes/coffees");
const vendorRoutes = require("./routes/vendors");
const userRoutes = require("./routes/users");

//Create Express App instance
const app = express();

//Passport Setup
app.use(passport.initialize());
passport.use(localStrategy);
passport.use(jwtStrategy);

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

const PORT = process.env.PORT || 8000;

const run = async () => {
  try {
    await db.sync({ force: true });
  } catch (error) {
    console.log("run->error", error);
  }

  await app.listen(PORT, () =>
    console.log(`The application is running on localhost:${PORT}`)
  );
};

run();
