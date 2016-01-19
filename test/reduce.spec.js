'use strict';
const test = require('tape');
const reduce = require('../src').reduce;
test('reduce', function(t) {
  t.plan(5);

  const nums = [1,2,3,4,5];
  const pNums = nums.map(x => Promise.resolve(x));

  const sum = (x, y) => x + y;

  const fail = err => t.fail(err);
  reduce(pNums, sum).then(results => {
    t.equal(results, 15, 'should reduce array of promises');
  }).catch(err => t.fail(err));

  reduce(new Set(pNums), sum).then(results => {
    t.equal(results, 15, 'should work on any iterable');
  }).catch(fail);

  reduce(nums, sum).then(results => {
    t.equal(results, 15, 'should work on promises OR values');
  }).catch(fail);

  reduce(pNums, sum, 1).then(results => {
    t.equal(results, 16, 'should work with or without an initial value');
  }).catch(fail);

  reduce(nums, sum, Promise.resolve(1)).then(results => {
    t.equal(results, 16, 'initial value should work with a value or a promise');
  }).catch(fail);
});