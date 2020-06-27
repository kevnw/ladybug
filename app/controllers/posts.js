const Post = require('../models/Post')
const User = require('../models/User')
const Module = require('../models/Module')
const University = require('../models/University')

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
      .select('_id name avatar')
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
      .select('_id name posts university')
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
      .select('_id module moduleName authorName upvote downvote comments avatar uniName uniAcronym nOfUpvote')
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

 /* Finds university by name  */
 const findUniversityById = async id => {
  return new Promise((resolve, reject) => {
    University.findOne({ _id: id })
      .select('name modules _id acronym')
      .then(uni => {
        if (!uni) {
          reject(buildErrObject(422, 'University does not exist'));
        } else {
          resolve(uni); // returns mongoose object
        }
      })
      .catch(err => reject(buildErrObject(422, err.message)));
  });
};

/* Returns all post sorted from upvote */
const sortedPost = async () => {
  return new Promise((resolve, reject) => {
    Post.find()
    .toArray()
    .sort({ nOfUpvote: 1 })
    .then(postList => {
      resolve(postList)
    })
    .catch(err => reject(buildErrObject(422, err.message)));
  })
}

 /********************
 * Public functions *
 ********************/

exports.getPostList = async (req, res) => {
  Post.find()
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
      module: req.body.post.module,
      date: Date.now(),
      nOfUpvote: 0
    });

    const author = await findUserById(newPost.author)
    const mod = await findModuleyById(newPost.module)
    const uni = await findUniversityById(mod.university)
    

    newPost.authorName = author.name
    newPost.moduleName = mod.name
    newPost.avatar = author.avatar
    newPost.uniName = uni.name
    newPost.uniAcronym = uni.acronym
    mod.posts.unshift(newPost._id)
  
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
    const post = await findPostById(req.params.postId)
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
  Post.findOne({ _id: req.params.postId })
    .lean()
    .then(post => {
      if (post) handleSuccess(res, buildSuccObject(post));
      else handleError(res, buildErrObject(422, 'Post not found'));
    })
    .catch(err => handleError(res, buildErrObject(422, err.message)));
};

exports.upvote = async (req, res) => {
  try {
    const post = await findPostById(req.params.postId)
    const user = await findUserById(req.body._id)

    const downvote_idx = post.downvote.indexOf(user._id)
    const upvote_idx = post.upvote.indexOf(user._id)

    if (downvote_idx > -1) {
      const temp = []
      for (i = 0; i < post.downvote.length; i++) {
        if (i != downvote_idx) {
          temp.push(post.downvote[i])
        }
      }
      post.downvote = temp
    } 

    if (upvote_idx <= -1) {
      post.upvote.unshift(user._id)
    } else {
      const temp = []
      for (i = 0; i < post.upvote.length; i++) {
        if (i != upvote_idx) {
          temp.push(post.upvote[i])
        }
      }
      post.upvote = temp
    }

    post.nOfUpvote = post.upvotes.length
    post.save()
    handleSuccess(res, buildSuccObject(post))
  } catch (err) {
    handleError(res, buildErrObject(422, err.message))
  }
}

exports.downvote = async (req, res) => {
  try {
    const post = await findPostById(req.params.postId)
    const user = await findUserById(req.body._id)

    const upvote_idx = post.upvote.indexOf(user._id)
    const downvote_idx = post.downvote.indexOf(user._id)

    if (upvote_idx > -1) {
      const temp = []
      for (i = 0; i < post.upvote.length; i++) {
        if (i != upvote_idx) {
          temp.push(post.upvote[i])
        }
      }
      post.upvote = temp
    }

    if (downvote_idx <= -1) {
      post.downvote.unshift(user._id)
    } else {
      const temp = []
      for (i = 0; i < post.downvote.length; i++) {
        if (i != downvote_idx) {
          temp.push(post.downvote[i])
        }
      }
      post.downvote = temp
    }

    post.save()
    handleSuccess(res, buildSuccObject(post))
  } catch (err) {
    handleError(res, buildErrObject(422, err.message))
  }
}

exports.comment = async (req, res) => {
  try {
    const post = await findPostById(req.params.postId)
    const user = await findUserById(req.body._id)

    var comment = {
      author: user._id,
      text: req.body.text,
      authorName: user.name,
      avatar: user.avatar
    }

    post.comments.push(comment)
    post.save()
    handleSuccess(res, buildSuccObject(post.comments))
  } catch (err) {
    handleError(res, buildErrObject(422, err.message))
  }
}

exports.deleteComment = async (req, res) => {
  try {
    const post = await findPostById(req.params.postId)
    const commentId = req.params.commentId
    const temp = []

    for (i = 0; i < post.comments.length; i++) {
      if (post.comments[i]._id != commentId) {
        temp.push(post.comments[i])
      }
    }

    post.comments = temp
    post.save()
    handleSuccess(res, buildSuccObject(post.comments))
  } catch (err) {
    handleError(res, buildErrObject(422, err.message))
  }
}

exports.givePostRecommendations = async (req, res) => {
  try {
    const postList = await sortedPost()
    const temp = []
    for (i = 0; i < 3; i++) {
      temp.push(postList[i])
    }

    handleSuccess(res, buildSuccObject(temp))
  } catch (err) {
    handleError(res, buildErrObject(422, err.message))
  }
}
