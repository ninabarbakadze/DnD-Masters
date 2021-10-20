const bcrypt = require('bcryptjs');
const passport = require('passport');
const User = require('../DB/models/user.model');

const logIn = (req, res, next) => {
  try {
    passport.authenticate('local', (err, user) => {
      if (err) throw err;
      if (!user) res.send({ status: 'No User Exists' });
      else {
        req.logIn(user, (error) => {
          if (error) throw error;
          res.send(user);
        });
      }
    })(req, res, next);
  } catch (err) {
    res.status(500).send(err);
  }
};

const register = (req, res) => {
  try {
    User.findOne({ username: req.body.username }, async (err, user) => {
      if (err) throw err;
      if (user) {
        res.send({ status: 'User Already Exists' });
      } else {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const newUser = new User({
          username: req.body.username,
          password: hashedPassword,
        });
        const created = await newUser.save();
        res.status(200);
        res.send(created);
      }
    });
  } catch (err) {
    res.status(500);
    res.send(err);
  }
};

const getUser = (req, res) => {
  res.send(req.user); // <--- req.user stires the entire authenticated user
};

module.exports = { register, logIn, getUser };
