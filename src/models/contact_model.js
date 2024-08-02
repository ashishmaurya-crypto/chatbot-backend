const mongoose = require('mongoose');

const contactListSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true
  },
  friends: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  }],
  groups: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Group'
  }]
}, { timestamps: true });

const ContactList = mongoose.model('ContactList', contactListSchema);

module.exports = ContactList;

