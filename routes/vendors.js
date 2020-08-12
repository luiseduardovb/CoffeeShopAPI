const express = require("express");

//Controlers

const {
  coffeeCreate,
  vendorCreate,
  vendorList,
  vendorUpdate,
  vendorDelete,
  fetchVendor,
} = require("../controllers/vendorControlers");

//Middleware
const upload = require("../middleware/multer");
const passport = require("passport");

const router = express.Router();

router.param("vendorId", async (req, res, next, vendorId) => {
  const vendor = await fetchVendor(vendorId, next);
  if (vendor) {
    req.vendor = vendor;
    next();
  } else {
    const err = new Error("Vendor not found");
    err.status = 404;
    next(err);
  }
});

//Coffee Create
router.post("/:vendorId/coffees", upload.single("image"), coffeeCreate);

//Vendor List
router.get("/", vendorList);

//Vendor Create
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  vendorCreate
);

//Vendor Update
router.put(
  "/:vendorId",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  vendorUpdate
);

//Vendor Delete
router.delete(
  "/:vendorId",
  passport.authenticate("jwt", { session: false }),
  vendorDelete
);

module.exports = router;
