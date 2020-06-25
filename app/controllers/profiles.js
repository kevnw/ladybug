const User = require('../models/User')
const Profile = require('../models/Profile')

const {
  handleError,
  handleSuccess,
  buildErrObject,
  buildSuccObject
} = require('../middleware/utils');

/*********************
 * Private functions *
 *********************/

 /* Update profile */
const updateProfile = async (userId, newProfile) => {
  return new Promise((resolve, reject) => {
    Profile.updateOne({ user: userId }, newProfile)
    .then(result => {
      if (result.n) {
        if (result.nModified)
          resolve(buildSuccObject('Profile updated'));
        else reject(buildErrObject(422, 'No changes made'));
      } else reject(buildErrObject(422, 'Profile not found'));
    })
    .catch(error => handleError(res, buildErrObject(422, error.message)));
  })
}

 /********************
 * Public functions *
 ********************/

 exports.editProfile = async (req, res) => {
  try {
    const profile = await Profile.findOneAndUpdate({
      user: req.body._id
    }, 
    req.body.profile, 
    { new: true })

    handleSuccess(res, profile)
  } catch (err) {
    handleError(res, buildErrObject(422, err.message))
  }
 }

 exports.getProfileInfo = async (req, res) => {
    Profile.findOne({ user: req.params.userId })
      .lean()
      .then(profile => {
        if (profile) handleSuccess(res, buildSuccObject(profile));
        else handleError(res, buildErrObject(422, 'Profile not found'));
      })
      .catch(err => handleError(res, buildErrObject(422, err.message)));
 }
 