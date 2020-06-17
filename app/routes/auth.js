const AuthController = require('../controllers/auth')
const express = require('express')
const router = express.Router()

/*
 * Register route
 */
router.post('/register', AuthController.register)

module.exports = router
