'use strict';


module.exports = promisify;

function promisify(fn) {
  return function(...args) {
    return new Promise(function(resolve ,reject) {
      try {
        resolve(fn(...args));
      }	catch(e) {
        reject(e);
      }
    });
  };
}