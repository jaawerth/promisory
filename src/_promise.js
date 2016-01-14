'use strict';

const isCallable = require('is-callable');
module.exports = function promise({Promise, create, resolve, reject, all, race}) {
  for (const opt of [Promise, create, resolve, reject, all, race])
  Promise = Promise || global.Promise || null;

};