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

// socket.io Trivia game
let connections = [];
let gameName = 'Untitled';
let players = [];
let host = {};
let questions = [];
let currentQuestion = false;
let results;
let score = {};
let roomName = '';


const ioServer = app.listen(4000);
const io = require('socket.io').listen(ioServer);

io.sockets.on('connection', (socket) => {
  socket.on('room', (room) => {
    socket.join(room);
    roomName = room;
    console.log('line57', room)
  });
  socket.once('disconnect', function () {
    console.log('line39', roomName);
    const player = (players) => {
      for (let i = 0; i < players.length; i++) {
        if (players[i].id === this.id) {
          players.splice(i, 1);
          io.to(roomName).emit('players', players);
        } else if (this.id === host.id) {
          console.log('%s has left, GAME OVER!', host.name);
          host = {};
          score = {};
          gameName = 'Untitled';
          io.to(roomName).emit('end', { gameName: 'GAME OVER!', host: '', currentQuestion: false });
        }
      }
    };
    player(players);
    console.log('players remaining', players);
    connections.splice(connections.indexOf(socket), 1);
    socket.disconnect();

    console.log('Disconnected: %s sockets remaining', connections.length);
  });


  socket.on('join', function (payload) {
    const newPlayer = {
      id: this.id,
      playerName: payload.playerName,
      type: 'player',
    };
    this.emit('joined', newPlayer);
    players.push(newPlayer);
    score[newPlayer.playerName] = 0;
    io.to(roomName).emit('players', players);
    io.to(roomName).emit('score', score);
    console.log(`username: ${  payload.playerName}`);
  });

  socket.on('start', function (payload) {
    console.log('payload:', payload);

    gameName = payload.gameName;
    host.name = payload.host;
    host.id = this.id;
    host.type = 'host';
    this.emit('joined', host);
    console.log('start', host);
    io.to(roomName).emit('start', { gameName, host: host.name });
    console.log("Trivia has started: '%s' by %s", payload.gameName, host.name);
  });

  socket.on('gameover', (score) => {
    io.to(roomName).emit('gameover', score);
    console.log('the game is over', score);
  });

  socket.on('reset', (payload) => {
    console.log('line 88', payload);
    connections = [];
    gameName = 'Untitled';
    players = [];
    host = {};
    currentQuestion = false;
    results;
    score = {};
    io.to(roomName).emit('reset', payload);
  });

  socket.on('ask', (question) => {
    currentQuestion = question;
    results = undefined;
    io.to(roomName).emit('ask', currentQuestion);
    console.log('question: %s', question.q);
  });

  socket.on('answer', function (payload) {
    if (payload.answer === payload.question.ans) {
      results = true;
      score[payload.player]++;
    } else {
      results = false;
    }
    this.emit('results', results);
    io.to(roomName).emit('score', score);
    console.log('answer: %s', payload.answer, results, payload, payload.question.ans, score);
  });

  socket.emit('welcome', {
    gameName,
    players,
    host: host.name,
    questions,
    currentQuestion,
    results,
    score,
  });
  console.log('welcome', gameName, players, host, score);

  connections.push(socket);
  console.log('connect: %s sockets connected', connections.length);
});

// End of socket.io

// callback for DB queries
const sendData = (responseData, dataObj, res) => {
  const results = JSON.stringify(responseData);
  // console.log(results, '<-- the object sent to client');
  res.status(statusCode).send(results);
};

// Parse JSON, urls and cookies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configure local strategy
// passport.use(new LocalStrategy(
//   { usernameField: 'email' },
//   (email, password, done) => {
//     database.checkUser({ email }, (err, user) => {
//       if (err) { return done(err); }
//       if (!user) { return done(null, false); }
//       if (!user.checkCredentials(email, password)) { return done(null, false); }
//       console.log(user, '<-- user from after authentication');
//       return done(null, user);
//     });
//   },
// ));

// // creates passport session for user by serialized ID (tell passport how to serialize the user)
// passport.serializeUser((user, done) => {
//   done(null, user.id);
// });

// // deserializes the user ID for passport to deliver to the session
// passport.deserializeUser((user_id, done) => {
//   console.log('deserializing user');
//   User.getUserById(user_id, (err, user) => {
//     if (err) {
//       return done(err, false);
//     }
//     done(err, res.user);
//   });
// });

