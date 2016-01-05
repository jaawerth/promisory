'use strict';
const isCallable = require('is-callable');

function promisify(fn, thisArg) {
  if (!isCallable(fn)) throw new TypeError('Must provide a function.');
  return function promisified(...args) {
    return new Promise(function(resolve ,reject) {
      args.push(function callback(err, res) {
        if (err) reject(err);
        resolve(res);
      });
      fn.apply(thisArg, args);
    });
  };
}

module.exports = promisify;
