const UserController = require('../controllers/users')
const AuthController = require('../controllers/auth')
const express = require('express')
const router = express.Router()

/*
 * Get user contributions
 */
router.get(
  '/',
  AuthController.verifyToken,
  UserController.getContributions
);

/*
 * Get user contributions by Id
 */
router.get(
  '/:userId',
  AuthController.verifyToken,
  UserController.getContributionsById
);

module.exports = router
