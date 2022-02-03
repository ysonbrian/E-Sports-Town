const mongoose = require('mongoose');

const VoteStateSchema = new mongoose.Schema(
  {
    id: Number,
    tokenId: String,
    state: String,
    created_at: { type: Date, default: Date.now },
  },
  { collection: 'votestate' }
);

module.exports = mongoose.model('VoteState', VoteStateSchema);
