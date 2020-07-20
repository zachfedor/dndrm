/**
 * Utility functions
 */

/**
 * Convert array of objects into mapped object by key
 *
 * High order function, use result as callback for reduce array method. For example,
 * const usersById = users.reduce(arrayToMapBy('id'), {});
 *
 * @param string key - Property of objects in array to use as key
 * @return function - Reducer taking accumulated object and next element as arguments
 */
exports.arrayToMapBy = (key) => (obj, item) => {
  obj[item[key]] = item;
  return obj;
};

