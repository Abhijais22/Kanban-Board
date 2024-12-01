const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  googleId: { type: String },
  accessLevel: { type: String, enum: ['read-only', 'edit'], default: 'edit' },
});

module.exports = mongoose.model('User', UserSchema);
