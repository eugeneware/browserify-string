var browserify = require('browserify')
  , path = require('path')
  , through = require('through')
  , fs = require('fs')
  , path = require('path');

var empty = path.join(process.cwd(), '.__browserify_string_empty.js');
ensureEmpty();

function ensureEmpty() {
  if (!fs.existsSync(empty)) {
    fs.writeFileSync(empty, '');
  }
}

module.exports = exports = browserifyStrOrFn;
function browserifyStrOrFn(strOrFn, opts) {
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
