'use strict';
const isArray    = require('is-array');
const isCallable = require('is-callable');

module.exports = asyncSeries;

function asyncSeries(funcs, ...moreFuncs) {

  if (moreFuncs.every(x => isCallable(x))) throw new TypeError('Every argument the first must be a function');
  if (isArray(funcs)) {
    funcs = funcs.concat(moreFuncs);
  } else if (isCallable(funcs)) {
    funcs = [funcs].concat(moreFuncs);
  } else {
    throw new TypeError('The first argument must be a function or array of functions.');
  }
  return aggregate([], funcs);
}

function aggregate(results, funcs) {
  if (funcs.length === 0) return Promise.all(results);
  return funcs[0]().then(function(result) {
    return aggregate(results.concat(result), funcs.slice(1));
  });
}



var timeout = require('./timeout');

var argList = [];
var list = [];
var funcs = [1, 2, 3, 4, 5, 6].map(x => () => timeout((...args) => `${x}: ${args}`, 1000));

asyncSeries(funcs).then(res => console.log('Results:', res));