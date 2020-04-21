
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
      }]);
    });
};
