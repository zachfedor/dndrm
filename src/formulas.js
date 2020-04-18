/**
 * Given ability score, get dice roll modifier
 */
export const getAbilityModifier = score => Math.floor((score - 10) / 2);

/**
 * Given character level, get proficiency bonus
 */
export const getProficiencyBonus = level => Math.floor((level - 1) / 4) + 2;
