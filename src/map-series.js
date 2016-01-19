'use strict';
const arrayFrom = require('./util').arrayFrom;

/**
 * Same as `map`, but waits for the previous mapped element to finish before mapping the next
 * @param  {Array|Iterable} promisesOrVals Array or iterable or promises or values
 * @param  {function} mapper       The mapper function
 * @return {Promise<array>}                Promise of an array of results
 */
function mapSeries(promisesOrVals, mapper) {
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

module.exports = mapSeries;