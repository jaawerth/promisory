'use strict';

const isArray = require('is-array');
const iterator = Symbol ? Symbol.iterator : '@@iterator' ;

module.exports = { symbol };