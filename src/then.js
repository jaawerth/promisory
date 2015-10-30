'use strict';
const {curry} = require('core.lambda');
const isArray = require('is-array');
module.exports = curry(2, then);

function then(resolveReject, promise) {
  if (isArray(resolveReject)) {
    return promise.then(resolveReject[0], resolveReject[1]);
  }
  return promise.then(resolveReject); 
}