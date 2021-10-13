const { mongoose } = require('../../connection');

const { Schema } = mongoose;
const classSchema = new Schema({
  name: String,
  hitDie: Number,

});
module.exports = classSchema;
