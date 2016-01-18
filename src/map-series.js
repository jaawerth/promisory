'use strict';
const curry = require('./util').curry;

module.exports = curry(2, mapSeries);

/**
 * Same as `map`, but waits for the previous mapped element to finish before mapping the next
 * @param  {function} mapper       The mapper function
 * @param  {Array|Iterable} promisesOrVals Array or iterable or promises or values
 * @return {Promise<array>}                Promise of an array of results
 */
const arrayFrom = require('./util').arrayFrom;

function mapSeries(mapper, promisesOrVals) {
  promisesOrVals = arrayFrom(promisesOrVals);
  
  return promisesOrVals.reduce(function(prevResults, pOrV, i, array) {
    return prevResults.then(results => {
      return Promise.resolve(pOrV).then(value => mapper(value, i, array))
        .then(result => {
          results.push(result);
          return results;
        });
    });
  }, Promise.resolve([]));
}