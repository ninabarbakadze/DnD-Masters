const { mongoose } = require('../../connection');
const equipmentItem = require('./equipmentItem.schema');

const { Schema } = mongoose;
const equipmentSchema = new Schema({
  equipment: equipmentItem,
  quantity: Number,
});
module.exports = equipmentSchema;
