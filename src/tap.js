'use strict';
const curry = require('core.lambda').curry;

module.exports = curry(2, tap);

/**
 * For side effects. Run a function on a promise's result, returning original resolution value.
 * @param  {Function} thenFn  Callback for promise's resolution value
 * @param  {Promise} promise Promise to run on
 * @return {Promise}         Promise that resolves to original resolution value
 */
function tap(thenFn, promise) {
  return promise.then(function(res) {
    thenFn(res);
    return res;
  });
}
