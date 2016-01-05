'use strict';

var test = require('tape');
var swear = require('../dist');
var curry = require('core.lambda').curry;
var resolved = Promise.resolve('Resolved'), rejected = Promise.reject('Rejected');

var resultMatcher = curry(3, function(expected, t, res) {
  t.deepEqual(expected, res, 'result/err matches ' + res);
});
var assertResolve = resultMatcher('Resolved'), assertReject = resultMatcher('Rejected');
test('testing handle method', function(t) {
  // t.plan(4);
  t.test('thenFn, catchFn, promise', function(t) {
    t.plan(2);
    swear.handle(assertResolve(t), t.fail, resolved);
    swear.handle(t.fail, assertReject(t), rejected);
  });

  t.test('thenFn, promise', function(t) {
    t.plan(2);
    swear.handle(assertResolve(t), resolved).catch(t.fail);
    swear.handle(assertReject(t), rejected).then(t.fail);
  });
});
