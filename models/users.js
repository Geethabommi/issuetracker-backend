const mongoose = require('mongoose');

const SchemaObj = mongoose.Schema;

const userSchema = new SchemaObj({
  email: String,
  password: String,
});

const User = mongoose.model('user', userSchema);

module.exports = User;
