const sampleUserData = require('./users.json');
const sampleClubData = require('./clubs.json');
const sampleMeetingData = require('./meetings.json');
const sampleBookData = require('./books.json');
const sampleJoinData = require('./joinData.json');
const buildSchema = require('./../schema.js');

require('dotenv').config();

const knex = require('knex')({
  client: 'mysql',
  connection: {
    host: process.env.DATABASE_URL || '127.0.0.1',
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
  },
});

const db = require('bookshelf')(knex);

const dropDatabase = () => new Promise((resolve, reject) => {
  db.knex.schema.dropTable('genre_club')
    .then(() => {
      console.log('genre_club table dropped');
      resolve();
    });
}).then(() => new Promise((resolve, reject) => {
  db.knex.schema.dropTable('user_club')
    .then(() => {
      console.log('user_club table dropped');
      resolve();
    });
})).then(() => new Promise((resolve, reject) => {
  db.knex.schema.dropTable('meeting')
    .then(() => {
      console.log('meeting table dropped');
      resolve();
    });
})).then(() => new Promise((resolve, reject) => {
  db.knex.schema.dropTable('club_book')
    .then(() => {
      console.log('club_book table dropped');
      resolve();
    });
}))
  .then(() => new Promise((resolve, reject) => {
    db.knex.schema.dropTable('genre_book')
      .then(() => {
        console.log('genre_book table dropped');
        resolve();
      });
  }))
  .then(() => new Promise((resolve, reject) => {
    db.knex.schema.dropTable('book')
      .then(() => {
        console.log('book table dropped');
        resolve();
      });
  }))
  .then(() => new Promise((resolve, reject) => {
    db.knex.schema.dropTable('genre')
      .then(() => {
        console.log('genre table dropped');
        resolve();
      });
  }))
  .then(() => new Promise((resolve, reject) => {
    db.knex.schema.dropTable('club')
      .then(() => {
        console.log('club table dropped');
        resolve();
      });
  }))
  .then(() => new Promise((resolve, reject) => {
    db.knex.schema.dropTable('user')
      .then(() => {
        console.log('user table dropped');
        resolve();
      });
  }));

dropDatabase()
  .then(() => new Promise((resolve, reject) => {
    buildSchema(db, knex).then(() => {
      resolve();
    });
  }))
  .then(() => {
    sampleUserData.forEach((user, err) => new Promise((resolve, reject) => {
      db.knex.insert({
        first_name: user.firstName,
        last_name: user.lastName,
        email: user.email,
        password: user.password,
        user_location: user.location,
        // user_facebook_token: user.confirmRequest.user.facebook.token
      })
        .into('user')
        .catch((err) => {
          console.log(err);
        });
    }).then((user) => {
      console.log(`${JSON.stringify(user)} inserted into database`);
      resolve();
    }));
  })
  .then(() => {
    sampleClubData.forEach((club, err) => new Promise((resolve, reject) => db.knex.insert({
      club_name: club.clubName,
      club_location: club.clubCity,
      club_admin_user_id: club.userID,
      club_description: club.description,
    })
      .into('club')
      .catch((err) => {
        console.log(err);
      })
      .then(clubID => new Promise((resolve, reject) => {
        db.knex('club')
          .where({
            id: clubID,
          })
          .select()
          .then((clubData) => {
            resolve(clubData);
          });
      }))
      .then((clubData) => {
        console.log(`${JSON.stringify(clubData)} inserted into database`);
        return db.knex.insert({
          club_id: clubData[0].id,
          user_id: clubData[0].club_admin_user_id,
        })
          .into('user_club');
      })
      .catch((err) => {
        console.log(err);
      })));
  })
  .then(() => {
    sampleMeetingData.forEach((meeting, err) => db.knex.insert({
      meeting_date: meeting.meetingDate,
      meeting_time: meeting.meetingTime,
      meeting_host: meeting.meetingHost,
      meeting_street_address: meeting.meetingLocation,
      meeting_notes: meeting.meetingNotes,
      club_id: meeting.clubID,
    })
      .into('meeting')
      .catch((err) => {
        console.log(err);
      })
      .then(meetingID => new Promise((resolve, reject) => {
        db.knex('meeting')
          .where({
            id: meetingID,
          })
          .select()
          .then((meetingData) => {
            resolve(meetingData);
          });
      })
        .then((meeting) => {
          console.log(`${JSON.stringify(meeting)} inserted into database`);
        })));
  })
  .then(() => {
    sampleJoinData.forEach((join, err) => db.knex.insert({
      user_id: join.userID,
      club_id: join.clubID,
    })
      .into('user_club')
      .catch((err) => {
        console.log(err);
      })
      .then(() => {
        console.log('User joined club');
      }));
  });
