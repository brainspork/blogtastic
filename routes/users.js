const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');

const User = require('../models/user');

//Register
router.post('/register', (req, res, next) => {
  let newUser = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
    prefrences: {
      displayAge: req.body.prefrences.displayAge,
      displayName: req.body.prefrences.displayName,
      displayEmail: req.body.prefrences.displayEmail
    }
  });

  User.addUser(newUser, (err, user) => {
    if(err) {
      res.json({success: false, msg: 'Failed to register user'});
    } else {
      res.json({success: true, msg: 'User register'});
    }
  });
});

//Authenticate
router.post('/authenticate', (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  User.getUserByUsername(username, (err, user) => {
    if(err) throw err;
    if(!user) {
      return res.json({success: false, msg: 'User not found'});
    }

    User.comparePassword(password, user.password, (err, isMatch) => {
      if(err) throw err;
      //checks if password matches stored password on log in
      if(isMatch) {
        const token = jwt.sign(user.toJSON(), config.secret, {
          expiresIn: 604800
        });

        res.json({
          success: true,
          token: 'JWT ' + token,
          user: {
            id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            username: user.username
          }
        });
      } else {
        return res.json({success: false, msg: 'Wrong Password'})
      }
    });
  });
});

//Profile
router.get('/profile', passport.authenticate('jwt', {session: false}), (req, res) => {
  res.json({user: req.user});
});

//Update
router.put('/update', (req, res) => {
  const user = req.body;
  const updateUser = new User({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    username: user.username,
    age: user.age,
    bio: user.bio,
    profileImage: user.profileImage,
    prefrences: {
      displayAge: user.prefrences.displayAge,
      displayName: user.prefrences.displayName,
      displayEmail: user.prefrences.displayEmail
    }
  });

  User.updateUser(user.id, updateUser, (err, user) => {
    if(err) {
      res.json({success: false, msg: 'Failed to update user'});
    } else {
      res.json({success: true, msg: 'User updated'});
    }
  });
});

//Exports router to app.js
module.exports = router;
