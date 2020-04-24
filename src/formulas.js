/**
 * Formulas for most D&D stat calculations
 * @module
 */
import { SKILLS, WEAPONS } from './constants';

/**
 * Calculate dice roll modifier from an ability score
 *
 * @param {number} score - A character's ability score, between 1 and 30
 * @returns {number} - Modifier between -5 and 10
 */
export const abilityModifier = (score) => Math.floor((score - 10) / 2);


/**
 * Calculate the proficiency bonus from a level
 *
 * @param {number} level - A character's level, between 1 and 20
 * @returns {number} - Bonus between 2 and 6
 */
export const proficiencyBonus = (level) => Math.floor((level - 1) / 4) + 2;


/**
 * Get ability modifier from a character object
 *
 * @param {object} character - The entire character object
 * @param {string} ability - The ability in question
 * @return {number}
 */
export const getAbilityModifier = (character, ability) => {
  const score = character.abilities[ability];
  return abilityModifier(score);
};


/**
 * Get proficiency bonus from a character object
 * 
 * @param {object} character - The entire character object
 * @return {number}
 */
export const getProficiencyBonus = (character) => {
  // TODO: convert this to class lookup for multiclassed characters
  // something like: character.class.reduce((lvl, cls) => lvl + cls.level, 0);
  return proficiencyBonus(character.level);
};


/**
 * Get saving throw modifier from a character object
 *
 * @param {object} character - The entire character object
 * @param {string} ability - The ability in question
 * @return {number}
 */
export const getSaveModifier = (character, ability) => {
  const modifier = getAbilityModifier(character, ability);

  if (character.savingThrows.includes(ability)) {
    return modifier + getProficiencyBonus(character);
  }

  return modifier;
};


/**
 * Get skill modifier from a character object
 *
 * @param {object} character - The entire character object
 * @param {string} skill - The skill in question
 * @return {number}
 */
export const getSkillModifier = (character, skill) => {
  // Find the skill's governing ability from the array of SKILLS constant
  const ability = SKILLS.filter(s => s.name === skill)[0].ability;
  const modifier = getAbilityModifier(character, ability);

  if (character.proficiencies.includes(skill)) {
    return modifier + getProficiencyBonus(character);
  }

  return modifier;
};


/**
 * Get passive skill score from a character object
 *
 * @param {object} character - The entire character object
 * @param {string} skill - The skill in question
 * @return {number}
 */
export const getPassiveSkillScore = (character, skill) => {
  return 10 + getSkillModifier(character, skill);
};


/**
 * Calculate health status from current and maximum hit points
 *
 * @param {number} cur - The character's current hit points
 * @param {number} max - The character's maximum hit points
 * @returns {string} - Either 'healthy', 'bloody', or 'deathly'
 */
export const hitPointStatus = (cur, max) => {
  const fraction = cur / max;
  if (fraction < 0.25) return 'deathly';
  else if (fraction < 0.5) return 'bloody';
  return 'healthy';
};


/**
 * Get hit point status from character object
 *
 * @param {object} character - The entire character object
 * @returns {string}
 */
export const getHitPointStatus = (character) => {
  return hitPointStatus(character.hp.current, character.hp.max);
};


/**
 * Get attack bonus from character object for a given weapon
 *
 * @param {object} character - The entire character object
 * @param {string} weapon - The weapon in question
 * @returns {number}
 */
export const getWeaponAttack = (character, weapon) => {
  const { ability, proficiency } = character.weapons[weapon];
  const modifier = getAbilityModifier(character, ability);
  return proficiency ? modifier + getProficiencyBonus(character) : modifier;
};


/**
 * Get damage die and modifier from character object for a given weapon
 *
 * @param {object} character - The entire character object
 * @param {string} weapon - The weapon in question
 * @returns {string}
 */
export const getWeaponDamage = (character, weapon) => {
  const ability = character.weapons[weapon].ability;
  const modifier = getAbilityModifier(character, ability);
  const signedMod = modifier < 0 ? `- ${Math.abs(modifier)}` : `+ ${modifier}`;
  return `${WEAPONS[weapon].damageDie} ${signedMod}`;
};

