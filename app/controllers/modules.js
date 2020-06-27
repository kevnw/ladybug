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

 /* Finds module by Id */
const findModuleyById = async (id) => {
  return new Promise((resolve, reject) => {
    Module.findOne({ _id: id })
      .select('_id name title description posts followers university')
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
 * @param {string} id - post's id
 */
const findPostById = async (postId) => {
  return new Promise((resolve, reject) => {
    Post.findOne({ _id: postId })
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

/**
 * Finds university by ID
 * @param {string} id - universitiy's id
 */
const findUniversityById = async (uniId) => {
  return new Promise((resolve, reject) => {
    University.findOne({ _id: uniId })
      .select('_id name acronym')
      .then(uni => {
        if (!uni) {
          reject(buildErrObject(422, 'University does not exist'));
        } else {
          resolve(uni); // returns mongoose object
        }
      })
      .catch(err => reject(buildErrObject(422, err.message)));
  })
}

/**
 * Finds university by acronym
 * @param {string} id - universitiy's id
 */
const findUniversityByAcronym= async (acronym) => {
  return new Promise((resolve, reject) => {
    University.findOne({ acronym: acronym })
      .select('_id name modules')
      .then(uni => {
        if (!uni) {
          reject(buildErrObject(422, 'University does not exist'));
        } else {
          resolve(uni); // returns mongoose object
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
  try {
    let mod = await findModuleyById(req.params.moduleId)
    const uni = await findUniversityById(mod.university)

    mod = {
      ...mod._doc,
      acronym: uni.acronym
    }
    
    handleSuccess(res, buildSuccObject(mod))
  } catch (err) {
    handleError(res, buildErrObject(422, err.message));
  }
};

exports.getModuleInfoFromAcronym = async (req, res) => {
  try {
    const uni = await findUniversityByAcronym(req.params.uniAcronym)
    const temp = []
    for (i = 0; i < uni.modules.length; i++) {
      const mod = await findModuleyById(uni.modules[i])
      temp.push(mod)
    }

    const mod = temp.find(element => (element.name == req.params.moduleName))
    handleSuccess(res, buildSuccObject(mod))
  } catch (err) {
    handleError(res, buildErrObject(422, err.message));
  }
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

exports.giveModuleRecommendations = async (req, res) => {
  try {
    Module.find()
    .toArray()
    .sort((x1, x2) => {
      return x1.followers.length - x2.followers.length
    })
    .then(moduleList => {
      handleSuccess(res, buildSuccObject(moduleList))
    })
    .catch(err => handleError(res, buildErrObject(422, err.message)));
  } catch (err) {
    handleError(res, buildErrObject(422, err.message))
  }
}
