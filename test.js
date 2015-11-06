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

var dinject = require('./');
var expect = require('should');

describe('dinject', function() {
  dinject.inject('foo', 1);
  dinject.inject('bar', 2);

  dinject.inject('foobar', function(foo, bar) {
    return foo + bar;
  });

  it('should resolve simple values', function(done) {
    dinject.call(function(foo, bar) {
      expect(foo).eql(1);
      expect(bar).eql(2);
      done();
    });
  });

  it('should allow arguments to be in different orders', function(done) {
    dinject.call(function(bar, foo) {
      expect(foo).eql(1);
      expect(bar).eql(2);
      done();
    });
  });

  it('should allow block comments', function(done) {
    dinject.call(function(bar, /* comment */ foo) {
      expect(foo).eql(1);
      expect(bar).eql(2);
      done();
    });
  });

  it('should resolve intermediate functions', function(done) {
    dinject.call(function(foo, bar, foobar) {
      expect(foo).eql(1);
      expect(bar).eql(2);
      expect(foobar).eql(3);
      done();
    });
  });

  it('should throw an error if called without a function', function(done) {
    try {
      dinject.call(4);
    }
    catch (e) {
      expect(e).eql(new TypeError('Expected argument "fn" to be a function'));
      done();
    }
  });
});

