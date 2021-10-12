require('dotenv/config');
const express = require('express');
const router = require('./router');

const app = express();
app.use(express.json());
app.use(router);
app.listen(process.env.SERVER_PORT, () => {
  console.log(`listening on port ${process.env.SERVER_PORT}`);
});
