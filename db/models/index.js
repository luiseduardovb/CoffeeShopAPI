const Coffee = require("./Coffee");
const Order = require("./Order");
const User = require("./User");
const Vendor = require("./Vendor");

Vendor.hasMany(Coffee, {
  as: "coffees",
  foreignKey: { fieldName: "vendorId", allowNull: false },
});

Coffee.belongsTo(Vendor, { as: "vendor" });

User.hasOne(Vendor, { foreignKey: "userId" });

Vendor.belongsTo(User, { as: "user", foreignKey: "userId" });

User.hasMany(Order, { as: "orders", foreignKey: "userId" });
Order.belongsTo(User, { as: "user" });

module.exports = { Coffee, Order, User, Vendor };
