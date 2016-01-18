'use strict';
const curry = require('./util').curry;
const arrayFrom = require('./util').arrayFrom;

module.exports = curry(2, map);
function map(mapper, promisesOrValues) {
  return Promise.all(arrayFrom(promisesOrValues).map(function(promiseOrVal, i, array) {
    return Promise.resolve(promiseOrVal).then(function(result) {
      return mapper(result, i, array);
    });
  })); 
}

