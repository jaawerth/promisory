'use strict';

const test = require('tape');
const mapSeries = require('../src').mapSeries;
const defer = require('./helpers/defer');
const timeout = require('./helpers/timeout');
const sinon = require('sinon');

test('map-series', function(t) {
  const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  
  t.test('Returns promise of mapped array of promises or values', function(t) {
    t.plan(1);
    const promisesAndValues = nums.slice(0, 5).map(n => Promise.resolve(n))
      .concat(nums.slice(5, 10));
    const mappedResults = mapSeries(promisesAndValues, n => timeout(x => x * 2, 300, n));

    mappedResults.then(function(results) {
      t.deepEqual(results, nums.map(x => x * 2), 'Mapped results should match');
    }).catch(err => t.fail(err));
  });

  t.test('maps in series', function(t) {
    t.plan(2);
    const deferreds = nums.map(x => {
      const deferred = defer();
      return { ...deferred, resolve: () => deferred.resolve(x) };
    });

    const promises = deferreds.map(d => d.promise);
    const mappers = deferreds.map(() => x => x).map(m => sinon.spy(m));
    const resolved = deferreds.map(d => sinon.spy(d, 'resolve'));

    mapSeries(promises, (x, i) => mappers[i](x, i)).then(() => {
      // spies.forEach(spy => t.ok(spy.called, 'all spies were called'));
      t.doesNotThrow(() => sinon.assert.callOrder(...resolved.reverse()), undefined, 'Promises were resolved backwards for test case');
      t.doesNotThrow(() => sinon.assert.callOrder(...mappers), undefined, 'Mappers were called in order despite order of promise resolution');
    });

    const resolvePrev = i => () => {
      if (i < 0) return;
      deferreds[i].resolve();
      deferreds[i].promise.then(resolvePrev(i - 1));
    };
    resolvePrev(deferreds.length - 1)();

  });

  t.test('works on any iterable', function(t) {
    t.plan(2);

    const set = new Set(nums.map(n => Promise.resolve(n)));
    mapSeries(set, x => x * 2).then(results => {
      t.deepEqual(results, nums.map(x => x * 2), 'maps a Set to an array');
    }).catch(err => t.fail(err));

    const iterator = nums[Symbol.iterator]();

    mapSeries(iterator, x => x * 2).then(results => {
      t.deepEqual(results, nums.map(x => x * 2), 'maps an iterator to an array');
    }).catch(err => t.fail(err));

  });
});