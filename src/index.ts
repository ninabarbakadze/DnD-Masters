import 'dotenv/config';

// require('dotenv').config();
const express = require('express');

const app = express();

app.listen(process.env.SERVER_PORT, () => {
  console.log(`listening on port ${process.env.SERVER_PORT}`);
});
