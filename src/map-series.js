'use strict';
const curry = require('core.lambda').curry;

module.exports = curry(2, mapSeries);

/**
 * Map over an
 * @param  {[type]} mapper         [description]
 * @param  {[type]} promisesOrVals [description]
 * @return {[type]}                [description]
 */

const reduce = require('./util').reduce;

function mapSeries(mapper, promisesOrVals) {
  const results = [];
  return reduce(promisesOrVals, function(prev, pOrV, i, psOrVs) {
    return prev.then(() => {
      return Promise.resolve(pOrV).then(val => mapper(val, i, psOrVs))
        .then(value => results.push(value));
    });
  }, Promise.resolve())
    .then(() => results);
}
// function mapSeries(mapper, promisesOrVals) {
//   return Promise.resolve( _mapSeries([], promisesOrVals[0], promisesOrVals.slice(1), promisesOrVals, mapper ) )
//     .then(x => Promise.all(x));
// }

// function _mapSeries(agg, head, tail, array, mapper) {
//   return Promise.resolve(head).then(function(result) {
//     agg.push(mapper(result, agg.length, array));
//     return agg;
//   }).then(function(agg) {
//     if (!tail.length) {
//       return agg;
//     } else {
//       return _mapSeries(agg, tail[0], tail.slice(1), array, mapper);
//     }

//   });
// }

// function mapSeries(mapper, promisesOrVals) {
//   return Promise.all(promisesOrVals).then(values => values.reduce(function(prev, promise, i, array) {
//     return prev.then(function() {
//       return promise.then(function(result) {
//         return mapper(result, i, array);
//       }); 
//     });
//   }, Promise.resolve()));
// }

