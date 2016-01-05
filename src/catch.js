'use strict';

function swearCatch(onError, promise) {
  return promise.catch(onError);
}

module.exports = swearCatch;
