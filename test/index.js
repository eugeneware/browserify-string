var expect = require('chai').expect
  , browserifyFn = require('..');

describe('Browserify String', function () {
  it('should be able to return a browserify instance with functions',
    function(done) {
      function browserCode() {
        var domready = require('domready');
        domready(function () {
          console.log('ready');
        });
      }
      browserifyFn(browserCode)
        .bundle(function (err, src) {
          if (err) return done(err);
          expect(src.toString()).to.include(browserCode.toString());
          expect(src.toString()).to.include('domready (c) Dustin Diaz');
          done();
        });
    });

  it('should be able to return a browserify instance with strings',
    function(done) {
      function browserCode() {
        var domready = require('domready');
        domready(function () {
          console.log('ready');
        });
      }
      browserifyFn(browserCode.toString())
        .bundle(function (err, src) {
          if (err) return done(err);
          expect(src.toString()).to.include(browserCode.toString());
          expect(src.toString()).to.include('domready (c) Dustin Diaz');
          done();
        });
    });
});
