const knex = require('./index.js');

const retrieveClubs = (cb, dataObj) => {
  return knex.select().from('club').then(function(clubs, cb) {
    cb(clubs, dataObj);
  })
}

const addUser = (cb, user, res) => {
  console.log('addUser invoked')
  let email = user.confirmRequest.email;
  if (!checkUserByEmail(email) ) {
    console.log('getting ready to add new user!');
    // do something to add the user
    return knex.insert({
      first_name: user.confirmRequest.first_name,
      last_name: user.confirmRequest.last_name,
      email: user.confirmRequest.email,
      password: user.confirmRequest.password,
      user_city: user.confirmRequest.user_city,
      user_state_province: user.confirmRequest.user_state
    }).into('user')
    .then(function(data) {
      cb(data, user, res)
    })
  } else {
    let err = 'Error.  An account with that email address already exists.'
    cb(err, user, res);
  }
}

const checkUserByEmail = (email) => {
  console.log('checkUserByEmail invoked');
  return false;
  // return knex('user')
  //   .where({'user.email': email})
}





module.exports = {
  retrieveClubs,
  addUser
}
