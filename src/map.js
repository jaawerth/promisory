'use strict';
const curry = require('core.lambda').curry;
const mapAny = require('./util').map;
module.exports = curry(2, map);

function map(mapper, promisesOrValues) {
  return Promise.all(mapAny(promisesOrValues, function(promiseOrVal, i, array) {
    return Promise.resolve(promiseOrVal).then(function(result) {
      return mapper(result, i, array);
    });
  })); 
}

