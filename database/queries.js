const knex = require('./index.js');

const retrieveClubs = (cb, dataObj) => {
  return knex.select().from('club').then(function(clubs, cb) {
    cb(clubs, dataObj);
  });
};

const checkUser = (user, cb) => {
  console.log(user);
   return knex('user')
  .where({
    email: user.email,
    password: user.password
  })
  .select('email')
  .then((x) => {
    if (x.length > 0 ) {
      cb(true);
    } else {
      cb(false);
    }
  });
}

const addUser = (cb, user, res) => {
  console.log('line 10 add user');
  // let email = user.confirmRequest.email;
  // let checkDatabase = emailIsInUse(email);
  // checkDatabase.then(function(exists) {
  //   if (exists === false ) {
      console.log('line 13 you are adding a user');
      return knex.insert({
        first_name: user.confirmRequest.firstName,
        last_name: user.confirmRequest.lastName,
        email: user.confirmRequest.email,
        password: user.confirmRequest.password,
        user_city: user.confirmRequest.city,
        user_state_province: user.confirmRequest.state,
        // user_facebook_token: user.confirmRequest.user.facebook.token
      })
      .into('user')
      // .then(ADD RECORD TO THE USER_CLUB JOIN TABLE)
      .then(function(data) {
        cb(data, user, res);
      });
    // }
    // else {
    //   let err = 'Error.  An account with that email address already exists.'
    //   cb(err, user, res);
    // }
  // })
};

const addClub = (cb, club, res) => {
  // console.log('addClub invoked')
  // let clubName = club.confirmRequest.club_name;
  // console.log(!checkClubByClubName(clubName), '<-- checkClubByClubName(clubName)');
  // if (!checkClubByClubName(clubName)) {
    console.log('getting ready to add new club!');
    return knex.insert({
      club_name: club.confirmRequest.clubName,
      club_city: club.confirmRequest.clubCity,
      club_state_province: club.confirmRequest.clubState,
      club_admin_email: club.confirmRequest.clubAdminEmail,
      club_description: club.confirmRequest.description,
    })
    .into('club')
    .then(function(data) {
      cb(data, club, res);
    });
  // } else {
  //   console.log('line 48');
  //   let err = 'Error.  A club with that name already exists.'
  //   cb(err, club, res);
  // }
};

const emailIsInUse = (email) => {
  knex('user')
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


const checkClubByClubName = (clubName) => {
  console.log(knex.select().from('club'), '<-- line 77');
  return knex('club')
    .where('club_name', clubName);
};





module.exports = {
  retrieveClubs,
  addUser,
  addClub,
  checkUser
};

