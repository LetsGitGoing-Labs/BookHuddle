require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const amazonHelpers = require('./api-helpers/amazon-helpers.js');

var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');

let app = express();

// Authentication Packages
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

//Passport init
app.use(passport.initialize());
app.use(passport.session());

// Parse JSON, urls and cookies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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
  //database function here to retrieve clubs
  database.retrieveClubs(function(clubs) {
    //send back clubs data with response
    res.send(clubs);
  });
});

app.get('/meetings', (req, res) => {
  // database function here to retrieve clubs
  database.retrieveMeetings(function(meetings) {
    // send back clubs data with response
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
    .then(books => res.send(books.data))
    .catch(err => console.log(err));
});

app.post('/clubs', (req, res) => {
  var clubObject = req.body;
  database.saveClub(clubObject, function(club) {
    res.send(club);
  });
});

app.post('/booksdb', (req, res) => {
  var bookObject = req.body;
  database.saveBooks(bookObject, function(book) {
    res.send(book);
  });
});

app.post('/meetings', (req, res) => {
  var meetingObject = req.body;
  database.saveMeeting(meetingObject, function(meeting) {
    res.send(meeting);
  });
});

app.post('/login', (req, res) => {
  //Login auth goes here
  res.send('ok');
  console.log('Logged in!');
});

app.post('/signup', (req, res) => {
  //signup auth goes here
  console.log('Signed in!');
});

app.get('/logout', (req, res) => {
  console.log('Logged out!');
});

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

// THIS IS THE AUTH FOR Blacksmith Post
//--------------------------------------
// app.get('/signupS', function(req, res) {
//   res.send(req.flash('User'));
// });
// app.get('/signupF', function(req, res) {
//   res.send({message: req.flash('signupMessage')});
// });
// app.post('/signup', passport.authenticate('local-signup', {
//   successRedirect: '/signupS',
//   failureRedirect: '/signupF',
//   failureFlash: true,
//   successFlash: true
// }));
// app.get('/loginS', function(req, res) {
//   res.send(req.flash('User'));
// });
// app.get('/loginF', function(req, res) {
//   res.send({message: req.flash('loginMessage')});
// });
// app.post('/login', passport.authenticate('local-login', {
//   successRedirect: '/loginS',
//   failureRedirect: '/loginF',
//   failureFlash: true,
//   successFlash: true
// }));
// app.get('/logout', function(req, res) {
//   console.log('logout hit');
//   req.logout();
//   res.redirect('/');
// });

//THIS IS THE AUTH FOR Urban Tails
//--------------------------------
// app.post('/signup', (req, res) => {
//   auth.validateSignupForm(req.body, (result) => {
//     if (result.success) {
//       console.log(result);
//       db.saveUser(req.body, (err, result) => {
//         if (err) {
//           console.log('error saving user data to db:', err);
//           res.status(500).send({ error: 'User already exists' });
//         }
//         else {
//           console.log('saved user data to the db:', result);
//           db.getUser(req.body, (err, result) => {
//             if (err) { res.send(err); }
//             else {
//               console.log('result db.getUser', result);
//               // creates persisting session with Passport
//               const user_id = result._id;
//               req.login(user_id, (err) => {
//                 console.log('logged in...redirecting...');
//                 // res.redirect('/');
//                 res.send(result);
//               });
//             }
//           });
//         }
//       });
//     } else if (result) {
//       console.log(result);
//       res.status(500).send(result);
//     }
//   });
// });
//--------------------------------------
// app.post('/login', (req, res) => {
//   auth.validateLoginForm(req.body, (result) => {
//     if (result.success) {
//       db.getUser(req.body, (err, result) => {
//         if (err) {
//           console.log(err);
//           res.status(500).send(err);
//         } else {
//           // first attempt at Express sessions without Passport
//           req.session.user = result[0];
//           res.send(result);
//         }
//       });
//     } else {
//       res.send(result);
//     }
//   });
// });
//---------------------------------------
// app.get('/logout', function (req, res){
//   req.logOut();
//   res.clearCookie('connect.sid', {path: '/'}).send('cleared');
// });

let PORT = process.env.PORT || 3000;

app.listen(PORT, function() {
  console.log(`listening on port ${PORT}`);
});

module.exports = app;