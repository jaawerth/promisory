'use strict';

module.exports = function attempt(action, onError) {
  try {
    return action();
  } catch(e) {
    return onError(e);
  }
}
