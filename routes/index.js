const express = require('express')
const router = express.Router()

// Load Auth route
router.use('/users', require('./user'))

// Load Categories route
router.use('/categories', require('./categories'))

// Load University route
router.use('/universities', require('./university'));

// Load Module route
router.use('/modules', require('./module'));

// Load Post route
router.use('/posts', require('./post'));

// Load Profile route
router.use('/profiles', require('./profile'))

// Load Request route
router.use('/requests', require('./request'))

module.exports = router
