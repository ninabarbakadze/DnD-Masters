/* eslint-disable max-len */
const mockCharacter:any = {
  name: 'Sample Dragonborn Sorcerer',
  player: {
    name: ' Registered User Name',
  },
  characterName: 'EDON',
  xp: 1,
  race: {
    name: 'Dragonborn',
    subtype: 'Silver',
    traits: [
      {
        name: 'Damage Resistance - Cold',
        description: 'You have resistance to the damage type associated with your draconic ancestry.',
      },
      {
        name: 'Dragon Ancestor',
        // eslint-disable-next-line max-len
        description: 'Whenever you make a Charisma check when interacting with dragons, your proficiency is doubled if it applies to the check.',
      },
    ],
  },
  classes: [{
    name: 'Sorcerer',
    subtype: 'Draconic Ancestor',
    level: 1,
    hitDie: 6,
    spellCasting: 'cha',
    features: [
      {
        name: 'Spellcasting',
        // eslint-disable-next-line max-len
        description: "To cast a spell, you must expend a slot of the spell's level or higher. You regain all expended spell slots when you finish a long rest.",
      },
      {
        name: 'Draconic Resilience',
        description: "As magic flows through your body, it causes physical traits of your dragon ancestor to emerge. Your hit point maximum increases by 1 at 1st level and whenever you gain a sorcerer level.\nAdditionally, parts of your body are covered by a thin sheen of dragonlike scales. When you aren't wearing armor, your AC equals 13 + your Dexterity modifier.",
      },
      {
        name: 'Elemental Affinity',
        description: 'Starting at 6th level, when you cast a spell that deals damage of the type associated with your draconic ancestry, you can add your Charisma modifier to one damage roll of that spell. At the same time, you can spend 1 sorcery point to gain resistance to that damage type for 1 hour.',
      },
      {
        name: 'Dragon Wings',
        description: "At 14th level, you gain the ability to sprout a pair of dragon wings from your back, gaining a flying speed equal to your current speed. You can create these wings as a bonus action on your turn. They last until you dismiss them as a bonus action on your turn.\nYou can't manifest your wings while wearing armor unless the armor is made to accommodate them, and clothing not made to accommodate your wings might be destroyed when you manifest them.",
      },
      {
        name: 'Draconic Presence',
        description: 'Beginning at 18th level, you can channel the dread presence of your dragon ancestor, causing those around you to become awestruck or frightened. As an action, you can spend 5 sorcery points to draw on this power and exude an aura of awe or fear (your choice) to a distance of 60 feet. For 1 minute or until you lose your concentration (as if you were casting a concentration spell), each hostile creature that starts its turn in this aura must succeed on a Wisdom saving throw or be charmed (if you chose awe) or frightened (if you chose fear) until the aura ends. A creature that succeeds on this saving throw is immune to your aura for 24 hours.',
      },
    ],
  }],
  alignment: 'neutral good',
  speed: {
    walk: 30,
  },
  hitPoints: {
    max: 9,
    current: 5,
  },
  abilityScores: [
    { name: 'Strength', scores: 11, proficient: true },
    { name: 'Dexterity', scores: 19, proficient: false },
    { name: 'Constitution', scores: 8, proficient: true },
    { name: 'Intelligence', scores: 7, proficient: false },
    { name: 'Wisdom', scores: 13, proficient: false },
    { name: 'Charisma', scores: 15, proficient: false },
  ],
  skills: [
    { name: 'Acrobatics', ability: 'Dexterity', proficient: false },
    { name: 'Animal Handling', ability: 'Wisdom', proficient: false },
    { name: 'Arcana', ability: 'Intelligence', proficient: true },
    { name: 'Athletics', ability: 'Strength', proficient: true },
    { name: 'Deception', ability: 'Charisma', proficient: false },
    { name: 'History', ability: 'Intelligence', proficient: false },
    { name: 'Insight', ability: 'Wisdom', proficient: false },
    { name: 'Intimidation', ability: 'Charisma', proficient: false },
    { name: 'Investigation', ability: 'Intelligence', proficient: false },
    { name: 'Medicine', ability: 'Wisdom', proficient: false },
    { name: 'Nature', ability: 'Intelligence', proficient: false },
    { name: 'Perception', ability: 'Wisdom', proficient: true },
    { name: 'Performance', ability: 'Charisma', proficient: false },
    { name: 'Persuasion', ability: 'Charisma', proficient: false },
    { name: 'Religion', ability: 'Intelligence', proficient: false },
    { name: 'Sleight of Hand', ability: 'Dexterity', proficient: false },
    { name: 'Stealth', ability: 'Dexterity', proficient: false },
    { name: 'Survival', ability: 'Wisdom', proficient: false },
  ],
  armorClass: {
    value: 14,
    description: 'natural armor',
  },
  // savingThrows: [
  //   { name: 'Strength', proficient: false },
  //   { name: 'Dexterity', proficient: false },
  //   { name: 'Constitution', proficient: true },
  //   { name: 'Intelligence', proficient: false },
  //   { name: 'Wisdom', proficient: false },
  //   { name: 'Charisma', proficient: true },
  // ],
  languages: ['Common', 'Draconic', 'Sylvan'],
  background: {
    name: 'Outlander',
  },
  details: {
    personality: "You once ran 25 miles to warn your clan of an approaching threat, and you'd do the same again.",
    ideal: 'To dishonor yourself is to dishonor the clan.',
    bond: 'Your clan is the most important thing in your life, even when they are far from you.',
    flaw: " It is nature's way that the strong survive and the weak perish.",
  },
  weapons: [
    {
      name: 'Quarterstaff',
      damage: {
        dice: {
          sides: 6,
          count: 1,
        },
        type: 'Bludgeoning',
      },
      equipped: true,
      properties: {
        Versatile: true,
      },
    },
    {
      name: 'Dagger',
      damage: {
        dice: {
          sides: 4,
          count: 1,
          mod: 1,
        },
        type: 'Piercing',
      },
      throw_range: {
        short: 20,
        long: 60,
      },
      properties: {
        Finesse: true,
        Light: true,
        Thrown: true,
      },
    },
  ],
  spells: [
    {
      name: 'Cold Breath',
      description: "Each creature in the area must make a DC (8 + CON modifier + proficiency bonus) CON saving throw, taking 2d6 cold damage on a failed save, and half as much damage on a successful one. You can't use it again until you complete a short or Long Rest.",
      level: 'Cantrip',
      casting_time: '1 Action',
      range_area: '15 ft. cone',
      attack_save: 'con',
      duration: 'Instantaneous',
      damage_effect: 'Cold',
      components: ['V', 'S'],
    },
    {
      name: 'Blade Ward',
      description: 'See PHB',
      level: 'Cantrip',
      casting_time: '1 Action',
      range_area: 'Self',
      duration: '1 Round',
      damage_effect: 'Combat',
      components: ['V', 'S'],
      school: 'Abjuration',
    },
    {
      name: 'True Strike',
      description: 'See PHB',
      level: 'Cantrip',
      casting_time: '1 Action',
      range_area: '30 ft.',
      duration: '1 Round',
      damage_effect: 'Foreknowledge',
      components: ['S'],
      school: 'Divination',
    },
  ],
  proficiencies: [
    {
      index: 'light-armor',
      name: 'Light Armor',
    },
    {
      index: 'medium-armor',
      name: 'Medium Armor',
    },
    {
      index: 'shields',
      name: 'Shields',
    },
    {
      index: 'simple-weapons',
      name: 'Simple Weapons',
    },
    {
      index: 'martial-weapons',
      name: 'Martial Weapons',
    },
  ],
  equipments: [
    {
      equipment: {
        index: 'explorers-pack',
        name: "Explorer's Pack",
      },
      quantity: 1,
    },
    {
      equipment: {
        index: 'javelin',
        name: 'Javelin',
      },
      quantity: 4,
    },

    {
      equipment: {
        index: 'greataxe',
        name: 'Greataxe',

      },
      quantity: 1,
    },
  ],
};
export default mockCharacter;
