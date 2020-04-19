const pgp = require('pg-promise')();
const dburl = process.env.DATABASE_URL || 'postgresql://dndrm_user@localhost/dndrm';

const db = pgp(dburl);

/**
 * Insert characters
 */
const charactersCS = new pgp.helpers.ColumnSet(
  ['name', 'race', 'class', 'background', 'alignment', 'level', 'savingthrows', 'proficiencies'],
  { table: 'characters' }
);
const charactersValues = [{
  name: 'Magnus',
  race: 'Human',
  class: 'Fighter',
  level: 3,
  background: 'Folk Hero',
  alignment: 'Lawful Good',
  savingthrows: ['strength', 'constitution'],
  proficiencies: ['animal handling', 'history', 'perception', 'survival'],
}, {
  name: 'Taako',
  race: 'Elf',
  class: 'Wizard',
  level: 2,
  background: 'Acolyte',
  alignment: 'Chaotic Good',
  savingthrows: ['intelligence', 'wisdom'],
  proficiencies: ['arcana', 'insight', 'investigation', 'perception', 'religion'],
}];
const charactersQuery = pgp.helpers.insert(charactersValues, charactersCS);

/**
 * Insert abilities
 */
const abilitiesCS = new pgp.helpers.ColumnSet(
  ['id', 'strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma' ],
  { table: 'abilities' }
);
const abilitiesValues = [{
  id: 1,
  strength: 14,
  dexterity: 16,
  constitution: 15,
  intelligence: 11,
  wisdom: 13,
  charisma: 9,
}, {
  id: 2,
  strength: 10,
  dexterity: 15,
  constitution: 14,
  intelligence: 16,
  wisdom: 12,
  charisma: 8,
}];
const abilitiesQuery = pgp.helpers.insert(abilitiesValues, abilitiesCS);

/**
 * Insert hp
 */
const hpCS = new pgp.helpers.ColumnSet(
  ['id', 'current', 'max', 'temporary', 'hitdice', 'successes', 'failures'],
  { table: 'hp' }
);
const hpValues = [{
  id: 1,
  current: 12,
  max: 12,
  temporary: 0,
  hitdice: '1d10',
  successes: 0,
  failures: 0,
}, {
  id: 2,
  current: 8,
  max: 8,
  temporary: 0,
  hitdice: '1d6',
  successes: 0,
  failures: 0,
}];
const hpQuery = pgp.helpers.insert(hpValues, hpCS);

/**
 * Run all queries in transaction
 */
db.tx(t => t.batch([
  t.none(charactersQuery),
  t.none(abilitiesQuery),
  t.none(hpQuery)
]))
.then(() => console.log("Inserted mock data"))
.catch(error => console.error(error));

