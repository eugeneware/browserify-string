# browserify-string [![Build Status](https://travis-ci.org/eugeneware/browserify-string.svg?branch=master)](https://travis-ci.org/eugeneware/browserify-string)

Use [browserify](https://github.com/substack/node-browserify) programatically to deal with code strings or inline functions.
(By default browserify requires that you have your code in a file.)

## Installation

Install via npm:

```
$ npm install browserify-string
```

## Examples

To browserify an inline function:

``` js
var browserifyFn = require('browserify-string');
function browserCode() {
  var domready = require('domready'); // client-side code dependency
  domready(function () {
    console.log('ready');
  });
}
browserifyFn(browserCode)
  .bundle(function (err, src) {
    if (err) return done(err);
    // Code should have the browser code and the dependency
    expect(src).to.include(browserCode.toString());
    expect(src).to.include('domready (c) Dustin Diaz 2012 - License MIT');
    done();
  });
```
To browserify some code as a string:

``` js
var browserifyFn = require('browserify-string');
function browserCode() {
  var domready = require('domready'); // client-side code dependency
  domready(function () {
    console.log('ready');
  });
}
browserifyFn(browserCode.toString())
  .bundle(function (err, src) {
    if (err) return done(err);
    // Code should have the browser code and the dependency
    expect(src).to.include(browserCode.toString());
    expect(src).to.include('domready (c) Dustin Diaz 2012 - License MIT');
    done();
  });
```

The `require('browserify-string')` returns a browserify instance that you can
method chain on to add transforms, etc.

## Passing in browserify options

The second parameter to `browserify-string` is the standard `browserify` options
or files object:

``` js
function browserCode() {
  var domready = require('domready');
  domready(function () {
    console.log('ready');
  });
}
browserifyFn(browserCode.toString(), { debug: true })
  .bundle(function (err, src) {
    if (err) return done(err);
    expect(src.toString()).to.include(browserCode.toString());
    expect(src.toString()).to.include('domready (c) Dustin Diaz');
    expect(src.toString()).to.include('//# sourceMappingURL=data:application/json;base64');
    done();
  });
```
