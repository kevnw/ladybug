const mongoose = require('mongoose')

const ModuleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    logo: {
      type: String,
    },
    posts: [
      { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Post' 
      }
    ],
    followers: [
      { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' 
      }
    ],
    nOfFollowers: {
      type: Number
    },
    university: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'University',
      required: true
    },
    uniAcronym: {
      type: String
    }
  }
)

module.exports = mongoose.model('Module', ModuleSchema)
