const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

let app = express();

// Authentication Packages
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

// Parse JSON, urls and cookies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files to client
app.use(express.static(path.join(__dirname, '../client/dist')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

//Passport init
app.use(passport.initialize());
app.use(passport.session());

let PORT = process.env.PORT || 3000;

app.listen(PORT, function() {
  console.log(`listening on port ${PORT}`);
});

module.exports = app;