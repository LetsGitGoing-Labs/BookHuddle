var expect = require('chai').expect;
var server = require('../index.js');
var path = require('path');
var supertest = require('supertest');

var request = supertest.agent(server);

describe('server', function() {
  describe('GET /', function () {
    it('should return the content of index.html', function (done) {
      // just assume that if it contains an id for rendering the app component that its index.html
      request
        .get('/')
        .expect(200, /id="app"/, done);
    });

    // it('should 404 when asked for a nonexistent file', function(done) {
    //   request.get('/arglebargle').expect(404, done);
    // });
  });
});

