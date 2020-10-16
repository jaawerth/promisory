'use strict';

const curry = _curry(2, _curry);
function _curry(n, f) {
  return curried([]);

  function curried(args) {
    return (...newArgs) => {
      const allArgs = args.concat(newArgs);

      /* eslint prefer-spread: 0 */
      return allArgs.length < n ? curried(allArgs) : f(...allArgs);
    };
  }
}

module.exports = {
  curry,
};
