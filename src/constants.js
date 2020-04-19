export const ABILITIES = [
  'strength',
  'dexterity',
  'constitution',
  'intelligence',
  'wisdom',
  'charisma',
];

export const ABILITY_DESCRIPTIONS = {
  strength: 'Natural athleticism, bodily power',
  dexterity: 'Physical agility, reflexes, balance, poise',
  constitution: 'Health, stamina, vital force',
  intelligence: 'Mental acuity, information recall, analytical skill',
  wisdom: 'Awareness, intuition, insight',
  charisma: 'Confidence, eloquence, leadership',
};

export const SKILLS = [
  { name: 'acrobatics', ability: 'dexterity' },
  { name: 'animal handling', ability: 'wisdom' },
  { name: 'arcana', ability: 'intelligence' },
  { name: 'athletics', ability: 'strength' },
  { name: 'deception', ability: 'charisma' },
  { name: 'history', ability: 'intelligence' },
  { name: 'insight', ability: 'wisdom' },
  { name: 'intimidation', ability: 'charisma' },
  { name: 'investigation', ability: 'intelligence' },
  { name: 'medicine', ability: 'wisdom' },
  { name: 'nature', ability: 'intelligence' },
  { name: 'perception', ability: 'wisdom' },
  { name: 'performance', ability: 'charisma' },
  { name: 'persuasion', ability: 'charisma' },
  { name: 'religion', ability: 'intelligence' },
  { name: 'sleight of hand', ability: 'dexterity' },
  { name: 'stealth', ability: 'dexterity' },
  { name: 'survival', ability: 'wisdom' },
];

export const SKILL_ARRAY = SKILLS.map(skill => skill.name);

