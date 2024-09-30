// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true } // Ensure this field is present and marked as required
});

const User = mongoose.model('User', userSchema);
module.exports = User;
