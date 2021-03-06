// Seed Character Data

exports.seed = function(knex) {
  return knex('characters').insert([{
    // id: 1,
    name: 'Abria of Neverwinter Woods',
    abilities: JSON.stringify({
      strength: 10,
      dexterity: 10,
      constitution: 13,
      intelligence: 14,
      wisdom: 16,
      charisma: 12,
    }),
    alignment: 'Neutral Good',
    'armor_class': 16,
    background: 'Sage',
    'background_notes': "**Languages.** Common, Elvish, Dwarvish\n\n**Personality Traits.**\n\n**Ideals.**\n\n**Bonds.**\n\n**Flaws.**\n\n**Backstory.**\n\n**Appearance.**",
    class: 'Cleric',
    coin: JSON.stringify({ gp: 10 }),
    conditions: "",
    'equipment_notes': "**Proficiencies.** shields, simple weapons, longswords, short swords, longbows, shortbows\n\nScale mail, shortbow, 20 arrows, mace, holy symbol, shield, a bottle of black ink, a quill, a small knife, a letter from a dead colleague, a set of common clothes, priest's pack",
    experience: 548,
    'feature_notes': "**Researcher:** If you don't know info or lore, you often know where or from whom to find it. (from Sage)\n\n**Darkvision:** You can see in dim light within 60ft as if it were bright, and you can see in darkness as if it were dim.\n\n**Fey Ancestry:** You have advantage on saving throws against being charmed or put to sleep.\n\n**Trance:** You don't need to sleep, just meditate deeply for half the time to be rested. (all from Elf)\n\n**Mask of the Wild:** You can attempt to hide even when lightly obscured by foliage, heavy rain, or other natural phenomenon. (from Wood Elf)\n\n**Spellcasting:** As a Cleric, you can cast spells using Wisdom from the Cleric spell list. You use a Holy Symbol as a spell casting focus and can cast spells as rituals.\n\n**Divine Domain:** You are a Cleric of the Life Domain.\n\n**Disciple of Life:** Whenever you cast a 1st level or higher spell to restore hit points to a creature, it gains additional hit points equal to 2 + the spell's level.",
    hp: JSON.stringify({
      current: 12,
      max: 12,
      temporary: 0,
      'hit_dice': '3d8',
      'hd_remaining': 3,
      successes: [false, false, false],
      failures: [false, false, false],
    }),
    initiative: null,
    inspiration: false,
    level: 2,
    proficiencies: JSON.stringify(['arcana', 'history', 'medicine', 'perception', 'religion']),
    race: 'Elf',
    'saving_throws': JSON.stringify(['charisma', 'wisdom']),
    speed: '35 ft',
    'spell_slots': {
      1: [true, true, true],
    },
    'spell_notes': "**Spells**:\n\n- **Cantrips**: Thaumaturgy, Spare The Dying, Sacred Flame\n- **1**: _Bless_, _Cure Wounds_, Detect Magic, Healing Word, Sanctuary, Shield of Faith\n\n_(Divine Domain Spells)_",
    'weapon_notes': "- **Shortbow**: has a normal range of 80 feet, or up to 320 feet with _disadvantage_ on the attack roll, and requires two hands",
    weapons: JSON.stringify([{
      type: 'mace',
      proficiency: true,
    }, {
      type: 'shortbow',
      proficiency: true,
    }]),
    'user_id': 2,
    'campaign_id': 1,
  },


  {
    // id: 2,
    name: 'Robero "Bear" Agosto',
    abilities: JSON.stringify({
      strength: 15,
      dexterity: 13,
      constitution: 14,
      intelligence: 11,
      wisdom: 16,
      charisma: 9,
    }),
    alignment: 'Neutral Good',
    'armor_class': 18,
    background: 'Soldier',
    'background_notes': "**Languages.** Common, Celestial\n\n**Personality Traits.**\n\n**Ideals.**\n\n**Bonds.**\n\n**Flaws.**\n\n**Backstory.**\n\n**Appearance.**",
    class: 'Cleric',
    coin: JSON.stringify({ gp: 675, sp: 12 }),
    conditions: "",
    'equipment_notes': "**Proficiencies.** All armor, shields, simple weapons, martial weapons, dragonchess, vehicles (land)\n\n- War hammer\n- Chain mail*\n- Light crossbow and 20 bolts\n- Shield\n- Holy symbol on shield\n- Priest pack(backpack, blanket,10 candles, tinderbox, alms box, 2 blocks of incense, censer, vestments, 2 days rations, waterskin)\n- Sergeant insignia, banner from enemy, deck of cards, common clothes, pouch of 10 gp\n\n*Disadvantage on Dexterity (Stealth) checks",
    experience: 548,
    'feature_notes': "-Ability Score Increase: Your ability scores each increase by 1.\n- Speed. Your base walking speed is 30 feet.\n- Cleric 1 Features: Spellcasting, Divine Domain.\n- War Priest: When attacking, add 1 weapon attack as bonus action. Can perform number of times equal to Wisdom modifier. Regain all uses after long rest.\n- Military Rank: Soldiers from Order of Gauntlet recognize my rank, defer if below. Can borrow military equipment or horses temporarily. Access to military forts, camps.",
    hp: JSON.stringify({
      current: 15,
      max: 15,
      temporary: 0,
      'hit_dice': '2d8',
      'hd_remaining': 3,
      successes: [false, false, false],
      failures: [false, false, false],
    }),
    initiative: null,
    inspiration: false,
    level: 2,
    proficiencies: JSON.stringify(['athletics', 'intimidation', 'medicine', 'religion']),
    race: 'Human',
    'saving_throws': JSON.stringify(['wisdom', 'charisma']),
    speed: '30 ft',
    'spell_slots': {
      1: [true, true, true],
    },
    'spell_notes': "**Spells**:\n\n- **Cantrips**: Light, Guidance, Sacred Flame\n- **1**: _Divine Favor_, _Shield of Faith_, Bless, Guiding Bolt, Cure Wounds, Inflict Wounds\n\n_(Divine Domain Spells)_",
    'weapon_notes': "- War Priest: 1 weapon attack as bonus action (3x, used 0/3, regain all after long rest).\n- Versatile: War hammer (1d10)\n- *Lt crossbow: Ammo (range 80/320), loading, 2 handed.\n- Sacred Flame: Target must succeed Dex. saving throw or take 1d8 radiant damage. Range 60 feet.\n- Divine Favor: Weapon attack extra 1d4 radiant damage.\n- Guiding Bolt: 4d6 radiant damage, and next attack roll against target before end of my next turn has Advantage.\n- Inflict Wounds: Melee spell attack. On a hit, 3d10 necrotic damage.",
    weapons: JSON.stringify([{
      type: 'warhammer',
      proficiency: true,
    }, {
      type: 'crossbowLight',
      proficiency: true,
    }]),
    'user_id': 3,
    'campaign_id': 1,
  },


  {
    // id: 3,
    name: 'Nienna Galandel',
    abilities: JSON.stringify({
      strength: 14,
      dexterity: 15,
      constitution: 15,
      intelligence: 12,
      wisdom: 9,
      charisma: 10,
    }),
    alignment: 'Lawful Neutral',
    'armor_class': 13,
    background: 'Noble',
    'background_notes': "**Languages.** Common, Elvish, Dwarvish\n\n**Personality Traits.**\n\n**Ideals.**\n\n**Bonds.**\n\n**Flaws.**\n\n**Backstory.**\n\n**Appearance.**",
    class: 'Fighter',
    coin: JSON.stringify({ gp: 10 }),
    conditions: "",
    'equipment_notes': "**Proficiencies.** All armor, shields, simple weapons, martial weapons, playing cards\n\nLeather armor, longbow, 20 arrows, 2 shortswords, light crossbow, 20 bolts, explorer's pack, set of fine clothes, a signet ring, a scroll of pedigree",
    experience: 548,
    'feature_notes': "**Second Wind.** You have a limited well of stamina you can draw on to protect yourself from harm. You can use a bonus action to regain hit points equal to 1d10 + your fighter level.\n\tOnce you use this feature, you must finish a short or long rest before you can use it again.\n\n**Fighting Style (Archery).** You gain a +2 bonus to attack rolls you make with ranged weapons. This bonus is already included in your attack with your longbow.\n\n**Position of Privilege.** High society are your peers, commoners treat you well.\n\n**Mask of the Wild.** You can hide even when only lightly obscured by foliage, heavy rain, falling snow, mist, and other natural phenomena.\n\n**Darkvision.** You can see in dim light within 60 feet of you as if it were bright light, and in darkness like dim light. Grayscale only.\n\n**Fey Ancestry.** You have advantage on saving throws against being charmed, and magic can’t put you to sleep.\n\n**Trance.** Elves meditate deeply, remaining semiconscious, for 4 hours a day instead of sleep.",
    hp: JSON.stringify({
      current: 17,
      max: 17,
      temporary: 0,
      'hit_dice': '2d10',
      'hd_remaining': 3,
      successes: [false, false, false],
      failures: [false, false, false],
    }),
    initiative: null,
    inspiration: false,
    level: 2,
    proficiencies: JSON.stringify(['history', 'insight', 'perception', 'survival']),
    race: 'Elf',
    'saving_throws': JSON.stringify(['strength', 'constitution']),
    speed: '35 ft',
    'weapon_notes': "- **Longbow:** Ammunition (20), Range 150/600, Heavy, Two-Handed\n\n- **Shortsword:** Finesse, Light\n\n- **Light Crossbow:** Ammunition (20), Range 80/320, Loading, Two-Handed",
    weapons: JSON.stringify([{
      type: 'longbow',
      proficiency: true,
    }, {
      type: 'shortsword',
      ability: 'dexterity',
      proficiency: true,
    }, {
      type: 'crossbowLight',
      proficiency: true,
    }]),
    'user_id': 4,
    'campaign_id': 1,
  },


  {
    // id: 4,
    name: 'Poppy Dewfoot',
    abilities: JSON.stringify({
      strength: 14,
      dexterity: 15,
      constitution: 14,
      intelligence: 12,
      wisdom: 13,
      charisma: 19,
    }),
    alignment: 'Chaotic Good',
    'armor_class': 13,
    background: 'Criminal',
    'background_notes': "**Languages.** Common, Halfling, Thieves Cant\n\n**Personality Traits.**\n\n**Ideals.**\n\n**Bonds.**\n\n**Flaws.**\n\n**Backstory.**\n\n**Appearance.**",
    class: 'Rogue',
    coin: JSON.stringify({ gp: 10 }),
    conditions: "",
    'equipment_notes': "**Proficiencies.** Light armor, simple weapons, hand crossbows, longswords, rapiers, shortswords, thieves' tools, dragonchess\n\nLeather armor, two daggers, thieves' tools, shortsword, shortbow, quiver with 20 arrows, backpack, 1000 ball bearings, 10ft of string, a bell, 5 candles, a crowbar, a hammer, 10 pitons, a hooded lantern, 2 flasks of oil, 5 days of rations, a tinderbox, a waterskin, 50ft of hempen rope",
    experience: 548,
    'feature_notes': "**Sneak Attack.** can deal extra 1d6 damage if I have advantage on attack roll or if target has active enemy within 5ft\n\n**Lucky.** can reroll die when I roll a 1 on a d20 attack roll, ability check, or saving throw but must use the new number.\n\n**Expertise.** can add proficiency bonus _twice_ to Sleight of Hand and Thieves' Tool checks.\n\n**Natural Stealth.** can hide behind creatures one size larger.\n\n**Halfling Nimbleness.** can move through space of any creature that is a size larger than me.\n\n**Brave.** advantage on saving throws against being frightened.\n\n**Specialty.** Pickpocket\n\n**Criminal Contacts**",
    hp: JSON.stringify({
      current: 16,
      max: 16,
      temporary: 0,
      'hit_dice': '2d8',
      'hd_remaining': 3,
      successes: [false, false, false],
      failures: [false, false, false],
    }),
    initiative: null,
    inspiration: false,
    level: 2,
    proficiencies: JSON.stringify(['acrobatics', 'deception', 'perception', 'persuasion', 'sleight of hand', 'stealth']),
    race: 'Halfling',
    'saving_throws': JSON.stringify(['dexterity', 'intelligence']),
    speed: '25 ft',
    'weapon_notes': "**Shortsword.** Finesse, Light\n\n**Daggers.** Finesse, Light, Thrown, Range 20/60\n\n**Shortbow.** Ammunition, Range 80/320, Two-Handed",
    weapons: JSON.stringify([{
      type: 'shortsword',
      name: 'Moonbeam',
      ability: 'dexterity',
      proficiency: true,
    }, {
      type: 'dagger',
      ability: 'dexterity',
      proficiency: true,
    }, {
      type: 'shortbow',
      proficiency: true,
    }]),
    'user_id': 1,
    'campaign_id': 2,
  },


  {
    // id: 5,
    name: 'Ulrich Fackleträeger',
    abilities: JSON.stringify({
      strength: 14,
      dexterity: 16,
      constitution: 15,
      intelligence: 11,
      wisdom: 13,
      charisma: 9,
    }),
    alignment: 'Lawful Good',
    'armor_class': 14,
    background: 'Folk Hero',
    'background_notes': "**Languages.** Common, Elvish\n\n**Personality Traits.**\n\n**Ideals.**\n\n**Bonds.**\n\n**Flaws.**\n\n**Backstory.**\n\n**Appearance.**",
    class: 'Fighter',
    coin: JSON.stringify({ gp: 10 }),
    conditions: "",
    'equipment_notes': "**Proficiencies.** All armor, shields, simple weapons, martial weapons, carpenter's tools, vehicles (land)\n\nLeather armor, longbow, 20 arrows, greatsword, backpack, bedroll, mess kit, tinderbox, 10 torches, 10 days of rations, waterskin, 50 feet of hempen rope, carpenter's tools, shovel, iron pot, set of common clothes, pouch",
    experience: 548,
    'feature_notes': "**Second Wind.** You have a limited well of stamina you can draw on to protect yourself from harm. You can use a bonus action to regain hit points equal to 1d10 + your fighter level.\n\tOnce you use this feature, you must finish a short or long rest before you can use it again.\n\n**Fighting Style (Archery).** You gain a +2 bonus to attack rolls you make with ranged weapons. This bonus is already included in your attack with your longbow.\n\n**Rustic Hospitality.** Since you come from the ranks of the common folk, you fit in among them with ease. You can find a place to hide, rest, or recuperate among other commoners, unless you have shown yourself to be a danger to them. They shield you from the law or anyone else searching for you, though they are unwilling to risk their lives for you.",
    hp: JSON.stringify({
      current: 16,
      max: 16,
      temporary: 0,
      'hit_dice': '2d10',
      'hd_remaining': 3,
      successes: [false, false, false],
      failures: [false, false, false],
    }),
    initiative: null,
    inspiration: false,
    level: 2,
    proficiencies: JSON.stringify(['animal handling', 'history', 'perception', 'survival']),
    race: 'Human',
    'saving_throws': JSON.stringify(['strength', 'constitution']),
    speed: '30 ft',
    'weapon_notes': "**Greatsword.** Heavy, two-handed\n\n**Longbow.** Heavy, two-handed, ammunition, range 150/600 (has a normal range of 150 feet, or up to 600 feet with _disadvantage_ on the attack roll)",
    weapons: JSON.stringify([{
      type: 'greatsword',
      proficiency: true,
    }, {
      type: 'longbow',
      proficiency: true,
    }]),
    'user_id': 2,
    'campaign_id': 2,
  },


  {
    // id: 6,
    name: 'Gloin "Wizz" Khalifa',
    abilities: JSON.stringify({
      strength: 12,
      dexterity: 18,
      constitution: 19,
      intelligence: 18,
      wisdom: 16,
      charisma: 15,
    }),
    alignment: 'Chaotic Good',
    'armor_class': 14,
    background: 'Sage',
    'background_notes': "**Languages.** Common, Dwarvish\n\n**Personality Traits.**\n\n**Ideals.**\n\n**Bonds.**\n\n**Flaws.**\n\n**Backstory.**\n\n**Appearance.**",
    class: 'Wizard',
    coin: JSON.stringify({ gp: 5 }),
    conditions: "",
    'equipment_notes': "**Proficiencies.** Battleaxe, handaxe, light hammer, and warhammer, daggers, darts, slings, quarterstaffs, light crossbows\n\nShortsword, component pouch, spellbook, backpack, bottle of ink, ink pen, 10 sheets of parchment, small knife, tome of historical lore, holy symbol, prayer book, set of common clothes, pouch",
    experience: 548,
    'feature_notes': "**Spellcasting Ability.** Intelligence\n\n**Arcane Recovery.** Once per day during a short rest, you can choose to recover expended spell slots with a combined level equal to or less than half your wizard level rounded up.\n\n**Darkvision.** see in dim light within 60ft as bright light, see in darkness as dim light without color\n\n**Dwarven Resistance.** advantage on saving throws against poison and resistant to poison damage\n\n**Stonecunning.** Double proficiency bonus and add to History checks related to origin of stonework",
    hp: JSON.stringify({
      current: 17,
      max: 17,
      temporary: 0,
      'hit_dice': '2d6',
      'hd_remaining': 3,
      successes: [false, false, false],
      failures: [false, false, false],
    }),
    initiative: null,
    inspiration: false,
    level: 2,
    proficiencies: JSON.stringify(['arcana', 'history', 'insight', 'investigation']),
    race: 'Dwarf',
    'saving_throws': JSON.stringify(['intelligence', 'wisdom']),
    speed: '25 ft',
    'spell_slots': {
      1: [true, true, true],
    },
    'spell_notes': "**Cantrips**: Fire Bolt, Mage Hand, Prestidigitation\n\n**Spellbook**:\n\n- **1**: Burning Hands, Charm Person, Mage Armor, Magic Missile, Thunderwave, Comprehend Languages",
    weapons: JSON.stringify([{
      type: 'dagger',
      ability: 'dexterity',
      proficiency: true,
    }]),
    'weapon_notes': "Dagger is light, so you can use 2 at a time or can be thrown, range is 20/60",
    'user_id': 4,
    'campaign_id': 2,
  }]);
};
