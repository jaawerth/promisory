'use strict';

const tr = require('transduce/core');
const pTry = require('./try');

class Task {
  constructor(func, {args = [], limit = false} = {}) {
    this._action = {fn: func, args};
    this._args = args;
    this[Task.protocol.result] = new Promise((resolve, reject) => {
      this[Task.protocol.resolve] = resolve;
      this[Task.protocol.reject] = reject;
    });
  }

  then(onResolve, onReject) {
    return this[Task.protocol.result].then(onResolve, onReject);
  }
:qa
  catch(onReject) {
    return this[Task.protocol.result].catch(onReject);
  }

  exec(...additionalArgs) {
    pTry(() => this._action(...this._args, ...additionalArgs))
      .then(this[Task.protocol.resolve])
      .catch(this[Task.protocol.reject]);
    return this[Task.protocol.result];
  }

  cancel() {
    this[Task.protocol.reject]('canceled');
    return this[Task.protocol.result];
  }
}

Task.protocol = {
  resolve: Symbol('task/resolve'),
  reject: Symbol('task/reject'),
  result: Symbol('task/result'),
};

class TaskQueue {
  constructor(tasks = [], {concurrency: infinity, throttle: 0}) {
    this._queue = 
  }
}
