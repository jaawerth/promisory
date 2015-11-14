'use strict';


function swMapSeries(mapper, promises) {
  return promises.reduce(function(prev, promise, i, array) {
    return prev.then(function() {
      return promise.then(function(result) {
        return mapper(result, i, array);
      }); 
    });
  }, Promise.resolve());
}

module.exports = swMapSeries;