// app.use(session({
//   genid: req =>
//     uuid(), // use UUIDs for session IDs
//   // store: new FileStore(),
//   secret: 'keyboard cat',
//   resave: false,
//   saveUninitialized: true,
// }));
// app.use(passport.initialize());
// app.use(passport.session());

// // NEW LOGIN CODE FOR USE WITH PASSPORT
// app.post(
//   '/login',
//   passport.authenticate('local'),
//   (req, res) => {
//     res.redirect('/dashboard');
//   },
// );


// OLD LOGIN FROM BEFORE PASSPORT WAS IMPLEMENTED:
// app.post('/login', (req, res) => {
//   //Login auth goes here
//   database.checkUser(req.body, res, sendData);
// });

app.post('/signup', (req, res) => {
  const newUser = req.body;
  database.addUser(sendData, newUser, res);
});

app.get('/logout', (req, res) => {
  console.log('line 192');
  req.logOut();
  res.clearCookie('connect.sid', { path: '/' }).send('cleared');
});

// Serve static files to client
app.use(express.static(path.join(__dirname, '../client/dist')));

// Begin GraphQL

// Schema
const schema = buildSchema(`
  type Mutation {

    getBooksAPI(searchBy: String): String

    handleLogin(userData: String): String

    handleSignup(userData: String): String

    handleLogout(userData: String): String

    handleClubCreate(clubData: String): String

    getNearClubs(clubLocation: String): String

    getClubsByName(clubName: String): String

    getUserData(userEmail: String): String

    handleJoinClub(userID: Int, clubID: Int): String

    handleTriviaQs(triviaQuestions: String, meetingTrivID: String): String

    getTriviaQs(meetingTrivID: String) : String

    handleCreateMeeting(meetingData: String) : String

    getClubMembers(clubId: String) : String

    cancelMeeting(meetingId: String) : String

  }

  type Query {

    getBooksAPI: String

    getClubs: String

  }
`);

// Resolvers
const root = {
  setMessage: ({ message }) => {
    fakeDatabase.message = message;
    return message;
  },
  getMessage: () => fakeDatabase.message,
  getBooksAPI: ({ searchBy }) => new Promise((resolve, reject) => {
    amazonHelpers.retrieveBooksAPI(searchBy)
      .catch((err) => {
        console.log(err)
      })
      .then((books) => {
        const parsedData = parseString(books.data, (err, result) => {
          result = result.ItemSearchResponse.Items[0].Item;
          var bookData = result.map((bookObject) => {
            if (bookObject.ItemAttributes && bookObject.ASIN && bookObject.ItemAttributes[0].Title && bookObject.ItemAttributes[0].Author && bookObject.MediumImage && bookObject.MediumImage[0].URL) {
              return {
                book_amazon_id: bookObject.ASIN,
                book_title: bookObject.ItemAttributes[0].Title,
                book_author: bookObject.ItemAttributes[0].Author,
                book_image: bookObject.MediumImage[0].URL,
                book_url: bookObject.DetailPageURL,
              };
            }
          });
          for (var i = 0; i < bookData.length; i++) {
            if (!bookData[i]) {
              bookData.splice(i, 1)
            }
          }
          resolve(JSON.stringify(bookData));
        });
      });
  }),
  handleLogin: ({ userData }) => {
    userData = JSON.parse(userData);
    return new Promise((resolve, reject) => {
      database.checkUser(
        userData,
        (data, statusCode, res) => {
          resolve(JSON.stringify(data));
        },
      );
    });
  },
  handleSignup: ({ userData }) => {
    userData = JSON.parse(userData);
    return new Promise((resolve, reject) => {
      database.addUser(
        (data, statusCode, res) => {
          resolve(JSON.stringify(data));
        },
        userData,
        null,
      );
    });
  },
  handleLogout: ({ userData }) => {
    console.log('Logged out!');
  },
  handleClubCreate: ({ clubData }) => {
    clubData = JSON.parse(clubData);
    return new Promise((resolve, reject) => {
      database.addClub(
        (clubData, statusCode, res) => {
          resolve(JSON.stringify(clubData));
        },
        clubData,
        null,
      );
    });
  },
  getClubs: () => new Promise((resolve, reject) => {
    database.retrieveClubs(
      (clubs, statusCode, res) => {
        resolve(JSON.stringify(clubs));
      },
      null,
      null,
    );
  }),
  getNearClubs: ({ clubLocation }) => {
    clubLocation = JSON.parse(clubLocation);
    return new Promise((resolve, reject) => {
      database.retrieveClubsByLocation(clubLocation, null, (clubs, statusCode, res) => {
        resolve(JSON.stringify(clubs));
      });
    });
  },
  getClubsByName: ({ clubName }) => new Promise((resolve, reject) => {
    database.retrieveClubsByName(clubName, null, (clubs, statusCode, res) => {
      resolve(JSON.stringify(clubs));
    });
  }),
  getClubMembers: ({ clubId }) => new Promise((resolve, reject) => {
    database.retrieveMembers(clubId, (members) => {
      resolve(JSON.stringify(members));
    });
  }),
  getUserData: ({ userEmail }) => new Promise((resolve, reject) => {
    database.retrieveUserData(userEmail, (userData) => {
      resolve(JSON.stringify(userData));
    });
  }),
  handleTriviaQs: ({ triviaQuestions, meetingTrivID }) => {
    meetingTrivID = JSON.parse(meetingTrivID);
    return new Promise((resolve) => {
      database.addTriviaQs(triviaQuestions, meetingTrivID, (meeting) => {
        resolve(JSON.stringify(meeting));
        console.log('line 338', questions);
      });
    });
  },
  handleJoinClub: ({ userID, clubID }) => new Promise((resolve, reject) => {
      database.userJoinClub(userID, clubID, (data) => {
        resolve(JSON.stringify(data))
      });
    }),
  getTriviaQs: ({ meetingTrivID }) => {
    meetingTrivID = JSON.parse(meetingTrivID);
    return new Promise((resolve, reject) => {
      database.retrieveTriviaQs(meetingTrivID, (triviaQs) => {
        questions = JSON.parse(triviaQs);
        resolve();
      });
    });
  },
  handleCreateMeeting: ({ meetingData }) => {
    meetingData = JSON.parse(meetingData);
    return new Promise((resolve, reject) => {
      database.addMeeting(meetingData, (meeting) => {
        resolve(meeting);
      });
    });
  },
  cancelMeeting: ({ meetingId }) => {
    meetingId = JSON.parse(meetingId);
    return new Promise((resolve, reject) => {
      database.deleteMeeting(meetingId, (meeting) => {
        resolve(meeting);
      });
    });
  },
};

