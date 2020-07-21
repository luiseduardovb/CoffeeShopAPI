const express = require("express");

//Controlers

const {
  coffeeCreate,
  coffeeList,
  coffeeUpdate,
  coffeeDelete,
} = require("../controllers/coffeeControlers");

const router = express.Router();

//Coffee List
router.get("/", coffeeList);

//Coffee Create
router.post("/", coffeeCreate);

//Coffee Update
router.put("/:coffeeId", coffeeUpdate);

//Coffee Delete
router.delete("/:coffeeId", coffeeDelete);

module.exports = router;
