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
 * Get profile route
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

module.exports = router
