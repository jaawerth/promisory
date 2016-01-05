'use strict';
const curry = require('core.lambda').curry;

module.exports = curry(2, mapSeries);

function mapSeries(mapper, promisesOrVals) {
  return Promise.all(promisesOrVals).then(values => values.reduce(function(prev, promise, i, array) {
    return prev.then(function() {
      return promise.then(function(result) {
        return mapper(result, i, array);
      }); 
    });
  }, Promise.resolve()));
}

