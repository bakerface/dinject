/**
 * Copyright (c) 2015 Christopher M. Baker
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */

var R_LINE_COMMENTS = /\/\/.*$/g;
var R_BLOCK_COMMENTS = /\/\*[\s\S]*?\*\//g;
var R_FUNCTION_ARGS = /function[^\(]*\(([^\)]*)\)/;
var R_COMMA = /\s*,\s*/g

function trim(text) {
  return text.trim();
}

var dinject = module.exports = {
  _exports: { }
};

dinject.inject = function(key, value) {
  dinject._exports[key] = value;
};

dinject.resolve = function(key) {
  var value = dinject._exports[key];

  if (typeof(value) === 'function') {
    value = dinject.call(value);
  }

  return value;
};

dinject.args = function(fn) {
  if (typeof(fn) !== 'function') {
    throw new TypeError('Expected argument "fn" to be a function');
  }

  return fn.toString()
    .replace(R_LINE_COMMENTS, '')
    .replace(R_BLOCK_COMMENTS, '')
    .match(R_FUNCTION_ARGS)[1]
    .split(R_COMMA)
    .map(trim);
};

dinject.call = function(fn) {
  var args = dinject.args(fn).map(dinject.resolve);
  return fn.apply(this, args);
};

