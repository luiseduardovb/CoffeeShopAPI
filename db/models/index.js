const Coffee = require("./Coffee");
const Vendor = require("./Vendor");

Vendor.hasMany(Coffee, {
  as: "coffees",
  foreignKey: { fieldName: "vendorId", allowNull: false },
});

Coffee.belongsTo(Vendor, { as: "vendor" });

module.exports = { Coffee, Vendor };
