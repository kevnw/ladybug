const Post = require('../models/Post')
const User = require('../models/User')
const Module = require('../models/Module')

const {
  handleError,
  handleSuccess,
  buildErrObject,
  buildSuccObject
} = require('../middleware/utils');

/*********************
 * Private functions *
 *********************/

 /* Finds user by id  */
const findUserById = async id => {
  return new Promise((resolve, reject) => {
    User.findOne({ _id: id })
      .select('name')
      .then(user => {
        if (!user) {
          reject(buildErrObject(422, 'User does not exist'));
        } else {
          resolve(user); // returns mongoose object
        }
      })
      .catch(err => reject(buildErrObject(422, err.message)));
  });
};

 /* Finds module by id */
 const findModuleyById = async (id) => {
  return new Promise((resolve, reject) => {
    Module.findOne({ _id: id })
      .select('_id name posts')
      .then(mod => {
        if (!mod) {
          reject(buildErrObject(422, 'Module does not exist'));
        } else {
          resolve(mod); // returns mongoose object
        }
      })
      .catch(err => reject(buildErrObject(422, err.message)));
  });
};

/* Finds post by id*/
const findPostById = async (id) => {
  return new Promise((resolve, reject) => {
    Post.findOne({ _id: id })
      .select('_id name module moduleName authorName')
      .then(post => {
        if (!post) {
          reject(buildErrObject(422, 'Post does not exist'));
        } else {
          resolve(post); // returns mongoose object
        }
      })
      .catch(err => reject(buildErrObject(422, err.message)));
  });
};

/* Deletes post from database */
const deletePostFromDb = async (id) => {
  return new Promise((resolve, reject) => {
    Post.deleteOne({ _id: id })
    .then(result => {
      if (result.n) resolve(buildSuccObject('Post deleted'));
      else reject(buildErrObject(422, 'Post not found'));
    })
    .catch(error => handleError(res, buildErrObject(422, error.message)));
  })
}

 /********************
 * Public functions *
 ********************/

exports.getPostList = async (req, res) => {
  Post.find()
    .select('_id text title author')
    .lean()
    .then(postList => handleSuccess(res, buildSuccObject(postList)))
    .catch(err => handleError(res, buildErrObject(422, err.message)));
};

exports.createPost = async (req, res) => {
  try {
    var newPost = new Post({
      text: req.body.post.text,
      title: req.body.post.title,
      author: req.body._id,
      module: req.body.post.module
    });

    const author = await findUserById(newPost.author)
    const mod = await findModuleyById(newPost.module)
  
    newPost.authorName = author.name
    newPost.moduleName = mod.name
    mod.posts.push(newPost._id)
  
    mod.save()
    newPost
      .save()
      .then(post =>
        handleSuccess(res, buildSuccObject(post))
      )
      .catch(error => handleError(res, buildErrObject(422, error.message)));
  } catch (err) {
    handleError(res, buildErrObject(422, err.message))
  }
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
  try {
    const post = await findPostById(req.body.postId)
    const mod = await findModuleyById(post.module)

    const post_idx = mod.posts.indexOf("" + post._id)

    if (post_idx > -1) {
      const temp = []
      for (i = 0; i < mod.posts.length; i++) {
        if (i != post_idx) {
          temp.push(mod.posts[i])
        }
      }
      mod.posts = temp
    } else {
      handleError(res, buildErrObject(422, 'Post does not belong to ' + mod.name))
      return
    }

    mod.save()
    await deletePostFromDb(post._id)
    handleSuccess(res, buildSuccObject('Post delete and removed from ' + mod.name))
  } catch (err) {
    handleError(res, buildErrObject(422, err.message))
  }
};

exports.getPostInfo = async (req, res) => {
  Post.findOne({ _id: req.body.postId })
    .select('_id text title author')
    .lean()
    .then(post => {
      if (post) handleSuccess(res, buildSuccObject(post));
      else handleError(res, buildErrObject(422, 'Post not found'));
    })
    .catch(err => handleError(res, buildErrObject(422, err.message)));
};


