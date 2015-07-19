var browserify = require('browserify')
  , path = require('path')
  , through = require('through')
  , fs = require('fs')
  , path = require('path')
  , temp = require('temp').track();

function ensureEmpty(filepath) {
  if (!fs.existsSync(filepath)) {
    fs.writeFileSync(filepath, '');
  }
}

module.exports = exports = browserifyStrOrFn;
function browserifyStrOrFn(strOrFn, opts) {
  // Prepare the options.
  opts = opts || {};

  // Clean up the input.
  var str = strOrFn;
  if (typeof strOrFn === 'function') {
    str = [
      '(',
      strOrFn.toString(),
      ')();'
    ].join('\n');
  }

  // Create an empty file in /tmp.
  var tmp = temp.openSync();
  var filepath = tmp.path;
  fs.writeFileSync(filepath, '');

  // Add available other module paths to opts.path.
  opts.paths = opts.paths || []
  opts.paths.push('.')
  opts.paths.push('node_modules')

  // Process the input with Browserify.
  return browserify(opts)
    .add(filepath)
    .transform(function (file) {
      if (file !== filepath) {
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
