const Post = require('../models/Post')

const {
  handleError,
  handleSuccess,
  buildErrObject,
  buildSuccObject
} = require('../middleware/utils');

/*********************
 * Private functions *
 *********************/

 /********************
 * Public functions *
 ********************/

exports.createPost = async (req, res) => {
  var newPost = new Post({
    text: req.body.post.text,
    title: req.body.post.title,
    author: req.body.post.author
  });

  newPost
    .save()
    .then(post =>
      handleSuccess(res, buildSuccObject('New post created'))
    )
    .catch(error => handleError(res, buildErrObject(422, error.message)));
};

exports.updatePost = async (req, res) => {
  Post.updateOne({ _id: req.params.postId }, req.body.post)
    .then(result => {
      if (result.n) {
        if (result.nModified)
          handleSuccess(res, buildSuccObject('Post updated'));
        else handleError(res, buildErrObject(422, 'No changes made'));
      } else handleError(res, buildErrObject(422, 'Post not found'));
    })
    .catch(error => handleError(res, buildErrObject(422, error.message)));
};

exports.deletePost = async (req, res) => {
  Post.deleteOne({ _id: req.params.postId })
    .then(result => {
      if (result.n) handleSuccess(res, buildSuccObject('Post deleted'));
      else handleError(res, buildErrObject(422, 'Post not found'));
    })
    .catch(error => handleError(res, buildErrObject(422, error.message)));
};

exports.getPostInfo = async (req, res) => {
  Post.findOne({ _id: req.params.postId })
    .select('_id text title author')
    .lean()
    .then(post => {
      if (post) handleSuccess(res, buildSuccObject(post));
      else handleError(res, buildErrObject(422, 'Post not found'));
    })
    .catch(err => handleError(res, buildErrObject(422, err.message)));
};

exports.getPostList = async (req, res) => {
  Post.find()
    .select('_id text title author')
    .lean()
    .then(postList => handleSuccess(res, buildSuccObject(postList)))
    .catch(err => handleError(res, buildErrObject(422, err.message)));
};
