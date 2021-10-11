const mongoose = require('mongoose');

try {
  mongoose.connect(`mongodb://localhost:${process.env.DB_PORT}/${process.env.DB_NAME}`, { useNewUrlParser: true, useUnifiedTopology: true });
  console.log('db connected');
} catch (err) {
  console.log(err);
}

module.exports = { mongoose };
