'use strict';

/**
 * For side effects. Run a function on a promise's result, returning original resolution value.
 * @param  {Function} thenFn  Callback for promise's resolution value
 * @param  {Promise} promise Promise to run on
 * @return {Promise}         Promise that resolves to original resolution value
 */
function tap(promise, thenFn) {
  return promise.then(function(res) {
    thenFn(res);
    return res;
  });
}

module.exports = tap;