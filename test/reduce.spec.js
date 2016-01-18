'use strict';
const test = require('tape');
const reduce = require('../src').reduce;
test('reduce', function(t) {
  t.plan(5);

  const nums = [1,2,3,4,5];
  const pNums = nums.map(x => Promise.resolve(x));

  const sum = (x, y) => x + y;

  const fail = err => t.fail(err);
  reduce(sum, pNums).then(results => {
    t.equal(results, 15, 'should reduce array of promises');
  }).catch(err => t.fail(err));

  reduce(sum, new Set(pNums)).then(results => {
    t.equal(results, 15, 'should work on any iterable');
  }).catch(fail);

  reduce(sum, nums).then(results => {
    t.equal(results, 15, 'should work on promises OR values');
  }).catch(fail);

  reduce(sum, 1, pNums).then(results => {
    t.equal(results, 16, 'should work with or without an initial value');
  }).catch(fail);

  reduce(sum, Promise.resolve(1), nums).then(results => {
    t.equal(results, 16, 'initial value should work with a value or a promise');
  }).catch(fail);
});