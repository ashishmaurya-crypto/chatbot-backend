const mongoose = require('mongoose');
const { Schema } = mongoose;

const messageSchema = new mongoose.Schema({
  sender: { type: Schema.Types.ObjectId, ref: 'users', required: true },
  recipients: [{ type: Schema.Types.ObjectId, ref: 'users', required: true }], // Handles both individual and group messages
  content: { type: String, required: true },
  messageType: { type: String, enum: ['text', 'image', 'video', 'file'], default: 'text' }, // Handles different message types
  attachment: { type: String }, // URL or path to the attachment
  status: {
    type: String,
    enum: ['sent', 'delivered', 'read'],
    default: 'sent'
  },
  readBy: [{ type: Schema.Types.ObjectId, ref: 'users' }], // List of users who have read the message
  timestamp: { type: Date, default: Date.now },
}, { timestamps: true });

const Message = mongoose.model('Messages', messageSchema);

module.exports = Message;


// const mongoose = require('mongoose');

// const messageSchema = new mongoose.Schema({
//   sender: { type: Schema.Types.ObjectId, ref: 'users', required: true },
//   receiver: { type: Schema.Types.ObjectId, ref: 'users', required: true },
//   users: Array,
//   content: { type: String, required: true },
//   timestamp: { type: Date, default: Date.now },
// });



// module.exports = messageSchema;
