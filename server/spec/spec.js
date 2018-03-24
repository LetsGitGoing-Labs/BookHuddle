var expect = require('chai').expect;
var server = require('../index.js');
var path = require('path');
var supertest = require('supertest');
var db = require('../../database/index.js');

var request = supertest.agent(server);

describe('', function() {

  beforeEach(function() {

  // delete user Bob Jones from db so it can be created later for the test
  db.knex('user')
    .where({ email : 'bob@jones.com' })
    .select()
    .del()
    .catch(function(error) {
      console.log(error);
    });


  });


  describe('server', function() {
    describe('GET /', function () {
      it('should return the content of index.html', function (done) {
        // just assume that if it contains an id for rendering the app component that its index.html
        request
          .get('/')
          .expect(200, /id="app"/, done);
      });

      it('should return content of index.html when given nonexistent endpoint', function(done) {
        request.get('/arglebargle').expect(200, /id="app"/, done);
      });

      it('should return a list of book objects when request made to /getBooksAPI', function(done) {
        request
        .get('/getBooksAPI?searchTerm=Jane%20Austen')
        .expect(200)
        .end(function (err, res) {

          expect(Array.isArray(res.body)).to.be.true;
          expect(typeof res.body[0] === 'object').to.be.true;
          done();

        });
      });

      it('should return an array of club objects', function(done) {
        request.get('/clubs').expect(200).end(function (err, res) {
          let clubs = JSON.parse(res.text);
          expect(Array.isArray(clubs)).to.be.true;
          expect(typeof clubs[0] === 'object').to.be.true;
          done();
        });
      });
    });

    describe('POST', function() {
      it('should accept user data posted to signup and return posted user data', function(done) {
        request.post('/signup').send({ firstName: 'Bob', lastName: 'Jones', email: 'bob@jones.com', password: 'bobbyj', user_city: 'Seattle', user_state_province: 'WA' }).expect(200).end(function (err, res) {
            var user = JSON.parse(res.text)[0];
            if (!err) {
              expect(user.first_name === 'Bob' && user.last_name === 'Jones' && user.email === 'bob@jones.com').to.be.true;
              done();
            } else {
              console.log(err);
              done();
            }
          });
        });
      });
    });

});
