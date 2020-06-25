const AuthController = require('../controllers/auth')
const UserController = require('../controllers/users')
const ProfileController = require('../controllers/profiles')
const express = require('express')
const router = express.Router()

router.get('/', 
AuthController.getUserFromToken
)

router.get('/posts/:userId', 
UserController.getAllPostFromUser
)

router.get('/modules', 
AuthController.verifyToken,
UserController.getFollowedModulesFromUni
)

/*
 * Register route
 */
router.post('/register', AuthController.register)

/*
 * Login route
 */
router.post('/login', AuthController.login)

/*
 * Follow module route
 */
router.put(
  '/follow/:moduleId',
  AuthController.verifyToken,
  UserController.followModule
)


/*
 * Unfollow module route
 */
router.put(
  '/unfollow/:moduleId',
  AuthController.verifyToken,
  UserController.unfollowModule
)

/*
 * Edit profile route
 */
router.post(
  '/profile',
  AuthController.verifyToken,
  ProfileController.editProfile
)

/*
 * Get profile route
 */
router.get(
  '/profile/:userId',
  ProfileController.getProfileInfo
)

module.exports = router
