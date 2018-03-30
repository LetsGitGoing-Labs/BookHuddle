const db = require('./index.js');

const retrieveClubs = (cb, dataObj, res) => {
  return db.knex
  .select()
  .from('club')
  .then(function(clubs, err) {
    if (err) {
      cb(clubs, 500, res);
    } else {
      cb(clubs, 200, res);
    }
  });
};

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
  return db.knex('user')
  .where({
    email: user.email,
    password: user.password
  })
  .select()
  .then((err, user) => {
    cb(err, user)
  });
};

// CHECKUSER refactor for huge object response
// const checkUser = (user, cb) => {
//   // retrieve user Object from db matchig provided credentials.
//   return db.knex('user')
//   .where({
//     email: user.email,
//     password: user.password
//   })
//   .select()
//   .then((retrievedUser) => {
//     // retrieve club ID's for clubs of which user is a member
//     return new Promise ((resolve, reject ) => {
//       resolve(retrieveClubIDsByUser(retrievedUser.id))
//     })
//   })
//   .then((retrievedClubIDs) => {
//     // get all of the clubs for all of the ID's just retrieved
//     let clubObjs = [];
//     for ( var a = 0; a < retrievedClubIDs.length; a++ ) {
//       clubObjs.push(retrieveClub(retrievedClubIDs[a], (club) => {
//         return club;
//       }))
//     }
//     Promise.all(clubObjs)
//     .then((clubsOfGivenUser) => {
//       return new Promise((resolve, reject) => {
//         resolve(clubsOfGivenUser);
//     })
//   })
//   .then((clubArray) => {
//     // now that you have an array  of club objs, iterate through each one and add all meetings as a property to each meeting

//     let afdsafdsfasdfasdf = [];
//     for (var b = 0; b < clubArray.length; b++ ) {
//       meetingObjs.push(retrieveMeetingsByClubID(clubArray[b].id))
//     }

//       }
//     })
//   })





//     let calls = [];
//     for (var i = 0; i < retrievedClubIDs.length; i++ ) {
//       calls.push(retrieveMeetingsByClubID(clubs[i], (meetings) => {
//         return meetings;
//       }))
//     }
//     Promise.all(calls).then((nestedArray) => {
//       return new Promise ((resolve, reject) => {
//         let allMeetings = [];
//         for (var j = 0; j < nestedArray.length; j++ ) {
//           allMeetings.concat(nestedArray[j]);
//         }
//         resolve(allMeetings);
//       })
//     })
//     // push each club object into a temp array
//     // add that array to the user object
//   })
//     cb(user)
//   .catch((err) => {
//     cb(err)
//   })
// };

// CHECKPASSWORD FN ADDED DURING IMPLEMENTATION OF PASSPORT
const checkCredentials = (email, password) => {
   return db.knex('user')
  .where({
    email: email,
    password: password
  })
  .select()
  .then((data) => {
    //placeholder for using bcrypt
    if (data.length > 0 ) {
      return true;
    } else {
      return false;
    }
  })
};

const emailIsInUse = (email) => {
  return db.knex('user')
  .where({
    email: email
  })
  .select('first_name')
  .then((x) => {
    if (x.length > 0 ) {
    return true;
    } else {
      return false;
    }
  });
};

const clubNameIsTaken = (clubName) => {
  return db.knex('club')
  .where({
    club_name: clubName
  })
  .select('club_name')
  .then((x) => {
    if (x.length > 0 ) {
      return true;
    } else {
      return false;
    }
  });
};

const retrieveClub = (clubID, cb) => {
  //console.log('retrieving club from db');
  return db.knex('club')
  .where({
    id:clubID
  })
  .select('*')
  .then((clubData) => {
    if (clubData.length > 0) {
      cb(clubData);
    } else {
      cb(null);
    }
  })
  .catch((err) => {
    cb(err);
  })
};

const retrieveClubIDsByUser = (user, cb ) => {
  return db.knex('user_club')
  .where({
    user_id: user
  })
  .select()
  .then((clubs) => {
    cb(clubs);
  })
  .catch((err) => {
    cb(err);
  })
}

