const { mongoose } = require('../connection');

const  Schema = mongoose.Schema;

const userSchema = new Schema({
  userName: String,
  password: String,
  email: String,
});

const user = mongoose.model('User', userSchema);
module.exports = user;
