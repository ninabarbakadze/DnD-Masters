const { mongoose } = require('../connection');

const { Schema } = mongoose;

const userSchema = new Schema({
  username: String,
  email: String,
  password: String,
  characters: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Character' }],
  // I think this should be association
  maps: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Map' }],
});

const user = mongoose.model('User', userSchema);
module.exports = user;
