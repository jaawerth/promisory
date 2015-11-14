'use strict';

function every(predicate, array) {
  for (let i = 0; i < array.length; i++) {
    if (!predicate(array[i], i, array)) return false;
  }
  return true;
}

module.exports = every;
