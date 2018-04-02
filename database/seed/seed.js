const db = require('../index.js');
// const dbMethods = require('../queries.js');
const sampleUserData = require('./users.json');
// const sampleClubData = require('./clubs.json');
// const sampleMeetingData = require('./meetings.json');
// const sampleBookData = require('./books.json');

// const dropDatabase = () => {
//   return db.knex.schema.dropTable('user_club').then(() =>{
//     return db.knex.schema.dropTable('club_book').then(() => {
//       return db.knex.schema.dropTable('meeting').then(() => {
//         return db.knex.schema.dropTable('genre_club').then(() => {
//           return db.knex.schema.dropTable('book').then(() => {
//             return db.knex.schema.dropTable('user').then(() => {
//               return db.knex.schema.dropTable('club').then(() => {
//                   console.log('database tables user, club, meeting, book, user_club, club_book, and genre_club dropped')
//               })
//             })
//           })
//         })
//       })
//     })
//   })
// }

// dropDatabase();

console.log('you invoked the seed.js file')

// sampleUserData.forEach((obj, err) => {
//   dbMethods.addUser((data, statusCode, err) => {
//     console.log('sampleUser err', err);
//     console.log('sampleUser data', data);
//     console.log('status code: ', statusCode);
//     if (err) { console.log('error saving new user to database', err); }
//     else { console.log('saved new user to the database', data); }
//   }, obj, null);
// });

// sampleClubData.forEach((obj, err) => {
//   addClub((data, err) => {
//     if (err) { console.log('error saving new club to database', err); }
//     else { console.log('saved new club to the database', data); }
//   }, obj, null);
// });

// sampleMeetingData.forEach((obj, err) => {
//   saveMeeting((data, err) => {
//     if (err) { console.log('error saving new meeting to database', err); }
//     else { console.log('saved new meeting to the database', data); }
//   }, obj, null);
// });



// sampleBookData.forEach((obj, err) => {
//   db.saveBook((err, data) => {
//     if (err) { console.log('error saving new book to database', err); }
//     else { console.log('saved new book to the database', data); }
//   }, obj, null);
// });