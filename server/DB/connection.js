const mongoose = require('mongoose');

async function connect() {
  try {
    await mongoose.connect(`mongodb://localhost:${process.env.DB_PORT}/${process.env.DB_NAME}`);
    console.log('db connected');
  } catch (err) {
    console.log(err);
  }
}

module.exports = { connect };
