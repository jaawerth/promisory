'use strict';
const arrayFrom = require('./util').arrayFrom;
const curry = require('./util').curry;

module.exports = curry(2, reduce);

function reduce(reducer, initVal, iterable) {
  let array;
  if (arguments.length < 3) {
    iterable = initVal;
    array = arrayFrom(iterable);
    initVal = array[0];
    array = array.slice(1);
  } else {
    array = arrayFrom(iterable);
  }

  return array.reduce(function(prevResults, pOrV, i, array) {
    return prevResults.then(function(results) {
      return Promise.resolve(pOrV).then(val => reducer(results, val, i, array));
    });
  }, Promise.resolve(initVal));
}