const { User, Vendor } = require("../db/models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_EXPIRY_MS, JWT_SECRET } = require("../config/keys");

exports.signup = async (req, res, next) => {
  try {
    const saltRounds = 10;
    const { password } = req.body;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    req.body.password = hashedPassword;
    const newUser = await User.create(req.body);
    const payload = {
      id: newUser.id,
      username: newUser.username,
      email: newUser.email,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      role: newUser.role,
      vendorSlug: null,
      exp: Date.now() + JWT_EXPIRY_MS,
    };

    const token = jwt.sign(JSON.stringify(payload), JWT_SECRET);
    res.status(201).json({ token });
  } catch (error) {
    next(error);
  }
};

exports.signin = async (req, res) => {
  const { user } = req;
  const vendor = await Vendor.findOne({ where: { userId: user.id } });
  const payload = {
    id: user.id,
    username: user.username,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    role: user.role,
    vendorSlug: vendor ? vendor.slug : null,
    exp: Date.now() + JWT_EXPIRY_MS,
  };
  const token = jwt.sign(JSON.stringify(payload), JWT_SECRET);
  res.json({ token });
};
