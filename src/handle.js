'use strict';
const isPromise = require('is-promise');

function handle(thenFn, catchFn, promise) {
  if (arguments.length >= 3) {
    return _handle3(thenFn, catchFn, promise);
  } else if (arguments.length === 2) {
    return _handle2(thenFn, catchFn);
  } else if (arguments.length === 1) {
    return (catchFn, promise) => handle(thenFn, catchFn, promise);
  } else {
    throw new Error('Must pass at least one argument');
  }
}

function _handle2(thenFn, catchOrPromise) {
  if (isPromise(catchOrPromise)) {
    return catchOrPromise.then(thenFn);
  } else {
    return promise => promise.then(thenFn).catch(catchOrPromise);
  }
}

function _handle3(then, catchFn, promise) {
  return promise.then(then).catch(catchFn);
}

module.exports = handle;
