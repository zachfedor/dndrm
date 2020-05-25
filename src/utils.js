import io from 'socket.io-client';

/**
 * Socket.io Connection
 */
export const socket = io(process.env.NODE_ENV === 'production' ? '/' : 'localhost:3030');


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
export const addSign = n => n > 0 ? `+${n}` : `${n}`;


/**
 * Toggle an element in a boolean array
 *
 * @param {array} values - Array of boolean values
 * @param {number} index - Index of the element to toggle
 * @return {array} - New array of booleans
 */
export const toggleByIndex = (values, index) => values.map((v, i) => i === index ? !v : v);

