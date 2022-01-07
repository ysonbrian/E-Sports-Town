const mongoose = require('mongoose');

const UsersSchema = new mongoose.Schema({
  id: Number,
  userAddress: String,
  master: String,
  created_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Users', UsersSchema);
