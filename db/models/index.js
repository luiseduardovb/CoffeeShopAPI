const Coffee = require("./Coffee");
const Vendor = require("./Vendor");
const User = require("./User");

Vendor.hasMany(Coffee, {
  as: "coffees",
  foreignKey: { fieldName: "vendorId", allowNull: false },
});

Coffee.belongsTo(Vendor, { as: "vendor" });

User.hasOne(Vendor, { foreignKey: "userId" });

Vendor.belongsTo(User, { as: "user", foreignKey: "userId" });

module.exports = { Coffee, Vendor, User };
