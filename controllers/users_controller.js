const User = require('../models/user');
const signupMailer = require('../mailers/signup_mail');
const bcrypt = require('bcrypt');

module.exports.profile = function (req, res) {
  return res.render('user_profile', {
    title: 'User Profile',
  });
};

// render the sign up page
module.exports.signUp = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect('/users/profile');
  }

  return res.render('user_sign_up', {
    title: 'Authentication App | Sign Up',
  });
};

// render the sign in page
module.exports.signIn = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect('/users/profile');
  }
  return res.render('user_sign_in', {
    title: 'Authentication App | Sign In',
  });
};

// get the sign up data
module.exports.create = async function (req, res) {
  try {
    console.log('create req', req.body);
    if (req.body.password != req.body.confirm_password) {
      req.flash('error', 'Passwords do not match');
      return res.redirect('back');
    }

    let user = await User.findOne({ email: req.body.email });
    console.log('user', user);
    console.log(!user);
    if (!user) {
      let salt = 7;
      //encrypting password
      let passwordHash = await bcrypt.hash(req.body.password, salt);
      let body = {
        email: req.body.email,
        password: passwordHash,
        name: req.body.name,
        isPasswordAvailable: true,
      };
      console.log(body);
      User.create(body, function (err, user) {
        if (err) {
          console.log('error in creating user while signing up');
          req.flash('error', err);
          return;
        }

        req.flash('success', 'Sign up successful');
        signupMailer.sendSignupWelcomeMail(user);
        return res.redirect('/users/sign-in');
      });
    } else {
      req.flash('success', 'You have already signed up, login to continue!');
      return res.redirect('back');
    }
  } catch (err) {
    console.log('error in finding user in signing up', err);

    return;
  }
};

// sign in and create a session for the user
module.exports.createSession = function (req, res) {
  req.flash('success', 'Logged in Successfully');
  return res.redirect('/');
};

module.exports.destroySession = function (req, res) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    req.flash('success', 'You have logged out!');

    return res.redirect('/');
  });
};
