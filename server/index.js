require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const amazonHelpers = require('./api-helpers/amazon-helpers.js');
const database = require('../database/queries.js');

var parseString = require('xml2js').parseString;

var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');


let app = express();

// callback for responses to client requests that require DB queries
let sendData = (responseData, statusCode, res) => {
  let results = JSON.stringify(responseData);
  res.status(statusCode).send(results);
};

// Parse JSON, urls and cookies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Authentication Packages
const passport = require('passport');

//Passport init
app.use(passport.initialize());
app.use(passport.session());

// Serve static files to client
app.use(express.static(path.join(__dirname, '../client/dist')));

// Begin GraphQL attempt

// Schema
var schema = buildSchema(`
  type Mutation {
    setMessage(message: String):
      String
  }

  type Query {
    getMessage: String
  }
`);

// Resolvers
var root = {
  setMessage: ({message}) => {
    fakeDatabase.message = message;
    return message;
  },
  getMessage: function () {
    return fakeDatabase.message;
  }
};

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));

// End GraphQL attempt

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

app.get('/clubs', (req, res) => {
  let clubObj = req.body;
  database.retrieveClubs(sendData, clubObj, res);
});

app.get('/meetings', (req, res) => {
  // this will have to be refactored to get only the meetings of a specific club or user
  database.retrieveMeetings(function(meetings) {
    res.send(meetings);
  });
});

app.get('/getBooksDB', (req, res) => {
  // get search term to use for db lookup
  var searchTerm = req.body.searchTerm;
  // database function here to retrieve clubs
  database.retrieveBooksDB(function(books) {
    // send back clubs data with response
    res.send(books);
  });
});

app.get('/getBooksAPI', (req, res) => {
  // get search term to use for API lookup

  var searchTerm = undefined;
  amazonHelpers.retrieveBooksAPI(searchTerm)
    .then(function(books) {
      var parsedData = parseString(books.data, function(err, result) {
        result = result.ItemSearchResponse.Items[0].Item;
        var bookData = result.map((bookObject) => {
            if (bookObject.ASIN && bookObject.ItemAttributes[0].Title && bookObject.ItemAttributes[0].Author && bookObject.MediumImage[0].URL) {
              return {
              book_amazon_id: bookObject.ASIN,
              book_title: bookObject.ItemAttributes[0].Title,
              book_author: bookObject.ItemAttributes[0].Author,
              book_image: bookObject.MediumImage[0].URL,
              book_url: bookObject.DetailPageURL
              };
            }
          }
        );

        res.send(bookData.slice(0, 7));
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).send();
    });
});

app.post('/clubs', (req, res) => {
  let newClub = req.body
  database.addClub(sendData, newClub, res);
});

app.post('/booksdb', (req, res) => {
  var bookObject = req.body;
  database.saveBooks(bookObject, function(book) {
    res.send(book);
  });
});

app.post('/meetings', (req, res) => {
  let newMeeting = req.body;
  database.saveMeeting(sendData, newMeeting, res);
});

app.post('/login', (req, res) => {
  //Login auth goes here
  database.checkUser(req.body, res, sendData);
});

app.post('/signup', (req, res) => {
  let newUser = req.body
  database.addUser(sendData, newUser, res);
});

app.get('/logout', (req, res) => {
  console.log('Logged out!');
});

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

let PORT = process.env.PORT || 3000;

app.listen(PORT, function() {
  console.log(`listening on port ${PORT}`);
});

module.exports = app;