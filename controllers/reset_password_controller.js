const User = require('../models/user');
const resetPasswordToken = require('../models/reset_password_token');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const resetPasswordMailer = require('../mailers/reset_password_mail');
const passwordChangeMailer = require('../mailers/password_changed_mail');

module.exports.forgotPasswordForm = function (req, res) {
  try {
    return res.render('forgot_password_form', {
      title: 'Reset Password',
    });
  } catch (err) {
    req.flash('error', err);
    return res.redirect('back');
  }
};

module.exports.resetPasswordLink = async (req, res) => {
  try {
    if (req?.isAuthenticated() && res?.locals?.user?.email) {
      req.body.mail = res.locals.user.email;
    }
    let user = await User.findOne({ email: req.body.email });
    await resetPasswordToken.findOneAndDelete({ user: user });

    console.log('resetPasswordLink', req.body.email);
    console.log(user);
    if (user) {
      let resetLink = await resetPasswordToken.create({
        user: user,
        accesstoken: crypto.randomBytes(20).toString('hex'),
        isValid: true,
      });
      resetPasswordMailer.sendResetPasswordMail(user, resetLink.accesstoken);
      req.flash('success', 'Reset password Link sent to mail');
      return res.redirect('/');
    } else {
      req.flash('error', 'No account exists with this account,Please Sign up!');
      return res.redirect('back');
    }
  } catch (err) {
    console.log('error in reseting password', err);
    return;
  }
};

module.exports.resetPasswordForm = async (req, res) => {
  let token = await resetPasswordToken.findOne({
    accesstoken: req.params.token,
  });
  console.log(token);
  if (!token) {
    console.log('Invalid Access token');
    return res.send(' <center> <h1> Invalid Access token <h1> </center>');
  } else if (!token.isValid) {
    return res.send('<center> <h1> This Token has expired :/ <h1> </center>');
  } else {
    return res.render('reset_password_form', {
      title: 'Reset passwword',
      accesstoken: req.params.token,
    });
  }
};

module.exports.resetPasswordDetails = async (req, res) => {
  let password = req.body.password;
  let confirmpassword = req.body.confirmpassword;
  let token = req.body.token;

  if (password != confirmpassword) {
    console.log('Password not matched');
    req.flash('error', 'Password not matched');
    return res.redirect('back');
  }

  let resettoken = await resetPasswordToken
    .findOne({ accesstoken: token })
    .populate('user');
  if (!resettoken || resettoken.isValid == false) {
    req.flash('error', 'Token is invalid or expired');
    return res.redirect('/');
  }
  let salt = 7;
  //encrypting password
  let passwordHash = await bcrypt.hash(password, salt);
  resettoken.user.password = passwordHash;
  resettoken.user.isPasswordAvailable = true;
  resettoken.isValid = false;
  resettoken.user.save();
  resettoken.save();
  req.flash('success', 'password is changed successfully');
  passwordChangeMailer.sendPasswordchangeUpdateMail(resettoken.user);
  return res.redirect('/');
};
