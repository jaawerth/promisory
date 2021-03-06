'use strict';
const swear     = require('../src');
const test      = require('tape');
const isPromise = require('is-promise');
test('promisify', function(t) {
  t.plan(5);
  
  function timeoutNodeback(to, callback) {
    const d0 = new Date();

    setTimeout(() => {
      const d1 = new Date();
      callback(null, { thisArg: this, elapsed: d1 - d0, d0, d1 });
    }, to);
  }

  const to = swear.promisify(timeoutNodeback);
  const toBound = swear.promisify(timeoutNodeback, 'foo');
  const p1 = to(101);
  const p2 = toBound(101);

  t.ok(isPromise(p1), 'promisified function returns a promise');

  p1.then(res => {
    t.equals(typeof res.thisArg, 'undefined');
    t.ok(res.elapsed >= 100, `time elapsed, ${res.elapsed}, should be >= 100ms, to show promisified function works as expected`);
  });

  p2.then(res => {
    t.equals(res.thisArg, 'foo', 'binds callback to thisArg');
    t.ok(res.elapsed >= 100, `time elapsed, ${res.elapsed}, should be >= 100ms, to show promisified function works as expected`);
  });
});