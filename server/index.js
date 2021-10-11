require('dotenv/config');

const express = require('express');
const { connect } = require('./DB/connection');
const router = require('./router');

const app = express();

// will changed as DB is developed but for now allows basic set up
// connect();
app.use(express.json());
app.use(router);
app.listen(process.env.SERVER_PORT, () => {
  console.log(`listening on port ${process.env.SERVER_PORT}`);
});
