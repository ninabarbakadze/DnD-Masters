require('dotenv/config');
const passport = require('passport');
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const session = require('express-session');
// passport related
// const bcrypt = require('bcryptjs');
// const LocalStrategy = require('passport-local').Strategy;
const router = require('./router');
// const User = require('./DB/models/user.model');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: process.env.CLIENT_URL, // <-- url of the react app we are connecting to
  credentials: true,
}));
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
}));
app.use(cookieParser(process.env.SESSION_SECRET));
app.use(passport.initialize());
app.use(passport.session());
require('./passportConfig')(passport);

app.use(router);

app.listen(process.env.SERVER_PORT || 4000, () => {
  console.log(`listening on port ${process.env.SERVER_PORT}`);
});
