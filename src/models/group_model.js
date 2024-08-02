const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  members: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  }]
}, { timestamps: true });

const Group = mongoose.model('Group', groupSchema);

module.exports = Group;
