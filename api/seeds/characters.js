
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('characters').del()
    .then(function () {
      // Inserts seed entries
      return knex('characters').insert([{
        name: 'Magnus',
        race: 'Human',
        class: 'Fighter',
        level: 3,
        background: 'Folk Hero',
        alignment: 'Lawful Good',
        'saving_throws': JSON.stringify(['strength', 'constitution']),
        proficiencies: JSON.stringify(['animal handling', 'history', 'perception', 'survival']),
        abilities: JSON.stringify({
          strength: 14,
          dexterity: 16,
          constitution: 15,
          intelligence: 11,
          wisdom: 13,
          charisma: 9,
        }),
        hp: JSON.stringify({
          current: 12,
          max: 12,
          temporary: 0,
          hitDice: '1d10',
          successes: 0,
          failures: 0,
        }),
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
        'weapon_notes': "- **Longbow**: has a normal range of 150 feet, or up to 600 feet with _disadvantage_ on the attack roll.",
      }, {
        name: 'Taako',
        race: 'Elf',
        class: 'Wizard',
        level: 2,
        background: 'Acolyte',
        alignment: 'Chaotic Good',
        'saving_throws': JSON.stringify(['intelligence', 'wisdom']),
        proficiencies: JSON.stringify(['arcana', 'insight', 'investigation', 'perception', 'religion']),
        abilities: JSON.stringify({
          strength: 10,
          dexterity: 15,
          constitution: 14,
          intelligence: 16,
          wisdom: 12,
          charisma: 8,
        }),
        hp: JSON.stringify({
          current: 8,
          max: 8,
          temporary: 0,
          hitDice: '1d6',
          successes: 0,
          failures: 0,
        }),
        weapons: JSON.stringify({
          shortsword: {
            ability: 'dexterity',
            proficiency: true,
          },
        }),
        'weapon_notes': "**Proficiencies**: Daggers, darts, light crossbows, long and short bows, long and short swords, quarterstaffs, and slings\n\n**Other**: some other note...",
        'spell_slots': {
          1: [true, true, false, false],
          2: [true, false],
        },
        'spell_notes': "**Cantrips**: Mage Hand, Prestidigitation, Ray of Frost, Shocking Grasp\n\n**Spellbook**:\n\n- **1**: Burning Hands, Detect Magic, Mage Armor, Magic Missile, Shield, Sleep"
      }]);
    });
};
