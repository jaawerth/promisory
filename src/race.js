'use strict';

module.exports = race;

function race(...promises) {
  let resolve, reject;
  const clear = () => resolve = reject = Function.prototype;

  let winner = new Promise(function(res, rej) {
    resolve = res;
    reject = rej;
  });

  promises.forEach(function(promise) {
    promise.then(function(res) {
      resolve(res);
      clear();
    }).catch(function(err) {
      reject(err);
      clear();
    });
  });
  return winner;
}
