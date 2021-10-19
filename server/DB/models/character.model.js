const { mongoose } = require('../connection');
const skills = require('./subDocuments/skills.schema');
const abilities = require('./subDocuments/abilities.schema');
const weapon = require('./subDocuments/weapons.schema');
// const spell = require('./subDocuments/spell.schema');
const characterRace = require('./subDocuments/race.schema');
const characterClass = require('./subDocuments/class.schema');
const equipment = require('./subDocuments/equipment.schema');
const languages = require('./subDocuments/traits.scema');
const charDetails = require('./subDocuments/pesonalDetails.Schema');

const { Schema } = mongoose;
const characterSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  name: String,
  xp: {
    type: Number,
    default: 0,
  },
  characterName: {
    type: String,
    required: true,
  },
  alignment: {
    type: String,
    required: true,
  },
  speed: {
    walk: Number,
  },
  initiative: {
    type: Number,
    default: 0,
  },
  proficiencyBonus: {
    type: Number,
    default: 2,
  },
  background: { name: String },
  armorClass: {
    value: {
      type: Number,
      default: 14,
    },
    description: String,
  },

  hitPoints: {
    max: {
      type: Number,
      default: 0,
    },
    current: {
      type: Number,
      default: 0,
    },
    temporary: {
      type: Number,
      default: 0,
    },
  },
  passiveWisdom: {
    type: Number,
    default: 0,
  },
  deathSaves: {
    success: { type: Number, default: 0, max: [3, 'max successful saves reached'] },
    fails: { type: Number, default: 0, max: [3, 'max failed saves reached'] },
  },
  languages: [languages],

  skills,
  details: charDetails,
  abilityScore: abilities,
  savingThrow: [String],
  weapons: [weapon], //
  spells: {
    name: String,
    desc: [String],
  },
  currency: {
    CP: Number,
    SP: Number,
    EP: Number,
    GP: Number,
    PP: Number,
  },
  equipments: [equipment],
  race: characterRace,
  classes: characterClass,
  // armorProficient: [String],
  // otherProficient: [String],
  // saves: [String],
});

const character = mongoose.model('Character', characterSchema);
module.exports = character;
