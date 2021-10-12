const { mongoose } = require('../connection');

const { Schema } = mongoose;

const userSchema = new Schema({
  username: String,
  email: String,
  password: String,
});

const user = mongoose.model('User', userSchema);
module.exports = user;
