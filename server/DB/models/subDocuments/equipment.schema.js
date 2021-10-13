const { mongoose } = require('../../connection');

const { Schema } = mongoose;
const equipmentSchema = new Schema({
  name: String,
  quantity: Number,
});
module.exports = equipmentSchema;
