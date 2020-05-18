
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('characters').del()
    .then(function () {
      // Inserts seed entries
      return knex('characters').insert([{
        name: 'Magnus',
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
        'background_notes': "**Languages.** Common, Elvish\n\n**Personality Traits.** When I set my mind to something, I follow through. Also, I use long words in an attempt to sound smarter.\n\n...",
        class: 'Fighter',
        coin: JSON.stringify({ gp: 10 }),
        conditions: "",
        'equipment_notes': "**Proficiencies.** All armor, shields, simple weapons, martial weapons, carpenter's tools, vehicles (land)\n\nLeather armor, longbow, 20 arrows, greatsword, backpack, bedroll, mess kit, tinderbox, 10 torches, 10 days of rations, waterskin, 50 feet of hempen rope, carpenter's tools, shovel, iron pot, set of common clothes, pouch",
        experience: 0,
        'feature_notes': "**Second Wind.** You have a limited well of stamina you can draw on to protect yourself from harm. You can use a bonus action to regain hit points equal to 1d10 + your fighter level.\n\tOnce you use this feature, you must finish a short or long rest before you can use it again.\n\n**Fighting Style (Archery).** You gain a +2 bonus to attack rolls you make with ranged weapons. This bonus is already included in your attack with your longbow.\n\n**Rustic Hospitality.** Since you come from the ranks of the common folk, you fit in among them with ease. You can find a place to hide, rest, or recuperate among other commoners, unless you have shown yourself to be a danger to them. They shield you from the law or anyone else searching for you, though they are unwilling to risk their lives for you.",
        hp: JSON.stringify({
          current: 12,
          max: 12,
          temporary: 0,
          hitDice: '1d10',
          successes: 0,
          failures: 0,
        }),
        initiative: null,
        inspiration: false,
        level: 3,
        proficiencies: JSON.stringify(['animal handling', 'history', 'perception', 'survival']),
        race: 'Human',
        'saving_throws': JSON.stringify(['strength', 'constitution']),
        speed: '30 ft',
        'weapon_notes': "- **Longbow**: has a normal range of 150 feet, or up to 600 feet with _disadvantage_ on the attack roll.",
        weapons: JSON.stringify({
          greatsword: {
            ability: 'strength',
            proficiency: true,
          },
          longbow: {
            ability: 'dexterity',
            proficiency: true,
          },
        }),
      }, {
        name: 'Taako',
        abilities: JSON.stringify({
          strength: 10,
          dexterity: 15,
          constitution: 14,
          intelligence: 16,
          wisdom: 12,
          charisma: 8,
        }),
        alignment: 'Chaotic Good',
        'armor_class': 12,
        background: 'Acolyte',
        'background_notes': "**Languages.** Common, Elvish, Draconic, Dwarvish, Goblin\n\n**Personality Traits.** I use polysyllabic words that convey the impression of erudition. Also, I've spent so long in the temple that I have little experience dealing with people on a casual basis.\n\n...",
        class: 'Wizard',
        coin: JSON.stringify({ gp: 5 }),
        conditions: "",
        'equipment_notes': "Shortsword, component pouch, spellbook, backpack, bottle of ink, ink pen, 10 sheets of parchment, small knife, tome of historical lore, holy symbol, prayer book, set of common clothes, pouch",
        experience: 0,
        'feature_notes': "**Spellcasting Ability.** Intelligence\n\n**Arcane Recovery.** Once per day during a short rest, you can choose to recover expended spell slots with a combined level equal to or less than half your wizard level rounded up.\n\n...",
        hp: JSON.stringify({
          current: 8,
          max: 8,
          temporary: 0,
          hitDice: '1d6',
          successes: 0,
          failures: 0,
        }),
        initiative: null,
        inspiration: false,
        level: 2,
        proficiencies: JSON.stringify(['arcana', 'insight', 'investigation', 'perception', 'religion']),
        race: 'Elf',
        'saving_throws': JSON.stringify(['intelligence', 'wisdom']),
        speed: '30 ft',
        'spell_slots': {
          1: [true, true, false, false],
          2: [true, false],
        },
        'spell_notes': "**Cantrips**: Mage Hand, Prestidigitation, Ray of Frost, Shocking Grasp\n\n**Spellbook**:\n\n- **1**: Burning Hands, Detect Magic, Mage Armor, Magic Missile, Shield, Sleep",
        weapons: JSON.stringify({
          shortsword: {
            ability: 'dexterity',
            proficiency: true,
          },
        }),
        'weapon_notes': "**Proficiencies**: Daggers, darts, light crossbows, long and short bows, long and short swords, quarterstaffs, and slings\n\n**Other**: some other note...",
      }]);
    });
};