const retrieveMeetingsByClubID = (clubID) => {
  return db.knex('meeting')
  .where({
    club_id: clubID
  })
  .select()
  .then((meetings) => {
    cb(meetings);
  })
  .catch((err) => {
    cb(err);
  })
}

const userJoinClub = (userID, clubID, cb ) => {
  return db.knex.insert({
    user_id: userID,
    club_id: clubID,
  })
  .into('user_club')
  .then((data) => {
      cb(data);
    })
  .catch((err) => {
    cb(err);
  })
}

const retrieveUser = (email, res, cb) => {
  //console.log('retrieving user from db');
  return db.knex('user')
  .where({
    email: email
  })
  .select('*')
  .then((userData) => {
    cb(userData, 200, res);
  })
  .catch((err) => {
      cb('Internal Server Error', 500, res);
  })
};

const retrieveClubsByName = (clubName, res, cb) => {
  return db.knex('club')
  .where({
    club_name: clubName
  })
  .select('*')
  .then((clubData) => {
    cb(clubData, 200, res);
  })
  .catch((err) => {
      cb('Internal Server Error', 500, res);
  });
};

const retrieveClubsByLocation = (clubLocation, res, cb) => {
  //console.log('retrieving user from db');
  return db.knex('club')
  .where({
    club_location: clubLocation
  })
  .select('*')
  .then((clubData) => {
    cb(clubData, 200, res);
  })
  .catch((err) => {
      cb('Internal Server Error', 500, res);
  });
};

const getUserById = (user_id, cb) => {
  return db.knex('user')
  .where({
    id: user_id
  })
  .select()
  .then((err, user) => {
    cb(err, user);
  })
};

const retrieveMeeting = (meetingID, cb) => {
  return db.knex('meeting')
  .where({
    id: meetingID
  })
  .select('*')
  .then((meetingData) => {
      cb(meetingData, 200);
  })
  .catch((err) => {
    cb(err);
  })
};

const addUser = (cb, user, res) => {
  let checkDatabase = emailIsInUse(user.email);
  checkDatabase.then(function(exists) {
    if (exists === false ) {
      return db.knex.insert({
        first_name: user.firstName,
        last_name: user.lastName,
        email: user.email,
        password: user.password,
        user_location: user.location,
        // user_facebook_token: user.confirmRequest.user.facebook.token
      })
      .into('user')
      .then(function() {
        retrieveUser(user.email, res, function(userData, statusCode, res) {
          for (var i = 0; i < userData.length; i++ ) {
            userData[i].password = 'encrypted';
          }
          cb(userData, statusCode, res);
        });
      });
    } else {
      let err = 'Error.  An account with that email address already exists.';
      console.log(err);
      cb(err, 401, res);
    }
  });
};

const saveMeeting = (cb, meeting/*, user*/, res) => { // <-- need to add user as arg
  console.log(meeting, '<-- meeting');
  return db.knex.insert({
    meeting_date: meeting.date,
    meeting_time: meeting.time,
    meeting_host: meeting.host,
    meeting_street_address: meeting.address,
    meeting_notes: meeting.notes,
    // club_id: user,  // <-- need to add user as arg
  })
  .into('meeting')
  .then(function(meetingID) {
    retrieveMeeting(meetingID, function(userData, statusCode) {
      cb(userData, statusCode, res);
    });
  });
};

const addClub = (cb, club, res) => {
  let checkDatabase = clubNameIsTaken(club.clubName);
  console.log('club: ', club);
  checkDatabase.then((exists) => {
    if (exists === false ) {
      return db.knex.insert({
        club_name: club.clubName,
        club_location: club.clubCity,
        club_admin_user_id: club.userId,
        club_description: club.description,
      })
      .into('club')
      .then(function(clubID) {
        retrieveClub(clubID, function(clubData) {
          cb(clubData, 200, res);
        });
      });
    }  else {
      let err = 'Error.  A club with that name already exists.';
      console.log(err);
      cb(err, 401, res);
    }
  });
};

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
  retrieveClubIDsByUser,
  getUserById
};

