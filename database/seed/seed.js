const db = require('../queries.js');
const sampleUserData = require('./users.json');
const sampleClubData = require('./clubs.json');
const sampleMeetingData = require('./meetings.json');
const sampleBookData = require('./books.json');

// db.dropMeetings();

db.dropDatabase();

sampleUserData.forEach((obj, err) => {
  db.addUser((err, data) => {
    if (err) { console.log('error saving new user to database', err); }
    else { console.log('saved new user to the database', data); }
  }, obj, null);
});

sampleClubData.forEach((obj, err) => {
  db.addClub((err, data) => {
    if (err) { console.log('error saving new club to database', err); }
    else { console.log('saved new club to the database', data); }
  }, obj, null);
});

sampleMeetingData.forEach((obj, err) => {
  db.saveMeeting((err, data) => {
    if (err) { console.log('error saving new meeting to database', err); }
    else { console.log('saved new meeting to the database', data); }
  }, obj, null);
});

// sampleBookData.forEach((obj, err) => {
//   db.saveBook((err, data) => {
//     if (err) { console.log('error saving new book to database', err); }
//     else { console.log('saved new book to the database', data); }
//   }, obj, null);
// });