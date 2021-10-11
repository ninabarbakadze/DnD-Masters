require('dotenv/config');

const express = require('express');
const { connect } = require('./DB/connection.js');

const app = express();

// will changed as DB is developed but for now allows basic set up
connect();

app.listen(process.env.SERVER_PORT, () => {
  console.log(`listening on port ${process.env.SERVER_PORT}`);
});
