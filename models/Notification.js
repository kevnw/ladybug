const mongoose = require('mongoose')

const NotificationSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    read: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      enum: ['comment', 'request', 'upvote'],
      required: true
    },
    action: {
      type: mongoose.Schema.Types.ObjectId, 
      required: true
    },
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' 
    }
  }
)

module.exports = mongoose.model('Notification', NotificationSchema)
