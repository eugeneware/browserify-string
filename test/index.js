var expect = require('chai').expect
  , browserifyFn = require('..');

describe('Browserify String', function () {
  it('should be able to return a browserify instance with functions',
    function(done) {
      function browserCode() {
        var domready = require('domready');
        domready(function () {
          console.log('Hello World');
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
          console.log('Hello World');
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

  it('should be able to return a browserify with options',
    function(done) {
      function browserCode() {
        var domready = require('domready');
        domready(function () {
          console.log('Hello World');
        });
      }
      browserifyFn(browserCode.toString(), { debug: true })
        .bundle(function (err, src) {
          if (err) return done(err);
          expect(src.toString()).to.include('Hello World');
          expect(src.toString()).to.include('domready (c) Dustin Diaz');
          expect(src.toString()).to.include('# sourceMappingURL');
          done();
        });
    });
});
