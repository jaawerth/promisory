'use strict';

module.exports = asyncSeries;

function asyncSeries(...funcs) {
  return aggregate([], [].concat(...funcs));
}

function aggregate(results, funcs) {
  if (funcs.length === 0) return Promise.all(results);
  return funcs[0]().then(function(result) {
    return aggregate([...results, result], funcs.slice(1));
  });
}