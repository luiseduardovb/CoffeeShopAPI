const Coffee = require("./Coffee");
const Order = require("./Order");
const OrderItem = require("./OrderItem");
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

Order.belongsToMany(Coffee, { through: OrderItem, foreignKey: "orderId" });
Coffee.belongsToMany(Order, { through: OrderItem, foreignKey: "coffeeId" });

module.exports = { Coffee, Order, User, Vendor };
