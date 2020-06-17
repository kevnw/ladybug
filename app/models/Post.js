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
    feature_img: String,
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
        }
      }
    ],
    date: {
      type: Date,
      default: Date.now()
    }
  }
)

PostSchema.methods.like = () => {
  this.upvote++
  return this.save()
}

PostSchema.methods.dislike = () => {
  this.downvote--
  return this.save()
}

PostSchema.methods.comment = (c) => {
  this.comments.push(c)
  return this.save()
}

PostSchema.methods.addAuthor = (author_id) => {
  this.author = author_id
  return this.save()
}

PostSchema.methods.getUserArticle = (_id) => {
  Article.find({'author': _id}).then((article) => {
    return article
  })
}

module.exports = mongoose.model('Post', PostSchema)
