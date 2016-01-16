'use strict';

const objToString = Object.prototype.toString;
const isIteratorLike = require('is-iterator-like');

const every = function every(predicate, array) {
  for (let i = 0; i < array.length; i++) {
    if (!predicate(array[i], i, array)) return false;
  }
  return true;
};

const isArray = Array.isArray || function isArray(value) {
  return objToString.call(value) === '[object Array]';
};

const ITERATOR = Symbol && typeof Symbol.iterator === 'symbol' ? Symbol.iterator : '@@iterator';

const map = function(iterable, mapper) {
  let iterator;

  if (isArray(iterable)) {
    return iterable.map(mapper);
  } else if (iterable[ITERATOR]) {
    iterator = iterable[ITERATOR]();
  } else if (isIteratorLike(iterable)) {
    iterator = iterable;
  } else {
    throw new TypeError("Don't know how to iterator " + iterable);
  }

  const results = [];
  for (let step = iterator.next(), i = 0; !step.done; step = iterator.next()) {
    results.push(mapper(step.value, i++, iterable));
  }
  return results;
};

const reduce = function reduce(iterable, reducer, value) {
  let iterator;

  if (isArray(iterable)) {
    return iterable.reduce(reducer, value);
  } else if (iterable[ITERATOR]) {
    iterator = iterable[ITERATOR]();
  } else if (isIteratorLike(iterable)) {
    iterator = iterable;
  } else {
    throw new TypeError("Can't iterate " + iterable);
  }

  let i = 0;
  if (arguments.length < 3) {
    value = iterator.next();
    i++;
  }

  for (let step = iterator.next(); !step.done; step = iterator.next()) {
    value = reducer(value, step.value, i++, iterable);
  }
  return value;
};

module.exports = {
  every, isArray, reduce, ITERATOR, objToString, map
};