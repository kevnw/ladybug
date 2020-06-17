const mongoose = require('mongoose')

const ArticleSchema = new mongoose.Schema(
  {
    text: {
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
    feature_img: String,
    upvote: Number,
    downvote: Number,
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    comments: [
      {
        author: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User'
        },
        text: String
      }
    ]
  }
)

ArticleSchema.methods.upvote = () => {
  this.upvote++
  return this.save()
}

ArticleSchema.methods.downvote = () => {
  this.downvote--
  return this.save()
}

ArticleSchema.methods.comment = (c) => {
  this.comments.push(c)
  return this.save()
}

ArticleSchema.methods.addAuthor = (author_id) => {
  this.author = author_id
  return this.save()
}

ArticleSchema.methods.getUserArticle = (_id) => {
  Article.find({'author': _id}).then((article) => {
    return article
  })
}

module.exports = mongoose.model('Article', ArticleSchema)