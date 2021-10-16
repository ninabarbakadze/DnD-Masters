const mockCharackter = {
  name: 'Sample Dragonborn Sorcerer',
  player: {
    name: 'You',
  },
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
        description: 'Whenever you make a Charisma check when interacting with dragons, your proficiency is doubled if it applies to the check.',
      },
    ],
  },
  classes: [{
    name: 'Sorcerer',
    subtype: 'Draconic Ancestor',
    level: 1,
    hit_die: 6,
    spellCasting: 'cha',
    features: [
      {
        name: 'SpellCasting',
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
    Walk: 30,
  },
  hit_points: {
    max: 9,
    current: 5,
  },
  ability_scores: {
    str: 10,
    dex: 13,
    con: 14,
    int: 10,
    wis: 12,
    cha: 16,
  },
  skills: {
    Arcana: true,
    Athletics: true,
    Intimidation: true,
    Survival: true,
  },
  armor_class: {
    value: 14,
    description: 'natural armor',
  },
  saving_throws: {
    con: true,
    cha: true,
  },
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
};
console.log(mockCharackter);
