const { mongoose } = require('../connection');

const { Schema } = mongoose;

const userSchema = new Schema({
  username: String,
  email: String,
  password: String,
  characters: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
});

const user = mongoose.model('User', userSchema);
module.exports = user;
