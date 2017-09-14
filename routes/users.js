const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const User = require('../models/user');

// Register
router.post('/register', (req, res, next) => {
  let newUser = new User({
    name: req.body.name,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password
  });

  User.addUser(newUser, (err, user) => {
    if(err){
      res.json({success: false, msg:'Failed to register user'});
    } else {
      res.json({success: true, msg:'User registered'});
    }
  });
});

// Authenticate
router.post('/authenticate', (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  User.getUserByUsername(username, (err, user) => {
    if(err) throw err;
    if(!user){
      return res.json({success: false, msg: 'User not found'});
    }


    //we have to convert the 'user' because it is a mongodb object and that causes the jwt to throw an error
    const newUser = {
        _id: user._id,
        name: user.name,
        email: user.email,
        username: user.username,
        password: user.password,
        __v: user.__v
    }

    User.comparePassword(password, newUser.password, (err, isMatch) => {
      if(err) throw err;
      console.log('`````````````` comparePassword')
      if(isMatch){
        const token = jwt.sign(newUser, config.secret, {
          expiresIn: 604800 // 1 week
        });

      console.log('`````````````` comparePassword 1')
        res.json({
          success: true,
          token: 'JWT '+token,
          user: {
            id: newUser._id,
            name: newUser.name,
            username: newUser.username,
            email: newUser.email
          }
        });
      } else {
        return res.json({success: false, msg: 'Wrong password'});
      }
    });
  });
});

// Profile
router.get('/profile', passport.authenticate('jwt', {session:false}), (req, res, next) => {
// router.get('/profile', (req, res, next) => {
    console.log('users > /prifile')
  res.json({user: req.user});
});

module.exports = router;