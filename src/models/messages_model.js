const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  sender: { type: Schema.Types.ObjectId, ref: 'users', required: true },
  receiver: { type: Schema.Types.ObjectId, ref: 'users', required: true },
  content: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});



module.exports = messageSchema;
