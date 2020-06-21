const AuthController = require('../controllers/auth')
const UserController = require('../controllers/users')
const express = require('express')
const router = express.Router()

router.get('/', AuthController.getUserFromToken)

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

module.exports = router
