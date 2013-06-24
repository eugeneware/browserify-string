var browserify = require('browserify')
  , path = require('path')
  , through = require('through');

module.exports = exports = browserifyStrOrFn;
function browserifyStrOrFn(strOrFn) {
  var str = strOrFn;
  if (typeof strOrFn === 'function') {
    str = [
      '(',
      strOrFn.toString(),
      ')();'
    ].join('\n');
  }
  var empty = path.resolve(__dirname, 'empty.js');
  return browserify()
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
