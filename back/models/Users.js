const mongoose = require('mongoose');

const UsersSchema = new mongoose.Schema(
  {
    id: Number,
    userAddress: String,
    master: String,
    token: Number,
    created_at: { type: Date, default: Date.now },
  },
  { collection: 'users' }
);

module.exports = mongoose.model('Users', UsersSchema);
