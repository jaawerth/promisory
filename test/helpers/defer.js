'use strict';

module.exports = function defer() {
  let isResolved = false, isRejected = false;

  const deferred = {
    get isResolved() { return isResolved; },
    get isRejected() { return isRejected; },
    get isFinished() { return isResolved || isRejected; }
  };

  deferred.promise = new Promise((resolve, reject) => {
    deferred.resolve = resolve;
    deferred.reject = reject;
  });

  deferred.promise.then(() => isResolved = true);
  deferred.promise.catch(() => isRejected = true);

  return deferred;
};