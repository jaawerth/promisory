'use strict';
const curry = require('core.lambda').curry;

module.exports = curry(2, mapSeries);

function mapSeries(mapper, promisesOrVals) {
  return Promise.all( _mapSeries([], promisesOrVals[0], promisesOrVals.slice(1), promisesOrVals, mapper ) );
}

function _mapSeries(agg, head, tail, array, mapper) {
  Promise.resolve(head).then(function(result) {
    agg.push(mapper(result, agg.length, array));
    return agg;
  }).then(function(agg) {
    if (!tail.length) {
      return agg;
    } else {
      return _mapSeries(agg, tail[0], tail.slice(1), array, mapper);
    }

  });
}

// function mapSeries(mapper, promisesOrVals) {
//   return Promise.all(promisesOrVals).then(values => values.reduce(function(prev, promise, i, array) {
//     return prev.then(function() {
//       return promise.then(function(result) {
//         return mapper(result, i, array);
//       }); 
//     });
//   }, Promise.resolve()));
// }

