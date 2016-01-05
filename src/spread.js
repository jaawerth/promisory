'use strict';

const curry     = require('core.lambda').curry;
const isArray   = require('is-array');
const {toArray} = require('transducers.js');

module.exports = curry(2, spread);

function spread(handler, iterable) {
  if (isArray(iterable)) {
    return handler(...iterable);
  }
  return handler(...toArray(iterable));
}