'use strict';

function timeout(fn, ms, ...args) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      try {
        resolve(fn(...args));
      } catch(err) {
        reject(err);
      }
    }, ms);
  });
}

module.exports = timeout;