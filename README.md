# dinject
[![npm version](https://badge.fury.io/js/dinject.svg)](http://badge.fury.io/js/dinject)
[![build status](https://travis-ci.org/bakerface/dinject.svg?branch=master)](https://travis-ci.org/bakerface/dinject)
[![code climate](https://codeclimate.com/github/bakerface/dinject/badges/gpa.svg)](https://codeclimate.com/github/bakerface/dinject)
[![test coverage](https://codeclimate.com/github/bakerface/dinject/badges/coverage.svg)](https://codeclimate.com/github/bakerface/dinject/coverage)
[![github issues](https://img.shields.io/github/issues/bakerface/dinject.svg)](https://github.com/bakerface/dinject/issues)
[![dependencies](https://david-dm.org/bakerface/dinject.svg)](https://david-dm.org/bakerface/dinject)
[![dev dependencies](https://david-dm.org/bakerface/dinject/dev-status.svg)](https://david-dm.org/bakerface/dinject#info=devDependencies)
[![downloads](http://img.shields.io/npm/dm/dinject.svg)](https://www.npmjs.com/package/dinject)

The purpose of this package is to provide effortless dependency injection to JavaScript. Below is a basic example showing how to use this package in Node.js.

``` javascript
var dinject = require('dinject');

dinject.inject('one', 1);
dinject.inject('two', 2);

dinject.inject('three', function(one, two) {
  return one + two;
});

dinject.call(function(one, two, three) {
  console.log('one:', one);
  console.log('two:', two);
  console.log('three:', three);
});
```

