'use strict';

const curry     = require('core.lambda').curry;

module.exports = curry(2, spread);

function spread(handler, iterable) {
  return handler(...iterable);
}