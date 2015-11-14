'use strict';
const isPromise = require('is-promise');

function lift(thenFn, catchFn, promise) {
  if (arguments.length >= 3) {
    return _lift3(thenFn, catchFn, promise);
  } else if (arguments.length === 2) {
    return _lift2(thenFn, catchFn);
  } else if (arguments.length === 1) {
    return (catchFn, promise) => lift(thenFn, catchFn, promise);
  } else {
    throw new Error('Must pass at least one argument');
  }
}

function _lift2(thenFn, catchOrPromise) {
  if (isPromise(catchOrPromise)) {
    return catchOrPromise.then(thenFn);
  } else {
    return promise => promise.then(thenFn).catch(catchOrPromise);
  }
}

function _lift3(then, catchFn, promise) {
  return promise.then(then).catch(catchFn);
}

module.exports = lift;
