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

const arrayFrom = Array.from || function arrayFrom(iterable) {
  var iterator;
  if (isArray(iterable)) {
    return iterable;
  } else if (iterable[ITERATOR]) {
    iterator = iterable[ITERATOR]();
  } else if (isIteratorLike(iterable)) {
    iterator = iterable;
  } else {
    throw new TypeError(`Don't know how to iterate ${iterable}`);
  }

  const array = [];
  for (let step = iterator.next(); !step.done; step = iterator.next()) {
    array.push(step.value);
  }
  return array;
};


const curry = _curry(2, _curry);
function _curry(n, f) {
  return curried([]);

  function curried(args) {
    return function(...newArgs) {
      var allArgs  = args.concat(newArgs);
      var argCount = allArgs.length;

      /* eslint prefer-spread: 0 */
      return argCount < n ? curried(allArgs): f.apply(null, allArgs);
    };
  }
}

const mapObject = function mapObj(mapper, obj) {
  return Object.keys(obj).reduce(function(mapped, key) {
    mapped[key] = mapper(obj[key], key, obj);
    return mapped;
  }, {});
};

module.exports = {
  every, isArray, arrayFrom, ITERATOR, objToString, curry, mapObject
};