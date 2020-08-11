const { User } = require("../db/models");
const bcrypt = require("bcrypt");

//Strategies
const LocalStrategy = require("passport-local").Strategy;
const JWTStrategy = require("passport-jwt").Strategy;
const { JWT_SECRET } = require("../config/keys");
const { fromAuthHeaderAsBearerToken } = require("passport-jwt").ExtractJwt;

exports.localStrategy = new LocalStrategy(async (username, password, done) => {
  try {
    const user = await User.findOne({
      where: { username },
    });

    const passwordsMatch = user
      ? await bcrypt.compare(password, user.password)
      : false;

    return passwordsMatch ? done(null, user) : done(null, false);
  } catch (error) {
    done(error);
  }
});

exports.jwtStrategy = new JWTStrategy(
  {
    jwtFromRequest: fromAuthHeaderAsBearerToken(),
    secretOrKey: JWT_SECRET, //challenge
  },
  async (jwtPayload, done) => {
    //Check if token is expired
    //throw a 401 error(unauthorized) if expired
    if (Date.now() > jwtPayload.expires) {
      return done(null, false);
    } else {
      //if token is not expired: fetch the user from model then pass it to req.user
      try {
        const user = await User.findByPk(jwtPayload.id);
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  }
);
