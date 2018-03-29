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

// CHECKUSER FN AFTER IMPLEMENTING PASSPORT
const checkUser = (user, cb) => {
   return db.knex('user')
  .where({
    email: user.email,
  })
  .select()
  .then((err, user) => {
    cb(err, user)
  });
};

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

const retrieveMeetingsByClubID = (clubID, cb ) => {
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

const userJoinClub = (userID, clubID ) => {

}

// const retrieveMeetingsByUserID = (userID, cb ) => {
//   retrieveClubIDsByUser(userID, (clubs) => {
//     let calls = [];
//     for (var i = 0; i < clubs.length; i++ ) {
//       calls.push(retrieveMeetingsByClubID(clubs[i], (meetings) => {
//         return meetings;
//       }))
//     }
//     Promise.all(calls).then((nestedArray) => {
//       let allMeetings = [];
//       for (var j = 0; j < nestedArray.length; j++ ) {
//         allMeetings.concat(nestedArray[j]);
//       }
//       return allMeetings;
//     })
//   });

//   // O an array of meeting objects all pertaining to a userID
//   // I user ID and a cb (resolve)
//   // C none
//   // E xample: if user 8218 is a member of club 231 and 876,
//   //       get the meetings of club 231: an array of meeting ids
//   //       get the meetings of club 876; an array of meeting ids
//   //       combine these arrays into one array of meeting ids
//   //             retrive each meeting object by its ID and push into an array
//   //             return array
//   //
//   //
// }

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
    if (meetingData.length > 0 ) {
      cb(meetingData, 200);
    } else {
      cb('Internal Server Error', 500);
    }
  });
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
  checkDatabase.then((exists) => {
    if (exists === false ) {
      console.log(`getting ready to add new club: ${club.clubName}`);
      return db.knex.insert({
        club_name: club.clubName,
        club_city: club.clubCity,
        club_state_province: club.clubState,
        // club_admin_email: club.clubAdminEmail,
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
  retrieveClubsByLocation
  checkCredentials,
  retrieveClubIDsByUser
};

