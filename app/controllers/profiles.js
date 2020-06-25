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

 /* Finds user by id */
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

/* Finds profile by user id */
const findProfileByUserId = async (userId) => {
  return new Promise((resolve, reject) => {
    Profile.findOne({ user: userId })
      .select('_id user name dateJoined experiences educations')
      .then(profile => {
        if (!profile) {
          reject(buildErrObject(422, 'Profile does not exist'));
        } else {
          resolve(profile); // returns mongoose object
        }
      })
      .catch(err => reject(buildErrObject(422, err.message)));
  });
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
  try {
    const profile = await findProfileByUserId(req.params.userId)

    handleSuccess(res, profile)
  } catch (err) {
    handleError(res, buildErrObject(422, err.message))
  }
 }

 exports.addExperience = async (req, res) => {
  try {
    const user = await findUserById(req.body._id)
    const profile = await findProfileByUserId(user._id)

    profile.experiences.unshift(req.body.experience)
    profile.save()
    handleSuccess(res, profile.experiences)
  } catch (err) {
    handleError(res, buildErrObject(422, err.message))
  }
 }

 exports.deleteExperience = async (req, res) => {
   try {
    const user = await findUserById(req.body._id)
    const profile = await findProfileByUserId(user._id)
    const experienceId = req.params.experienceId

    const temp = []
    for (i = 0; i < profile.experiences.length; i++) {
      if (profile.experiences[i]._id != experienceId) {
        temp.push(profile.experiences[i])
      }
    }
    
    profile.experiences = temp
    profile.save()
    handleSuccess(res, profile.experiences)
   } catch (err) {
    handleError(res, buildErrObject(422, err.message))
   }
  }

exports.addEducation = async (req, res) => {
  try {
  if (!req.body.education) {
    handleError(res, buildErrObject(422, "No data given!"))
  }

  const user = await findUserById(req.body._id)
  const profile = await findProfileByUserId(user._id)

  profile.educations.unshift(req.body.education)
  profile.save()
  handleSuccess(res, profile.educations)
  } catch (err) {
  handleError(res, buildErrObject(422, err.message))
  }
}

exports.deleteEducation = async (req, res) => {
  try {
  const user = await findUserById(req.body._id)
  const profile = await findProfileByUserId(user._id)
  const educationId = req.params.educationId
  const temp = []
  for (i = 0; i < profile.educations.length; i++) {
    if (profile.educations[i] != null) {
      if (profile.educations[i]._id != educationId) {
        temp.push(profile.educations[i])
      }
    }
  }
  
  profile.educations = temp
  profile.save()
  handleSuccess(res, profile.educations)
  } catch (err) {
  handleError(res, buildErrObject(422, err.message))
  }
}
