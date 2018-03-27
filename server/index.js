require('dotenv').config();
const express = require('express');
const uuid = require('uuid/v4');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const amazonHelpers = require('./api-helpers/amazon-helpers.js');
const database = require('../database/queries.js');
const parseString = require('xml2js').parseString;
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');
const app = express();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

// socket.io Trivia game
let connections = [];
let gameName = 'Untitled';
let players = [];
let host = {};
let questions = require('../client/MockQuestions/questions.js');
let currentQuestion = false;
let results = undefined;
let score = {}

let ioServer = app.listen(4000)
let io = require('socket.io').listen(ioServer);

io.sockets.on('connection', (socket) => {
  socket.once('disconnect', function(){
    let player = (players) => {
      for (let i = 0; i < players.length; i++) {
        if (players[i].id === this.id) {
          players.splice(i,1);
          io.sockets.emit('players', players);
        } else if (this.id === host.id) {
          console.log('%s has left, GAME OVER!', host.name)
          host = {};
          score = {};
          gameName = 'Untitled';
          io.sockets.emit('end', {gameName: 'GAME OVER!', host: '', currentQuestion: false})
        }
      }
    }
    player(players);
    console.log('players remaining', players);
    connections.splice(connections.indexOf(socket), 1);
    socket.disconnect();

    console.log('Disconnected: %s sockets remaining', connections.length)
  })

  socket.on('join', function(payload) {
    let newPlayer = {
      id: this.id,
      playerName: payload.playerName,
      type: 'player',
      score: payload.score
    };
    this.emit('joined', newPlayer)
    players.push(newPlayer);
    score[newPlayer.playerName] = 0;
    io.sockets.emit('players', players);
    console.log('username: ' + payload.playerName)
    console.log('joined line 63', payload, score)
  })

  socket.on('start', function(payload) {
    console.log('payload:',payload)
    
    gameName = payload.gameName;
    host.name = payload.host;
    host.id = this.id;
    host.type = 'host';
    this.emit('joined', host);
    console.log('start', host)
    io.sockets.emit('start', {gameName: gameName, host: host.name})
    console.log("Trivia has started: '%s' by %s", payload.gameName, host.name)
  })

  socket.on('ask', function(question){
    currentQuestion = question;
    results = undefined;
    io.sockets.emit('ask', currentQuestion);
    console.log('question: %s', question.q);
  })

  socket.on('answer', function(payload) {
    if (payload.answer === payload.question.ans) {
      results = true;
      score[payload.player]++;
    } else {
      results = false;
    }
    io.sockets.emit('results', results)
    io.sockets.emit('score', score)
    console.log('answer: %s', payload.answer, results, payload, payload.question.ans,score)
  })

  socket.emit('welcome', {
    gameName: gameName,
    players: players,
    host: host.name,
    questions: questions,
    currentQuestion: currentQuestion,
    results: results,
    score: score
  })
  console.log('welcome', gameName,players,host, score)

  connections.push(socket);
  console.log('connect: %s sockets connected', connections.length);
})

//End of socket.io

// callback for DB queries
let sendData = (responseData, dataObj, res) => {
  let results = JSON.stringify(responseData);
  //console.log(results, '<-- the object sent to client');
  res.status(statusCode).send(results);
};

// Parse JSON, urls and cookies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configure local strategy
passport.use(new LocalStrategy(
  { usernameField: 'email' },
  (email, password, done) => {
    database.checkUser({ email: email }, function (err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      if (!user.checkCredentials(email, password)) { return done(null, false); }
      console.log( user, '<-- user from after authentication');
      return done(null, user);
    });
  }
));

// creates passport session for user by serialized ID (tell passport how to serialize the user)
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// deserializes the user ID for passport to deliver to the session
passport.deserializeUser((user_id, done) => {
  console.log('deserializing user');
  User.getUserById(user_id, (err, user) => {
    if (err) {
      return done(err, false);
    } else {
    done(err, res.user);
    }
  })
});

app.use(session({
  genid: (req) => {
    return uuid() // use UUIDs for session IDs
  },
  // store: new FileStore(),
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))
app.use(passport.initialize());
app.use(passport.session());

// NEW LOGIN CODE FOR USE WITH PASSPORT
app.post('/login',
  passport.authenticate('local'),
  function(req, res) {
    res.redirect('/dashboard');
  })

// OLD LOGIN FROM BEFORE PASSPORT WAS IMPLEMENTED:
// app.post('/login', (req, res) => {
//   //Login auth goes here
//   database.checkUser(req.body, res, sendData);
// });

app.post('/signup', (req, res) => {
  let newUser = req.body;
  database.addUser(sendData, newUser, res);
});

app.get('/logout', (req, res) => {
  console.log('line 192');
  req.logOut();
  res.clearCookie('connect.sid', {path: '/'}).send('cleared');
});

// Serve static files to client
app.use(express.static(path.join(__dirname, '../client/dist')));

// Begin GraphQL

// Schema
var schema = buildSchema(`
  type Mutation {

    getBooksAPI(searchBy: String): String

    handleLogin(userData: String): String

    handleSignup(userData: String): String

    handleLogout(userData: String): String

    handleClubCreate(clubData: String): String

  }

  type Query {

    getBooksAPI: String

    getClubs: String

  }
`);

// Resolvers
var root = {
  setMessage: ({message}) => {
    fakeDatabase.message = message;
    return message;
  },
  getMessage: () => {
    return fakeDatabase.message;
  },
  getBooksAPI: ({searchBy}) => {
    return new Promise((resolve, reject) => {
    amazonHelpers.retrieveBooksAPI(searchBy)
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

            resolve(JSON.stringify(bookData));
          });
        })
        .then((err) => {
          console.log(err);
        });
      });
  },
  handleLogin: ({userData}) => {
    userData = JSON.parse(userData);
    return new Promise((resolve, reject) => {
    database.checkUser(userData,
      null,
      (data, statusCode, res) => {
      resolve(JSON.stringify(data));
    });
  });
  },
  handleSignup: ({userData}) => {
    userData = JSON.parse(userData);
    return new Promise((resolve, reject) => {
      database.addUser((data, statusCode, res) => {
        resolve(JSON.stringify(data));
      },
      userData,
      null);
    });
  },
  handleLogout: ({userData}) => {
    console.log('Logged out!');
  },
  handleClubCreate: ({clubData}) => {
    clubData = JSON.parse(clubData);
    return new Promise((resolve, reject) => {
      database.addClub((clubData, statusCode, res) => {
        resolve(JSON.stringify(clubData));
      },
      clubData,
      null);
    });
  },
  getClubs: () => {
    return new Promise((resolve, reject) => {
      database.retrieveClubs((clubs, statusCode, res) => {
        resolve(JSON.stringify(clubs));
      },
      null,
      null);
    });
  }
};

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));

// End GraphQL

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
  var searchTerm = req._parsedOriginalUrl.query.slice(11);
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
  let newClub = req.body;
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

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

let PORT = process.env.PORT || 3000;

app.listen(PORT, function() {
  console.log(`listening on port ${PORT}`);
});

module.exports = app;