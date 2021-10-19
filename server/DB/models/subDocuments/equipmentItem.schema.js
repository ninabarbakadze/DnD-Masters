const { mongoose } = require('../../connection');

const { Schema } = mongoose;
const equipmentItemSchema = new Schema({
  index: String,
  name: String,
  url: String,
});
module.exports = equipmentItemSchema;
