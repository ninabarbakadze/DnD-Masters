const { mongoose } = require('../connection');
const abilities = require('./subDocuments/abilities.schema');
const skills = require('./subDocuments/skills.schema');
const weapon = require('./subDocuments/weapons.schema');
const spell = require('./subDocuments/spell.schema');
const characterRace = require('./subDocuments/race.schema');
const characterClass = require('./subDocuments/class.schema');
const equipment = require('./subDocuments/equipment.schema');

const { Schema } = mongoose;
const characterSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  xp: {
    type: Number,
    default: 0,
  },
  level: {
    type: Number,
    default: 1,
  },
  characterName: {
    type: String,
    required: true,
  },
  race: characterRace,
  class: characterClass,
  alignment: {
    type: String,
    required: true,
  },
  speedModifier: {
    type: Number,
    default: 0,
  },
  initiativeModifier: {
    type: Number,
    default: 0,
  },
  initiativeAdjustment: {
    type: Number,
    default: 0,
  },
  proficiencyBonus: {
    type: Number,
    default: 2,
  },
  abilityScore: abilities,
  abilityModifier: abilities,
  savingThrow: [String],
  armorClass: {
    type: Number,
    default: 0,
  },
  hitPointsMax: {
    type: Number,
    default: 0,
  },
  hitPointsCurrent: {
    type: Number,
    default: 0,
  },
  hitPointsTemporary: {
    type: Number,
    default: 0,
  },
  hitDice: [String],
  deathSaves: {
    success: { type: Number, default: 0, max: [3, 'max successful saves reached'] },
    failure: { type: Number, default: 0, max: [3, 'max failed saves reached'] },
  },
  advantages: [String],
  disadvantages: [String],
  passivePerceptionAdjustment: {
    type: Number,
    default: 0,
  },
  initiative: {
    type: Number,
    default: 0,
  },
  skills,
  weaponsProficient: [String],
  armorProficient: [String],
  otherProficient: [String],
  saves: [String],
  equipments: [equipment],
  weapons: [weapon],
  damageDice: [String],
  damage: { type: Number, default: 0 },
  spells: [spell],
  currency: {
    CP: Number,
    SP: Number,
    EP: Number,
    GP: Number,
    PP: Number,
  },
});

const character = mongoose.model('Character', characterSchema);
module.exports = character;
// module.exports = characterSchema;
