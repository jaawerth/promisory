'use strict';
const arrayFrom = require('./util').arrayFrom;

/**
 * [reduce description]
 * @param  {Array|Iterable} iterable Array, iterator, or anything with a compliant `Symbol.iterator` or `@@iterator` property
 * @param  {function} reducer  Reducer that takes the same argument profile as Array#reduce
 * @param  {Promise|Any} initVal?  initial value (could be promise or value)
 * @return {Promise}          Promise that resolves to the result
 */
function reduce(iterable, reducer, initVal) {
  let array = arrayFrom(iterable), offset = 0;
  if (arguments.length < 3) {
    initVal = array[0];
    array = array.slice(1);
    offset = 1;
  }

  return array.reduce(function(prevResults, pOrV, i, array) {
    return prevResults.then(function(results) {
      return Promise.resolve(pOrV).then(val => reducer(results, val, i + offset, array));
    });
  }, Promise.resolve(initVal));
}

module.exports = reduce;
