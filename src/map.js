'use strict';

function swMap(mapper, promises) {
  return Promise.all(promises.map(function(promise, i, array) {
    return promise.then(function(result) {
      return mapper(result, i, array);
    });
  })); 
}

module.exports = swMap;
