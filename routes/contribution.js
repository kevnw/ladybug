const UserController = require('../controllers/users')
const AuthController = require('../controllers/auth')
const express = require('express')
const router = express.Router()

/*
 * Retrieves all universities
 */
router.get(
  '/',
  AuthController.verifyToken,
  UserController.getContributions
);

module.exports = router
