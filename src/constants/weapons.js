const buildWeapon = (damageDie, damageType, properties) => ({
  damageDie,
  damageType,
  properties,
});

const WEAPONS = {
  /**
   * Simple Melee
   */
  club: buildWeapon('1d4', 'bludgeoning'),
  dagger: buildWeapon('1d4', 'piercing'),
  greatclub: buildWeapon('1d8', 'bludgeoning'),
  handaxe: buildWeapon('1d6', 'slashing'),
  javelin: buildWeapon('1d6', 'piercing'),
  'light hammer': buildWeapon('1d4', 'bludgeoning'),
  mace: buildWeapon('1d6', 'bludgeoning'),
  quarterstaff: buildWeapon('1d6', 'bludgeoning'),
  sickle: buildWeapon('1d4', 'slashing'),
  spear: buildWeapon('1d6', 'piercing'),
  /**
   * Simple Ranged
   */
  'crossbow, light': buildWeapon('1d8', 'piercing'),
  dart: buildWeapon('1d4', 'piercing'),
  shortbow: buildWeapon('1d6', 'piercing'),
  sling: buildWeapon('1d4', 'bludgeoning'),
  /**
   * Martial Melee
   */
  battleaxe: buildWeapon('1d8', 'slashing'),
  flail: buildWeapon('1d8', 'bludgeoning'),
  glaive: buildWeapon('1d10', 'slashing'),
  greataxe: buildWeapon('1d12', 'slashing'),
  greatsword: buildWeapon('2d6', 'slashing'),
  halberd: buildWeapon('1d10', 'slashing'),
  lance: buildWeapon('1d12', 'piercing'),
  longsword: buildWeapon('1d8', 'slashing'),
  maul: buildWeapon('2d6', 'bludgeoning'),
  morningstar: buildWeapon('1d8', 'piercing'),
  pike: buildWeapon('1d10', 'piercing'),
  rapier: buildWeapon('1d8', 'piercing'),
  scimitar: buildWeapon('1d6', 'slashing'),
  shortsword: buildWeapon('1d6', 'piercing'),
  trident: buildWeapon('1d6', 'piercing'),
  'war pick': buildWeapon('1d8', 'piercing'),
  warhammer: buildWeapon('1d8', 'bludgeoning'),
  whip: buildWeapon('1d4', 'slashing'),
  /**
   * Martial Ranged
   */
  blowgun: buildWeapon('1', 'piercing'),
  'crossbow, hand': buildWeapon('1d6', 'piercing'),
  'crossbow, heavy': buildWeapon('1d10', 'piercing'),
  longbow: buildWeapon('1d8', 'piercing'),
  net: buildWeapon('-', '-'),
};

export default WEAPONS;
