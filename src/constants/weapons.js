const buildWeapon = (training, category, name, damageDie, damageType, properties) => {
  const weapon = {
    name,
    training,
    category,
    damageDie,
    damageType,
    properties,
  };

  return weapon;
};

const buildSMWeapon = (...args) => buildWeapon('simple', 'melee', ...args);
const buildSRWeapon = (...args) => buildWeapon('simple', 'range', ...args);
const buildMMWeapon = (...args) => buildWeapon('martial', 'melee', ...args);
const buildMRWeapon = (...args) => buildWeapon('martial', 'range', ...args);

const WEAPONS = {
  /**
   * Simple Melee
   */
  club: buildSMWeapon('Club', '1d4', 'bludgeoning', ['Light']),
  dagger: buildSMWeapon('Dagger', '1d4', 'piercing', ['Finesse', 'Light', 'Thrown', 'Range (20/60)']),
  greatclub: buildSMWeapon('Greatclub', '1d8', 'bludgeoning', ['Two-handed']),
  handaxe: buildSMWeapon('Handaxe', '1d6', 'slashing', ['Light', 'Thrown', 'Range (20/60)']),
  javelin: buildSMWeapon('Javelin', '1d6', 'piercing', ['Thrown', 'Range (30/120)']),
  lightHammer: buildSMWeapon('Light hammer', '1d4', 'bludgeoning', ['Light', 'Thrown']),
  mace: buildSMWeapon('Mace', '1d6', 'bludgeoning', ['-']),
  quarterstaff: buildSMWeapon('Quarterstaff', '1d6', 'bludgeoning', ['Versatile (1d8)']),
  sickle: buildSMWeapon('Sickle', '1d4', 'slashing', ['Light']),
  spear: buildSMWeapon('Spear', '1d6', 'piercing', ['Thrown', 'Versatile (1d8)', 'Range (20/60)']),
  /**
   * Simple Ranged
   */
  crossbowLight: buildSRWeapon('Crossbow, light', '1d8', 'piercing', ['Ammunition', 'Loading', 'Two-Handed', 'Range (80/320)']),
  dart: buildSRWeapon('Dart', '1d4', 'piercing', ['Finesse', 'Thrown', 'Range (20/60)']),
  shortbow: buildSRWeapon('Shortbow', '1d6', 'piercing', ['Ammunition', 'Two-Handed'], [80,320]),
  sling: buildSRWeapon('Sling', '1d4', 'bludgeoning', ['Ammunition', 'Range (30/120)']),
  /**
   * Martial Melee
   */
  battleaxe: buildMMWeapon('Battleaxe', '1d8', 'slashing', ['Versatile (1d10)']),
  flail: buildMMWeapon('Flail', '1d8', 'bludgeoning', ['-']),
  glaive: buildMMWeapon('Glaive', '1d10', 'slashing', ['Heavy', 'Reach', 'Two-Handed']),
  greataxe: buildMMWeapon('Greataxe', '1d12', 'slashing', ['Heavy', 'Two-Handed']),
  greatsword: buildMMWeapon('Greatsword', '2d6', 'slashing', ['Heavy', 'Two-Handed']),
  halberd: buildMMWeapon('Halberd', '1d10', 'slashing', ['Heavy', 'Reach', 'Two-Handed']),
  lance: buildMMWeapon('Lance', '1d12', 'piercing', ['Reach', 'Special']),
  longsword: buildMMWeapon('Longsword', '1d8', 'slashing', ['Versatile (1d10)']),
  maul: buildMMWeapon('Maul', '2d6', 'bludgeoning', ['Heavy', 'Two-Handed']),
  morningstar: buildMMWeapon('Morningstar', '1d8', 'piercing', ['-']),
  pike: buildMMWeapon('Pike', '1d10', 'piercing', ['Heavy', 'Reach', 'Two-Handed']),
  rapier: buildMMWeapon('Rapier', '1d8', 'piercing', ['Finesse']),
  scimitar: buildMMWeapon('Scimitar', '1d6', 'slashing', ['Finesse', 'Light']),
  shortsword: buildMMWeapon('Shortsword', '1d6', 'piercing', ['Finesse', 'Light']),
  trident: buildMMWeapon('Trident', '1d6', 'piercing', ['Thrown', 'Versatile (1d8)'], [20,60]),
  warPick: buildMMWeapon('War pick', '1d8', 'piercing', ['-']),
  warhammer: buildMMWeapon('Warhammer', '1d8', 'bludgeoning', ['Versatile (1d10)']),
  whip: buildMMWeapon('Whip', '1d4', 'slashing', ['Finesse', 'Reach']),
  /**
   * Martial Ranged
   */
  blowgun: buildMRWeapon('Blowgun', '1', 'piercing', ['Ammunition', 'Loading', 'Range (25/100)']),
  crossbowHand: buildMRWeapon('Crossbow, hand', '1d6', 'piercing', ['Ammunition', 'Light', 'Loading', 'Range (30/120)']),
  crossbowHeavy: buildMRWeapon('Crossbow, heavy', '1d10', 'piercing', ['Ammunition', 'Heavy', 'Loading', 'Two-Handed', 'Range (100/400)']),
  longbow: buildMRWeapon('Longbow', '1d8', 'piercing', ['Ammunition', 'Heavy', 'Two-Handed', 'Range (150/600)']),
  net: buildMRWeapon('Net', '-', '-', ['Special', 'Thrown', 'Range (5/15)']),
};

export default WEAPONS;
