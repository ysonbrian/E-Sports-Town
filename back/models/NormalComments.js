const mongoose = require('mongoose');

const NormalCommentsSchema = new mongoose.Schema(
  {
    id: Number,
    userAddress: String,
    comment: String,
    created_at: { type: Date, default: Date.now },
  },
  { collection: 'normalcomments' }
);

module.exports = mongoose.model('NormalComments', NormalCommentsSchema);
