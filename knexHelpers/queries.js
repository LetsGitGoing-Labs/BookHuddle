const knex = require('./index.js');

const retrieveClubs = (cb, dataObj) => {
  return knex.select().from('club').then(function(clubs, cb) {
    cb(clubs, dataObj);
  })
}

const addUser = (cb, user, res) => {
  let email = user.email;
  if (!checkUserByEmail(email) ) {
    // do something to add the user
    return knex.insert({
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      password: user.password,
      user_city: user.city,
      user_state_province: user.state
    })
    .into('user')
    .then(function(data) {
      cb(data, user, res)
    })
  } else {
    let err = 'Error.  An account with that email address already exists.'
    cb(err, user, res);
  }
}

const checkUserByEmail = (email) => {
  return knex('user')
    .where({'user.email': email})
}





module.exports = {
  retrieveClubs,
  addUser
}
