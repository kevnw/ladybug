const ProfileController = require('../controllers/profiles')
const AuthController = require('../controllers/auth')
const express = require('express')
const router = express.Router()

/*
 * Edit profile route
 */
router.post(
  '/',
  AuthController.verifyToken,
  ProfileController.editProfile
)

/*
 * Create profile route
 */
router.post(
  '/create',
  AuthController.verifyToken,
  ProfileController.createProfile
)

/*
 * Get profile route
 */
router.get(
  '/',
  AuthController.verifyToken,
  ProfileController.getProfile
)

/*
 * Get profile by user ID route
 */
router.get(
  '/:userId',
  ProfileController.getProfileInfo
)

/*
 * Add experience to array route
 */
router.put(
  '/experience/add',
  AuthController.verifyToken,
  ProfileController.addExperience
)

/*
 * Delete experience from array route
 */
router.delete(
  '/experience/delete/:experienceId',
  AuthController.verifyToken,
  ProfileController.deleteExperience
)

/*
 * Add education to array route
 */
router.put(
  '/education/add',
  AuthController.verifyToken,
  ProfileController.addEducation
)

/*
 * Delete education from array route
 */
router.delete(
  '/education/delete/:educationId',
  AuthController.verifyToken,
  ProfileController.deleteEducation
)

/*
 * Change profile picture route
 */
router.post(
  '/picture',
  AuthController.verifyToken,
  ProfileController.uploadProfilePicture
)

module.exports = router
