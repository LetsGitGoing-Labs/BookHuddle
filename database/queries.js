const knex = require('./index.js');

const retrieveClubs = (cb, dataObj, res) => {
  return knex
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

const checkUser = (user, res, cb) => {
  console.log(user);
   return knex('user')
  .where({
    email: user.email,
    password: user.password
  })
  .select('email')
  .then((data) => {
    if (data.length > 0 ) {
      cb(data, 200, res);
    } else {
      cb(data, 401, res);
    }
  });
};

const clubNameIsTaken = (clubName) => {
  return knex('club')
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
  })
};

const retrieveClub = (clubID, cb ) => {
  console.log('retrieving club from db');
  return knex('club')
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
}

const retrieveUser = (email, res, cb) => {
  console.log('retrieving user from db')
  return knex('user')
  .where({
    email: email
  })
  .select('*')
  .then((userData) => {
    if (userData.length > 0) {
      cb(userData, 200, res);
    } else {
      cb('Internal Server Error', 500, res);
    }
  });
};

const retrieveMeeting = (meetingID, cb) => {
  return knex('meeting')
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
      return knex.insert({
        first_name: user.firstName,
        last_name: user.lastName,
        email: user.email,
        password: user.password,
        user_city: user.city,
        user_state_province: user.state,
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
      let err = 'Error.  An account with that email address already exists.'
      console.log(err);
      cb(err, 401, res);
    }
  })
};

const saveMeeting = (cb, meeting, res) => {
  console.log(meeting, '<-- meeting');
  return knex.insert({
    meeting_date: meeting.date,
    meeting_time: meeting.time,
    meeting_host: meeting.host,
    meeting_street_address: meeting.address,
    meeting_notes: meeting.notes,
  })
  .into('meeting')
  // .then(ADD RECORD TO THE MEETING_CLUB JOIN TABLE)
  .then(function(meetingID) {
    retrieveMeeting(meetingID, function(userData, statusCode) {
      cb(userData, statusCode, res);
    })
  });
};

const addClub = (cb, club, res) => {
  let checkDatabase = clubNameIsTaken(club.clubName);
  checkDatabase.then((exists) => {
    if (exists === false ) {
      console.log(`getting ready to add new club: ${club.clubName}`);
      return knex.insert({
        club_name: club.clubName,
        club_city: club.clubCity,
        club_state_province: club.clubState,
        club_admin_email: club.clubAdminEmail,
        club_description: club.description,
      })
      .into('club')
      .then(function(clubID) {
        retrieveClub(clubID, function(clubData) {
          cb(clubData, 200, res);
        })
      })
    }  else {
      let err = 'Error.  A club with that name already exists.'
      console.log(err);
      cb(err, 401, res);
    }
  })
};

const emailIsInUse = (email) => {
  return knex('user')
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

module.exports = {
  retrieveClubs,
  retrieveClub,
  retrieveUser,
  addUser,
  addClub,
  checkUser,
  saveMeeting
};

