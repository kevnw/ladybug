const User = require('../models/User')
const Module = require('../models/Module')
const auth = require('../middleware/auth')

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
      .select('name email role verified _id')
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

/* Finds module by name  */
const findModuleByName = async name => {
  return new Promise((resolve, reject) => {
    Module.findOne({ name })
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

 /********************
 * Public functions *
 ********************/
exports.followModule = async (req, res) => {
  try {
    const userId = req.body._id
    const user = await findUserById(userId)
    const mod = await findModuleByName(req.params.moduleName)
    user.followModule(mod._id)
    mod.addFollower(user._id)
    handleSuccess(res, buildSuccObject('User ' + user.name + ' successfully followed ' + mod.name))
  } catch (err) {
    handleError(res, buildErrObject(422, err.message));
  }
}