app.use('/graphql', graphqlHTTP({
  schema,
  rootValue: root,
  graphiql: true,
}));

// End GraphQL

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

app.get('/clubs', (req, res) => {
  const clubObj = req.body;
  database.retrieveClubs(sendData, clubObj, res);
});

app.get('/meetings', (req, res) => {
  // this will have to be refactored to get only the meetings of a specific club or user
  database.retrieveMeetings((meetings) => {
    res.send(meetings);
  });
});

app.get('/getBooksDB', (req, res) => {
  // get search term to use for db lookup
  const searchTerm = req.body.searchTerm;
  // database function here to retrieve clubs
  database.retrieveBooksDB((books) => {
    // send back clubs data with response
    res.send(books);
  });
});

app.get('/getBooksAPI', (req, res) => {
  // get search term to use for API lookup
  const searchTerm = req._parsedOriginalUrl.query.slice(11);
  amazonHelpers.retrieveBooksAPI(searchTerm)
    .then((books) => {
      const parsedData = parseString(books.data, (err, result) => {
        result = result.ItemSearchResponse.Items[0].Item;
        const bookData = result.map((bookObject) => {
          if (bookObject.ASIN && bookObject.ItemAttributes[0].Title && bookObject.ItemAttributes[0].Author && bookObject.MediumImage[0].URL) {
            return {
              book_amazon_id: bookObject.ASIN,
              book_title: bookObject.ItemAttributes[0].Title,
              book_author: bookObject.ItemAttributes[0].Author,
              book_image: bookObject.MediumImage[0].URL,
              book_url: bookObject.DetailPageURL,
            };
          }
        });

        res.send(bookData.slice(0, 7));
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send();
    });
});

app.post('/clubs', (req, res) => {
  const newClub = req.body;
  database.addClub(sendData, newClub, res);
});

app.post('/booksdb', (req, res) => {
  const bookObject = req.body;
  database.saveBooks(bookObject, (book) => {
    res.send(book);
  });
});

app.post('/meetings', (req, res) => {
  const newMeeting = req.body;
  database.saveMeeting(sendData, newMeeting, res);
});

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

module.exports = app;
