'use strict';
const isArray = require('util').isArray;


function asyncSeries(...funcs) {

  return aggregate([], ...funcs);
}

function aggregate(results, funcs) {
  if (funcs.length === 0) return Promise.all(results);
  const func = funcs[0];
  let pResult;
  if (isArray(func)) {
    pResult = func[0](...func.slice(1));
  } else {
    pResult = func();
  }

  return pResult.then(function(result) {
    return aggregate([...results, result], funcs.slice(1));
  });
}

module.exports = asyncSeries;
