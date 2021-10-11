const { mongoose } = require('../connection');

const { Schema } = mongoose;
const userSchema = new Schema({
  userName: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true, index: { unique: true } },
});

const user = mongoose.model('User', userSchema);
module.exports = user;
