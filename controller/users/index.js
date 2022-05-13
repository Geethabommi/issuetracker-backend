const mongoose = require('mongoose');
const User = require('../../models/users');
module.exports.userSignup = async (req, res) => {
  console.log(req.body);
  let user = await User.create(req.body);
  return res.json({
    msg: 'request successful',
    user,
  });
};
