const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

//User Schema
const UserSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  age: {
    type: Number
  },
  profileImage: {
    data: Buffer,
    contentType: String
  },
  bio: {
    type: String
  },
  prefrences: {
    displayName: {
      type: Boolean
    },
    displayEmail: {
      type: Boolean
    },
    displayAge: {
      type: Boolean
    }
  }
});

const User = module.exports = mongoose.model('User', UserSchema);

module.exports.getUserById = function(id, callback) {
  User.findById(id, callback);
}

module.exports.getUserByUsername = function(username, callback) {
  const query = {username: username};
  User.findOne(query, callback);
}

module.exports.addUser = function(newUser, callback) {
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if(err) throw err;
      newUser.password = hash;
      newUser.save(callback);
    });
  });
}

module.exports.comparePassword = function(candidatePassword, hash, callback) {
  bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
    if(err) throw err;
    callback(null, isMatch);
  });
}

module.exports.updateUser = function(id, user, callback) {
  const query = {_id: id};
  const update = {
    firstName: user.firstName,
    lastName: user.lastName,
    age: user.age,
    username: user.username,
    email: user.email,
    bio: user.bio,
    prefrences: {
      displayAge: user.prefrences.displayAge,
      displayName: user.prefrences.displayName,
      displayEmail: user.prefrences.displayEmail
    }
  }
  User.update(query, update, {upsert: true}, callback);
}
