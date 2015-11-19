'use strict';
const isCallable = require('is-callable');
const isInteger = require('is-integer');

module.exports = promisify;

function promisify(fn) {
  if (!isCallable(fn)) throw new TypeError('Must provide a function.');
  return function promisified(...args) {
    return new Promise(function(resolve ,reject) {
      args.push(function callback(err, res) {
        if (err) reject(err);
        resolve(res);
      });
      fn(...args);
    });
  };
}

module.exports = promisify;
