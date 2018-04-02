const db = require('./index.js');

const retrieveClubs = (cb, dataObj, res) => db.knex
  .select()
  .from('club')
  .then((clubs, err) => {
    if (err) {
      cb(clubs, 500, res);
    } else {
      cb(clubs, 200, res);
    }
  });

// CHECKUSER FN BEFORE IMPLEMENTING PASSPORT
// const checkUser = (user, res, cb) => {
//   console.log(user);
//    return db.knex('user')
//   .where({
//     email: user.email,
//     password: user.password
//   })
//   .select()
//   .then((data) => {
//     if (data.length > 0 ) {
//       cb(data, 200, res);
//     } else {
//       cb(data, 401, res);
//     }
//   });
// };

const checkUser = (user, cb) => {
  var userData = {};
  var clubsData = {};
  return db.knex('user')
  .where({
    email: user.email,
    password: user.password,
  })
  .select()
  .then((user, err) => {
    userData = user[0];
    return db.knex('user_club')
    .where({
      user_id: user[0].id
    })
    .select('club_id')
    .then((clubIDs, err) => {
      var query;
      if (clubIDs.length > 0) {
        //return db.knex('club')
        query = db.knex('club')
        .where({
          id: clubIDs[0].club_id
        });
        for (var i = 1; i < clubIDs.length; i++) {
          query = query.orWhere({
            id: clubIDs[i].club_id
          });
        }
        query.select()
        .then((clubs, err) => {
          clubsData = clubs;
          console.log(userData);
          console.log(clubsData);
        }).then(() => {
          clubsData.forEach((club, j) => {
            db.knex('meeting')
            .where({
              club_id: clubsData[j].id
            })
            .select()
            .then((meetings, err) => {
              clubsData[j].meetings = meetings;
            }).then(() => {
              if (j === clubsData.length - 1) {
                userData.clubs = clubsData;
                cb(userData);
              }
            });
          });
        });
      } else {
        cb(userData);
      }
    });
  });
};

// CHECKPASSWORD FN ADDED DURING IMPLEMENTATION OF PASSPORT
const checkCredentials = (email, password) => db.knex('user')
  .where({
    email,
    password,
  })
  .select()
  .then((data) => {
    // placeholder for using bcrypt
    if (data.length > 0) {
      return true;
    }
    return false;
  });

const clubNameIsTaken = clubName => db.knex('club')
  .where({
    club_name: clubName,
  })
  .select('club_name')
  .then((x) => {
    if (x.length > 0) {
      return true;
    }
    return false;
  });

const retrieveClub = (clubID, cb) =>
  // console.log('retrieving club from db');
  db.knex('club')
    .where({
      id: clubID,
    })
    .select('*')
    .then((clubData) => {
      if (clubData.length > 0) {
        cb(clubData);
      } else {
        cb(null);
      }
    });
const retrieveUser = (email, res, cb) =>
  // console.log('retrieving user from db');
  db.knex('user')
    .where({
      email,
    })
    .select('*')
    .then((userData) => {
      cb(userData, 200, res);
    })
    .catch((err) => {
      cb('Internal Server Error', 500, res);
    });
const retrieveClubsByName = (clubName, res, cb) => db.knex('club')
  .where({
    club_name: clubName,
  })
  .select('*')
  .then((clubData) => {
    cb(clubData, 200, res);
  })
  .catch((err) => {
    cb('Internal Server Error', 500, res);
  });

const retrieveClubsByLocation = (clubLocation, res, cb) =>
  // console.log('retrieving user from db');
  db.knex('club')
    .where({
      club_location: clubLocation,
    })
    .select('*')
    .then((clubData) => {
      cb(clubData, 200, res);
    })
    .catch((err) => {
      cb('Internal Server Error', 500, res);
    });
const getUserById = (user_id, cb) => db.knex('user')
  .where({
    id: user_id,
  })
  .select()
  .then((err, user) => {
    cb(err, user);
  });

const retrieveMeeting = (meetingID, cb) => db.knex('meeting')
  .where({
    id: meetingID,
  })
  .select('*')
  .then((meetingData) => {
    if (meetingData.length > 0) {
      cb(meetingData, 200);
    } else {
      cb('Internal Server Error', 500);
    }
  });

const addUser = (cb, user, res) => {
  const checkDatabase = emailIsInUse(user.email);
  checkDatabase.then((exists) => {
    if (exists === false) {
      return db.knex.insert({
        first_name: user.firstName,
        last_name: user.lastName,
        email: user.email,
        password: user.password,
        user_location: user.location,
        // user_facebook_token: user.confirmRequest.user.facebook.token
      })
        .into('user')
        .then(() => {
          retrieveUser(user.email, res, (userData, statusCode, res) => {
            for (let i = 0; i < userData.length; i++) {
              userData[i].password = 'encrypted';
            }
            cb(userData, statusCode, res);
          });
        });
    }
    const err = 'Error.  An account with that email address already exists.';
    console.log(err);
    cb(err, 401, res);
  });
};

const saveMeeting = (cb, meeting, res) => {
  console.log(meeting, '<-- meeting');
  return db.knex.insert({
    meeting_date: meeting.date,
    meeting_time: meeting.time,
    meeting_host: meeting.host,
    meeting_street_address: meeting.address,
    meeting_notes: meeting.notes,
    club_id: meeting.clubID,
  })
    .into('meeting')
  // .then(ADD RECORD TO THE MEETING_CLUB JOIN TABLE)
    .then((meetingID) => {
      retrieveMeeting(meetingID, (userData, statusCode) => {
        cb(userData, statusCode, res);
      });
    });
};

const addClub = (cb, club, res) => {
  let newClubId;
  let clubResponse;
  const checkDatabase = clubNameIsTaken(club.clubName);
  console.log('club: ', club);
  checkDatabase.then((exists) => {
    if (exists === false) {
      console.log(`getting ready to add new club: ${club.clubName}`);
      return db.knex.insert({
        club_name: club.clubName,
        club_location: club.clubCity,
        club_admin_user_id: club.userID,
        club_description: club.description,
      })
      .into('club')
      .then((clubID) => {
        return new Promise((resolve, reject) => {
          newClubId = clubID;
          retrieveClub(clubID, function(clubData) {
            resolve(clubData);
          });
        })
      })
      .then((clubData) => {
        console.log('clubData obj[0]: ', clubData[0]);
        clubResponse = clubData;
        return db.knex.insert({
          club_id: clubData[0].id,
          user_id: clubData[0].club_admin_user_id,
        })
        .into('user_club')
      })
      .then(() => {
        cb(clubResponse)
      })
    }  else {
      let err = 'Error.  A club with that name already exists.';
      console.log(err);
      cb(err, 401, res);
    }
    const err = 'Error.  A club with that name already exists.';
    cb(err, 401, res);
  });
};

const emailIsInUse = email => db.knex('user')
  .where({
    email,
  })
  .select('first_name')
  .then((x) => {
    if (x.length > 0) {
      return true;
    }
    return false;
  });

const userJoinClub = (userID, clubID, cb) => db.knex.insert({
  user_id: userID,
  club_id: clubID,
})
  .into('user_club')
  .then((data) => {
    cb(data);
  })
  .catch((err) => {
    cb(err);
  });

module.exports = {
  retrieveClubs,
  retrieveClub,
  retrieveUser,
  addUser,
  addClub,
  checkUser,
  saveMeeting,
  getUserById,
  retrieveClubsByName,
  retrieveClubsByLocation,
  userJoinClub,
  checkCredentials,
  // retrieveClubIDsByUser,
  // getUserById
};

