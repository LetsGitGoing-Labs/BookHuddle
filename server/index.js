require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const amazonHelpers = require('./api-helpers/amazon-helpers.js');
const database = require('../knexHelpers/queries.js')


var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');


let app = express();

// callback for DB queries
let sendData = (responseData, dataObj, res) => {
  let results = JSON.stringify(responseData);
  dataObj.body = results;
  res.status(200).send(dataObj);
};
// Parse JSON, urls and cookies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Authentication Packages
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const FacebookTokenStrategy = require('passport-facebook-token');
FacebookStrategy = require('passport-facebook').Strategy;

//Passport init
app.use(passport.initialize());
app.use(passport.session());

passport.use(new FacebookStrategy({
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackURL: process.env.CALLBACK_URL
},
  function(req, accessToken, refreshToken, profile, done) {
      process.nextTick(function(){
        //user is not logged in yet
        if(!req.user){

        // database.addUser(
        //   {first_name: profile.name.givenName, last_name: profile.name.familyName, email: profile.emails[0].value },
        //   null, function(err, user, res) {

        //   }


        console.log('Line 52: ' + database.checkIfUserExists());

        User.findOne({'facebook.id': profile.id}, function(err, user){
            if(err)
              return done(err);
            if(user){
              if(!user.facebook.token){
                user.facebook.token = accessToken;
                user.facebook.name = profile.name.givenName + ' ' + profile.name.familyName;
                user.facebook.email = profile.emails[0].value;
                console.log(user.facebook);
                user.save(function(err){
                  if(err)
                    throw err;
                });

              }
              return done(null, user);
            }
            else {
              var newUser = new User();
              newUser.facebook.id = profile.id;
              newUser.facebook.token = accessToken;
              newUser.facebook.name = profile.name.givenName + ' ' + profile.name.familyName;
              newUser.facebook.email = profile.emails[0].value;

              newUser.save(function(err){
                if(err)
                  throw err;
                return done(null, newUser);
              });
            }
          });
        }

        //user is logged in already, and needs to be merged
        else {
          var user = req.user;
          user.facebook.id = profile.id;
          user.facebook.token = accessToken;
          user.facebook.name = profile.name.givenName + ' ' + profile.name.familyName;
          user.facebook.email = profile.emails[0].value;

          user.save(function(err){
            if(err)
              throw err
            return done(null, user);
          })
        }
      });
}));

// passport.use(new FacebookTokenStrategy({
//   clientID: process.env.CLIENT_ID,
//   clientSecret: process.env.CLIENT_SECRET,
// }, function(accessToken, refreshToken, profile, done) {
//   User.findOrCreate({facebookId: profile.id}, function (error, user) {
//     return done(error, user);
//   });
// }));

app.get('/auth/facebook', passport.authenticate('facebook', {scope: ['email']}));

app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { successRedirect: '/dashboard',
                                      failureRedirect: '/login' }));

// app.post('/auth/facebook/token',
//   passport.authenticate('facebook-token'),
//   function (req, res) {
//     // do something with req.user
//     res.redirect('/');
//     res.send(req.user ? 200 : 401);
//   });

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
  console.log(req, '<-- req.body in get clubs');
  let dataObj = {
    confirmRequest: req.body
  }
  database.retrieveClubs(sendData, dataObj);
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
  let newClub = {
    confirmRequest: req.body
  }
  database.addClub(sendData, newClub, res);
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
  console.log('Logged in!');
});

app.post('/signup', (req, res) => {
  let newUser = {
    confirmRequest: req.body
  };
  database.addUser(sendData, newUser, res);
});

app.get('/logout', (req, res) => {
  console.log('Logged out!');
});

// app.get('/*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../client/dist/index.html'));
// });

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