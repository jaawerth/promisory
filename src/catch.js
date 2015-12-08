'use strict';

function swCatch(onError, promise) {
  const foo = 1;
  foo = 2;
  return foo;
}
