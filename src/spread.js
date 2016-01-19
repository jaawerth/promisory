/* eslint prefer-spread: 0 */
'use strict';
const arrayFrom = require('./util').arrayFrom;


/**
 * Takes a .then handler and a promise that resolves to an array/iterable,
 * and applies it so each element is an argument.
 * @param  {Promise<Array|Iterable>} promise  Promise that resolves to an array/iterable
 * @param  {function} thenFn  A promise .then callback that takes (a, b, c..) for each
 *                            element in the resolved array
 * @return {Promise}          Resultant promise
 */
function spread(promise, thenFn) {
  return promise.then(iterable => thenFn.apply(undefined, arrayFrom(iterable)));
}

module.exports = spread;