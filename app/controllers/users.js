const User = require('../models/User')
const Module = require('../models/Module')
const University = require('../models/University');
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

/* Finds user by id  */
const findUserById = async id => {
  return new Promise((resolve, reject) => {
    User.findOne({ _id: id })
      .select('name email role verified _id following')
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

/* Finds module by id  */
const findModuleById = async id => {
  return new Promise((resolve, reject) => {
    Module.findOne({ _id: id })
      .select('_id name description posts followers')
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

const findAllPost = async () => {
  return new Promise((resolve, reject) => {
    Post.find()
    .lean()
    .then(postList => resolve(buildSuccObject(postList)))
    .catch(err => reject(buildErrObject(422, err.message)));
  })
  
}

 /********************
 * Public functions *
 ********************/
exports.followModule = async (req, res) => {
  try {
    const userId = req.body._id
    const user = await findUserById(userId)
    const mod = await findModuleById(req.params.moduleId)
    
    if (user.following.indexOf(mod._id) === -1) {
      user.following.push(mod._id)
    } else {
      handleError(res, buildErrObject(422, 'User already followed ' + mod.name))
      return
    }
    
    if (mod.followers.indexOf(user._id) === -1) {
      mod.followers.push(user._id)
    } else {
      handleError(res, buildErrObject(422, 'User already followed ' + mod.name))
    }

    user.save()
    mod.save()
    handleSuccess(res, buildSuccObject(mod.followers))
  } catch (err) {
    handleError(res, buildErrObject(422, err.message));
  }
}

exports.unfollowModule = async (req, res) => {
  try {
    const userId = req.body._id
    const moduleId = req.params.moduleId
    const user = await findUserById(userId)
    const mod = await findModuleById(moduleId)
    const user_idx = user.following.indexOf(mod._id)
    const mod_idx = mod.followers.indexOf(user._id)

    if (user_idx > -1) {
      const temp = []
      user.following.forEach(element => {
        if (element != moduleId) {
          temp.push(element)
        }
      })
      user.following = temp
    } else {
      handleError(res, buildErrObject(422, 'User does not follow ' + mod.name))
      return
    }
    if (mod_idx > -1) {
      const temp = []
      mod.followers.forEach(element => {
        if (element != userId) {
          temp.push(element)
        }
      })
      mod.followers = temp
    } else {
      handleError(res, buildErrObject(422, 'User does not follow ' + mod.name))
      return
    }
  
    user.save()
    mod.save()
    handleSuccess(res, buildSuccObject(mod.followers))
  } catch (err) {
    handleError(res, buildErrObject(422, err.message));
  }
}

exports.getFollowedModulesFromUni = async (req, res) => {
  try {
    const user = await findUserById(req.body._id)
    var temp = []

    University.find()
    .select('name modules acronym').sort({name: 1})
    .lean()
    .then(universityList => {
      const fixedList = []
      universityList.forEach(uni => {
        user.following.forEach(module => {
          uni.modules.forEach(id => {
            if (("" + id) == ("" + module)) {
              temp.push(module)
            }
          })
        })
        uni.modules = temp
        if (temp.length >= 1) {
          fixedList.push(uni)
        }
        temp = []
    })
      handleSuccess(res, buildSuccObject(fixedList))
    })
    .catch(err => handleError(res, buildErrObject(422, err.message)));

  } catch (err) {
    handleError(res, buildErrObject(422, err.message));
  }
}

exports.getAllPostFromUser = async (req, res) => {
  try {
    const userId = req.params.userId
    const postList = await findAllPost()
    const temp = []

    for (i = 0; i < postList.length; i++) {
      if (postList[i].author == userId) {
        temp.push(postList[i])
      }
    }

    handleSuccess(res, buildSuccObject(temp))
  } catch (err) {
    handleError(res, buildErrObject(422, err.message));
  }
}