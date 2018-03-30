const expect = require('chai').expect;
const server = require('../index.js');
const path = require('path');
const supertest = require('supertest');
const db = require('../../database/index.js');
const dbMethods = require('../../database/queries.js');

const request = supertest.agent(server);

describe('', () => {
  beforeEach(() => {
  // Add user Mike Smith to db so it can be accessed later for the test
    db.knex
      .insert({
        first_name: 'Mike',
        last_name: 'Smith',
        email: 'mike@smith.com',
        password: 'mikeys',
        user_city: 'Boston',
        user_state_province: 'MA',
      })
      .into('user')
      .catch((error) => {
        console.log(error);
      });

    // delete user Bob Jones from db so it can be created later for the test
    db.knex('user')
      .where({ email: 'bob@jones.com' })
      .select()
      .del()
      .catch((error) => {
        console.log(error);
      });
  });

  afterEach(() => {
    // delete user Mike Smith from db to prevent storing mock data in db
    db.knex('user')
      .where({ email: 'mike@smith.com' })
      .select()
      .del()
      .catch((error) => {
        console.log(error);
      });

    db.knex('user')
      .where({ email: 'tim@whitley.com' })
      .select()
      .del()
      .catch((error) => {
        console.log(error);
      });
  });


  describe('server', () => {
    describe('GET', () => {
      it('should return the content of index.html', (done) => {
        // just assume that if it contains an id for rendering the app component that its index.html
        request
          .get('/')
          .expect(200, /id="app"/, done);
      });

      it('should return content of index.html when given nonexistent endpoint', (done) => {
        request.get('/arglebargle').expect(200, /id="app"/, done);
      });

      it('should return a list of book objects when request made to /getBooksAPI', (done) => {
        request
          .get('/getBooksAPI?searchTerm=Jane%20Austen')
          .expect(200)
          .end((err, res) => {
            expect(Array.isArray(res.body)).to.be.true;
            expect(typeof res.body[0] === 'object').to.be.true;
            done();
          });
      });

      it('should return an array of club objects', (done) => {
        request.get('/clubs').expect(200).end((err, res) => {
          const clubs = JSON.parse(res.text);
          expect(Array.isArray(clubs)).to.be.true;
          expect(typeof clubs[0] === 'object').to.be.true;
          done();
        });
      });
    });


    describe('POST', () => {
      it('should accept user data posted to signup and return posted user data', (done) => {
        request.post('/signup').send({
          firstName: 'Bob', lastName: 'Jones', email: 'bob@jones.com', password: 'bobbyj', user_city: 'Seattle', user_state_province: 'WA',
        }).expect(200).end((err, res) => {
          const user = JSON.parse(res.text)[0];
          if (!err) {
            expect(user.first_name === 'Bob' && user.last_name === 'Jones' && user.email === 'bob@jones.com').to.be.true;
            done();
          } else {
            console.log(err);
            done();
          }
        });
      });

      it('should accept user login and return encrypted data for that user', (done) => {
        request.post('/login').send({ email: 'mike@smith.com', password: 'mikeys' }).expect(200).end((err, res) => {
          if (!err) {
            const user = (JSON.parse(res.text)[0]);
            expect(user.first_name).to.equal('Mike');
            expect(user.password).to.equal('encrypted');
            done();
          } else {
            done(err);
          }
        });
      });
    });
  });

  describe('database', () => {
    it('should add a user to the database and then verify user', (done) => {
      dbMethods.addUser(
        (userData, statusCode, res) => {
          expect(statusCode).to.equal(200);

          dbMethods.checkUser({ email: 'tim@whitley.com', password: 'timmyw' }, null, (checkedUserData, checkedStatusCode, res) => {
            expect(checkedStatusCode).to.equal(200);
            expect(checkedUserData[0].first_name).to.equal('Tim');
            expect(checkedUserData[0].email).to.equal('tim@whitley.com');
            done();
          });
        },
        {
          firstName: 'Tim',
          lastName: 'Whitley',
          email: 'tim@whitley.com',
          password: 'timmyw',
          user_city: 'Denver',
          user_state_province: 'CO',
        },
        null,
      );
    });

    it('should return 401 for a nonexistent user', (done) => {
      dbMethods.checkUser(
        {
          email: 'bill@reed.com',
          password: 'billyr',
        },
        null,
        (userData, statusCode, res) => {
          expect(statusCode).to.equal(401);
          expect(userData.length).to.equal(0);
          done();
        },
      );
    });
  });


  describe('server/db integration', () => {
    xit('should allow a user to be added through the server and then verified by the database', (done) => {

    });

    xit('should reject attempt by server to add duplicate club', (done) => {

    });
  });
});
