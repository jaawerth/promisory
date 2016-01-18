'use strict';

const curry     = require('./util').curry;

module.exports = curry(2, spread);

function spread(handler, iterable) {
  return handler(...iterable);
}