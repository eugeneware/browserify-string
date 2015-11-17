var browserify = require('browserify')
  , path = require('path')
  , Readable = require('stream').Readable
  , path = require('path');

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

  // Create a stream from the input string.
  var stream = new Readable();
  stream.push(str);
  stream.push(null); // Indicate the end of the stream.

  return browserify(stream, opts);
}
