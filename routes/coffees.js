const express = require("express");

//Controlers

const {
  coffeeList,
  coffeeUpdate,
  coffeeDelete,
  fetchCoffee,
} = require("../controllers/coffeeControlers");

//Middleware
const upload = require("../middleware/multer");

const router = express.Router();

router.param("coffeeId", async (req, res, next, coffeeId) => {
  const coffee = await fetchCoffee(coffeeId, next);
  if (coffee) {
    req.coffee = coffee;
    next();
  } else {
    const err = new Error("Coffee not found");
    err.status = 404;
    next(err);
  }
});

//Coffee List
router.get("/", coffeeList);

//Coffee Update
router.put("/:coffeeId", upload.single("image"), coffeeUpdate);

//Coffee Delete
router.delete("/:coffeeId", coffeeDelete);

module.exports = router;
