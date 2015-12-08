'use strict';
const curry = require('core.lambda').curry;

function tap(thenFn, promise) {
  return promise.then(function(res) {
    thenFn(res);
    return res;
  });
}
