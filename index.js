var browserify = require('browserify')
  , path = require('path')
  , through = require('through')
  , fs = require('fs')
  , path = require('path')
  , os = require('os');

module.exports = exports = browserifyStrOrFn;

function browserifyStrOrFn(strOrFn, opts) {
  var empty = path.join(__dirname, 'empty.js');
  var str = strOrFn;
  if (typeof strOrFn === 'function') {
    str = [
      '(',
      strOrFn.toString(),
      ')();'
    ].join('\n');
  }
  return browserify(opts)
    .add(empty)
    .transform(function (file) {
      if (file !== empty) {
        return through();
      }
      var t = through(
        function (data) { },
        function () {
          this.queue(str);
          this.queue(null);
        });
      return t;
    });
}
