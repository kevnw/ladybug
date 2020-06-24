const Module = require('../models/Module')
const Post = require('../models/Post')
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

 /* Finds module by university and name  */
const findModuleyById = async (id) => {
  return new Promise((resolve, reject) => {
    Module.findOne({ _id: id })
      .select('_id name title description posts followers')
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

 /**
 * Finds user by ID
 * @param {string} id - user´s id
 */
const findPostById = async (postId) => {
  return new Promise((resolve, reject) => {
    Post.findOne({ _id: postId })
      .select('_id text title author comments upvote downvote authorName moduleName')
      .then(post => {
        if (!post) {
          reject(buildErrObject(422, 'Post does not exist'));
        } else {
          resolve(post); // returns mongoose object
        }
      })
      .catch(err => reject(buildErrObject(422, err.message)));
  })
}

 /********************
 * Public functions *
 ********************/

exports.getPostList = async (req, res) => {
  try {
    const temp = []
    const mod = await findModuleyById(req.params.moduleId)
    for (const element of mod.posts) {
      const post = await findPostById(element)
      temp.push(post)
    }
    
    handleSuccess(res, buildSuccObject(temp))
  } catch (err) {
    handleError(res, buildErrObject(422, err.message));
  }
};

exports.createModule = async (req, res) => {
  var newModule = new Module({
    name: req.body.module.name,
    title: req.body.module.title,
    description: req.body.module.description,
    university: req.body.module.university
  });

  newModule
    .save()
    .then(mod =>
      handleSuccess(res, buildSuccObject('New module created'))
    )
    .catch(error => handleError(res, buildErrObject(422, error.message)));
};

exports.deleteModule = async (req, res) => {
  Module.deleteOne({ _id: req.body.moduleId })
    .then(result => {
      if (result.n) handleSuccess(res, buildSuccObject('Module deleted'));
      else handleError(res, buildErrObject(422, 'Module not found'));
    })
    .catch(error => handleError(res, buildErrObject(422, error.message)));
};

exports.getModuleInfo = async (req, res) => {
  Module.findOne({ _id: req.params.moduleId })
    .select('_id name title description posts followers')
    .lean()
    .then(mod => {
      if (mod) handleSuccess(res, buildSuccObject(mod));
      else handleError(res, buildErrObject(422, 'Module not found'));
    })
    .catch(err => handleError(res, buildErrObject(422, err.message)));
};

exports.getModuleList = async (req, res) => {
  Module.find()
    .select('_id name title description university posts followers')
    .lean()
    .then(moduleList => handleSuccess(res, buildSuccObject(moduleList)))
    .catch(err => handleError(res, buildErrObject(422, err.message)));
};

exports.addPost = async (req, res) => {
  try {
    const mod = await findModuleyById(req.params.moduleId)
    const postId = req.body.postId
    
    if (mod.posts.indexOf(postId) === -1) {
      mod.posts.push(postId)
    } else {
      handleError(res, buildErrObject(422, 'Post already inside module ' + mod.name))
      return
    }

    mod.save()
    handleSuccess(res, buildSuccObject('Post successfully added to ' + mod.name))
  } catch (err) {
    handleError(res, buildErrObject(422, err.message));
  }
}

exports.deletePost = async (req, res) => {
  try {
    const mod = await findModuleyById(req.params.moduleId)
    const postId = req.body.postId

    const post_idx = mod.posts.indexOf(postId)

    if (post_idx > -1) {
      const temp = []
      mod.posts.forEach(element => {
        if (element != postId) {
          temp.push(element)
        }
      })
      mod.posts = temp
    } else {
      handleError(res, buildErrObject(422, 'Post does not belong to ' + mod.name))
      return
    }

    mod.save()
    handleSuccess(res, buildSuccObject('Module removed from ' + mod.name))
  } catch (err) {
    handleError(res, buildErrObject(422, err.message))
  }
}
