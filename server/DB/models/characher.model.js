const { mongoose } = require('../connection');

const { Schema } = mongoose;
const characterSchema = new Schema({
  userId: {
    type: mongoose.Schema.User.ObjectId,
    ref: 'User',
  },
  currentXp: {
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
  race: {
    type: String,
    required: true,
  },
  class: {
    type: String,
    required: true,
  },
  alignment: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    required: true,
  },
  speed: {
    type: Number,
    default: 0,
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
  abilityScore: {
    STR: {
      type: Number,
      default: 0,
    },
    DEX: {
      type: Number,
      default: 0,
    },
    CON: {
      type: Number,
      default: 0,
    },
    INT: {
      type: Number,
      default: 0,
    },
    WIS: {
      type: Number,
      default: 0,
    },
  },
  abilityModifier: {
    STR: {
      type: Number,
      default: 0,
    },
    DEX: {
      type: Number,
      default: 0,
    },
    CON: {
      type: Number,
      default: 0,
    },
    INT: {
      type: Number,
      default: 0,
    },
    WIS: {
      type: Number,
      default: 0,
    },
  },
  savingThrow: {
    STR: {
      type: Number,
      default: 0,
    },
    DEX: {
      type: Number,
      default: 0,
    },
    CON: {
      type: Number,
      default: 0,
    },
    INT: {
      type: Number,
      default: 0,
    },
    WIS: {
      type: Number,
      default: 0,
    },
  },
  // Proficiency box empty if savingThrow id 0
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
  proficiency: {
    type: Number,
    default: 2,
  },
  skills: {
    athletics: {
      type: Number,
      default: 0,
    },
    acrobatics: {
      type: Number,
      default: 0,
    },
    sleightOfHand: {
      type: Number,
      default: 0,
    },
    stealth: {
      type: Number,
      default: 0,
    },
    intelligence: {
      type: Number,
      default: 0,
    },
    arcana: {
      type: Number,
      default: 0,
    },
    history: {
      type: Number,
      default: 0,
    },
    investigation: {
      type: Number,
      default: 0,
    },
    nature: {
      type: Number,
      default: 0,
    },
    religion: {
      type: Number,
      default: 0,
    },
    wisdom: {
      type: Number,
      default: 0,
    },
    animalHandling: {
      type: Number,
      default: 0,
    },
    insight: {
      type: Number,
      default: 0,
    },
    medicine: {
      type: Number,
      default: 0,
    },
    perception: {
      type: Number,
      default: 0,
    },
    survival: {
      type: Number,
      default: 0,
    },
    charisma: {
      type: Number,
      default: 0,
    },
    deception: {
      type: Number,
      default: 0,
    },
    intimidation: {
      type: Number,
      default: 0,
    },
    performance: {
      type: Number,
      default: 0,
    },
    persuasion: {
      type: Number,
      default: 0,
    },
  },
  saves: [String],
  tools: [String],
  weaponsProficient: [String],
  armorProficient: [String],
  otherProficient: [String],
  // weapons: [weaponSchema],
  // create weapon schema
  // {weapon: String, damageType:String,
  //   range:{type:number, default:5 } attackBonus:{type:number, default:0}}
  damageDice: [String],
  damage: { type: Number, default: 0 },
});

const user = mongoose.model('User', characterSchema);
module.exports = user;
