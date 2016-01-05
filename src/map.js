'use strict';
const curry = require('core.lambda').curry;

module.exports = curry(2, map);

function map(mapper, promises) {
  return Promise.all(promises.map(function(promise, i, array) {
    return promise.then(function(result) {
      return mapper(result, i, array);
    });
  })); 
}

