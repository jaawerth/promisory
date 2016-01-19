'use strict';
const arrayFrom = require('./util').arrayFrom;

function map(promisesOrValues, mapper) {
  return Promise.all(arrayFrom(promisesOrValues).map(function(promiseOrVal, i, array) {
    return Promise.resolve(promiseOrVal).then(function(result) {
      return mapper(result, i, array);
    });
  })); 
}

module.exports = map;