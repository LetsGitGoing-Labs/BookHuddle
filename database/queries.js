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

const checkUser = (user, cb) => {
  let userData = {};
  let clubsData = {};
  return db.knex('user')
    .where({
      email: user.email,
      password: user.password,
    })
    .select()
    .then((user, err) => {
      if (user.length !== 0) {
        userData = user[0];
        return db.knex('user_club')
          .where({
            user_id: user[0].id,
          })
          .select('club_id')
          .then((clubIDs, err) => {
            let query;
            if (clubIDs.length > 0) {
              query = db.knex('club')
                .where({
                  id: clubIDs[0].club_id,
                });
              for (let i = 1; i < clubIDs.length; i++) {
                query = query.orWhere({
                  id: clubIDs[i].club_id,
                });
              }
              query.select()
                .then((clubs, err) => {
                  clubsData = clubs;
                }).then(() => {
                  clubsData.forEach((club, j) => {
                    db.knex('meeting')
                      .where({
                        club_id: clubsData[j].id,
                      })
                      .select()
                      .then((meetings, err) => {
                        clubsData[j].meetings = meetings;
                      })
                      .then(() => {
                        if (j === clubsData.length - 1) {
                          userData.clubs = clubsData;
                          cb(userData);
                        }
                      });
                  });
                });
            } else {
              userData.clubs = [];
              userData.meetings = [];
              cb(userData);
            }
          });
      }
      cb(null);
    });
};

const retrieveUserData = (email, cb) => {
  let userData = {};
  let clubsData = {};
  return db.knex('user')
    .where({
      email,
    })
    .select()
    .then((user, err) => {
      userData = user[0];
      return db.knex('user_club')
        .where({
          user_id: user[0].id,
        })
        .select('club_id')
        .then((clubIDs, err) => {
          let query;
          if (clubIDs.length > 0) {
            // return db.knex('club')
            query = db.knex('club')
              .where({
                id: clubIDs[0].club_id,
              });
            for (let i = 1; i < clubIDs.length; i++) {
              query = query.orWhere({
                id: clubIDs[i].club_id,
              });
            }
            query.select()
              .then((clubs, err) => {
                clubsData = clubs;
              }).then(() => {
                clubsData.forEach((club, j) => {
                  db.knex('meeting')
                    .where({
                      club_id: clubsData[j].id,
                    })
                    .select()
                    .then((meetings, err) => {
                      clubsData[j].meetings = meetings;
                    })
                    .then(() => {
                      if (j === clubsData.length - 1) {
                        userData.clubs = clubsData;
                        cb(userData);
                      }
                    });
                });
              });
          } else {
            userData.meetings = [];
            userData.clubs = [];
            cb(userData);
          }
        });
    });
};

const retrieveMembers = (clubId, cb) => {
  return db.knex('user_club')
  .where({
    club_id: clubId
  })
  .select('user_id')
  .then((userArray) => {
    let query;
    if (userArray.length > 0) {
      query = db.knex('user')
        .where({
          id: userArray[0].user_id,
        });
      for (let i = 1; i < userArray.length; i++) {
        query = query.orWhere({
          id: userArray[i].user_id,
        });
      }
      query.select('first_name', 'last_name', 'profile_url', 'email')
      .then((users) => {
        cb(users)
      })
      .catch((err) => {
        cb(err)
      })
    }
  })
}

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

const retrieveMeeting = (meetingID, cb) =>
  db.knex('meeting')
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

const addTriviaQs = (questions, meetingID, cb) => {
  db.knex('meeting')
    .where({
      id: meetingID,
    })
    .update({
      trivia_questions: questions,
    })
    .then(() =>
        db.knex('meeting')
          .where({
            id: meetingID,
          })
          .select('*')
          .then((meeting) => {
            cb(meeting)
        })
    )
}

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
        profile_url: user.profileUrl,
        // user_facebook_token: user.confirmRequest.user.facebook.token
      })
        .into('user')
        .then(() => {
          retrieveUserData(user.email, (userData) => {
            userData.password = 'encrypted';
            cb(userData);
          });
        });
    }
    const err = 'Error.  An account with that email address already exists.';
    console.log(err);
    cb(err, 401, res);
  });
};

const addMeeting = (meeting, cb) => {
  console.log(meeting, '<-- meeting');
  return db.knex.insert({
    meeting_timestamp: meeting.meetingTimestamp,
    meeting_host: meeting.meetingHost,
    meeting_street_address: meeting.meetingLocation,
    meeting_notes: meeting.meetingNotes,
    meeting_book: meeting.meetingBook,
    club_id: meeting.clubId,
  })
    .into('meeting')
    .then((meetingID) => {
      db.knex('meeting')
      .where({
        id: meetingID
      })
      .select()
      .then((meetingObject) => {
        cb(meetingObject[0]);
      })
    })
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
        .then(clubID => new Promise((resolve, reject) => {
          newClubId = clubID;
          retrieveClub(clubID, (clubData) => {
            resolve(clubData);
          });
        }))
        .then((clubData) => {
          console.log('clubData obj[0]: ', clubData[0]);
          clubResponse = clubData;
          return db.knex.insert({
            club_id: clubData[0].id,
            user_id: clubData[0].club_admin_user_id,
          })
            .into('user_club');
        })
        .then(() => {
          cb(clubResponse);
        });
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

const userJoinClub = (userID, clubID, cb) => {
  db.knex.insert({
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
};

const retrieveTriviaQs = (meetingID, cb) => {
  db.knex('meeting')
    .where({
      id: meetingID
    })
    .select()
    .then((meeting) => {
      cb(meeting[0].trivia_questions)
    })
}

const deleteMeeting = (meetingId, cb) => {
  console.log('deleteMeeting invoked for meeting: ', meetingId)
  db.knex('meeting')
  .where({
    id: meetingId
  })
  .del()
  .then((data, err) => {
    cb(data);
  })
}

module.exports = {
  retrieveClubs,
  retrieveClub,
  retrieveUser,
  addUser,
  addClub,
  checkUser,
  addMeeting,
  getUserById,
  retrieveClubsByName,
  retrieveClubsByLocation,
  userJoinClub,
  retrieveUserData,
  checkCredentials,
  addTriviaQs,
  retrieveTriviaQs,
  retrieveMembers,
  deleteMeeting
};
