'use strict';

module.exports = timeout;

function timeout(fn, delay, ...args) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      try {
        resolve(fn.apply(null, args));
      } catch(e) {
        reject(e);
      }
    }, delay);
  });
  
}