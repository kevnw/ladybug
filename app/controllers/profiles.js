const User = require('../models/User')
const Post = require('../models/Post')
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

 /* Finds all post written by that user */
 const findAllPost = async () => {
   return new Promise((resolve, reject) => {
    Post.find()
    .select('_id text title author avatar comments')
    .lean()
    .then(postList => handleSuccess(res, buildSuccObject(postList)))
    .catch(err => handleError(res, buildErrObject(422, err.message)));
   })
 }

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

 exports.editName = async (req, res) => {
   try {
    const userId = req.body._id
    const newName = req.body.name
    const user = await findUserById(userId)
    const profile = await findProfileByUserId(userId)
    const postList = await findAllPost()

    for (i = 0; i < postList.length; i++) {
      if (postList[i].author == userId) {
        postList[i].name = newName
      }
      for (j = 0; j < postList[i].comments.length; j++) {
        if (postList[i].comments[j].author == userId) {
          postList[i].comments[j].authorName = newName
        }
      }
      postList[i].save()
    }

    user.name = newName
    profile.name = newName
    profile.save()
    user.save()

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
