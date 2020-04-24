/**
 * Concatenate class names
 *
 * cx('link', isSelected && 'selected')
 * => 'link selected' if `isSelected` is truthy
 * => 'link' if `isSelected` is falsy
 *
 * @param {...string|falsy} classes - Any number of strings, falsy values to be filtered out
 * @return {string}
 */
export const cx = (...classes) => classes.filter(cls => cls).join(' ');


/**
 * Concatenate sign to number
 *
 * @param {number} n - A positive or negative number
 * @return {string} - Either '+n' or '-n';
 */
export const addSign = n => n < 0 ? `${n}` : `+${n}`;
