'use strict';
const isCallable = require('is-callable');

function promisify(fn) {
  if (!isCallable(fn)) throw new TypeError('Must provide a function.');
  return function promisified(...args) {
    return new Promise(function(resolve ,reject) {
      fn(...args, function callback(err, res) {
        if (err) reject(err);
        resolve(res);
      });
    });
  };
}

module.exports = promisify;
