'use strict';
var test = require('tape');
var swear = require('../dist');

var resolve = value => Promise.resolve(value);
test('map', function(t) {
  var promises = ['Foo', 'Bar', 'Baz'].map(resolve);
  
  var result = swear.map(function(value, i, arr) {

  });  

});
