const User = require('../models/User')
const Post = require('../models/Post')
const Profile = require('../models/Profile')
const avatar = require('../middleware/avatar')
const { cloudinary } = require('../config/cloudinary')

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
    .then(postList => resolve(postList))
    .catch(err => reject(buildErrObject(422, err.message)));
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
    const newProfile = req.body.profile
    let splittedSkills = []
    if (newProfile.skills) {
      splittedSkills = newProfile.skills.split(",").map(item => item.trim())
      newProfile.skills = splittedSkills
    }

    newProfile.skills = splittedSkills
    const profile = await Profile.findOneAndUpdate({
      user: req.body._id
    }, 
    newProfile, 
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
      const temp = postList[i]
      if (temp.author == userId) {
        temp.name = newName
      }
      for (j = 0; j < postList[i].comments.length; j++) {
        if (temp.comments[j].author == userId) {
          temp.comments[j].authorName = newName
        }
      }
      temp.save()
    }

    user.name = newName
    user.avatar = avatar.generateAvatarUrl(newName)
    profile.name = newName
    profile.save()
    user.save()

    handleSuccess(res, profile)
   } catch (err) {
    handleError(res, buildErrObject(422, err.message))
   } 
 }

 exports.getProfile = async (req, res) => {
   try {
    const profile = await findProfileByUserId(req.body._id)
    
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
    handleSuccess(res, profile)
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
    handleSuccess(res, profile)
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
  handleSuccess(res, profile)
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
  handleSuccess(res, profile)
  } catch (err) {
  handleError(res, buildErrObject(422, err.message))
  }
}

exports.createProfile = async (req, res) => {
  try {
    const credentials = await findUserById(req.body._id)
    const profile = new Profile({
      user: credentials._id,
      name: credentials.name,
      avatar: credentials.avatar,
      dateJoined: Date.now()
    })

    profile.save((err, item) => {
      if (err) handleError(res, buildErrObject(422, err.message))
      handleSuccess(res, item)
    })
  } catch (err) {
    handleError(res, buildErrObject(422, err.message))
  }
}

exports.uploadProfilePicture = async (req, res) => {
  try {
    const fileStr = req.body.data
    const user = await findUserById(req.body._id)
    const profile = await findProfileByUserId(user._id)
    const uploadedResponse = await cloudinary.uploader.
    upload(fileStr, {
      upload_preset: 'profile_picture'
    })

    const pictureUrl = uploadedResponse.secure_url
    user.avatar = pictureUrl
    profile.avatar = pictureUrl
    user.save()
    profile.save()
    handleSuccess(res, "Profile picture successfully changed")
  } catch (err) {
    handleError(res, buildErrObject(422, err.message))
  }
}
