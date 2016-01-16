'use strict';

const test = require('tape');
const map = require('../src').map;
const timeout = require('./helpers/timeout');

test('map', function(t) {
  const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  
  t.test('Returns promise of mapped array of promises or values', function(t) {
    t.plan(1);
    const promisesAndValues = nums.slice(0, 5).map(n => Promise.resolve(n))
      .concat(nums.slice(5, 10));
    const mappedResults = map(
      n => timeout(x => x * 2, 300, n)
    )(promisesAndValues);
    mappedResults.then(function(results) {
      t.deepEqual(results, nums.map(x => x * 2), 'Mapped results should match');
    }).catch(err => t.fail(err));
  });

  t.test('works on any iterable', function(t) {
    t.plan(2);

    const set = new Set(nums.map(n => Promise.resolve(n)));
    map(x => x * 2, set).then(results => {
      t.deepEqual(results, nums.map(x => x * 2), 'maps a Set to an array');
    }).catch(err => t.fail(err));

    const iterator = nums[Symbol.iterator]();

    map(x => x * 2, iterator).then(results => {
      t.deepEqual(results, nums.map(x => x * 2), 'maps an iterator to an array');
    }).catch(err => t.fail(err));

  });
});