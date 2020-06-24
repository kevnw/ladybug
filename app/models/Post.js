const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    upvote: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }
    ],
    downvote: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }
    ],
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    authorName: {
      type: String
    },
    comments: [
      {
        author: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User'
        },
        text: String,
        date: {
          type: Date,
          default: Date.now()
        },
        authorName: {
          type: String
        },
        avatar: {
          type: String
        }
      }
    ],
    module: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Module',
      required: true
    },
    moduleName: {
      type: String
    },
    avatar: {
      type: String
    }, 
    uniName: {
      type: String
    },
    date: {
      type: Date,
      default: Date.now()
    }
  }
)

module.exports = mongoose.model('Post', PostSchema)
