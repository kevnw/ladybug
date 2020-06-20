const mongoose = require('mongoose')

const ModuleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
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
        ref: 'User',
        default: []
      }
    ]
  }
)

ModuleSchema.methods.addFollower = (user_id) => {
  if (this.followers.indexOf(user_id) === -1) {
    this.followers.push(user_id)
  }
  return this.save()
}

module.exports = mongoose.model('Module', ModuleSchema)
