const express = require('express')
const router = express.Router()
const AuthController = require('../controllers/auth')

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

/*
 * Setup routes for index
 */
router.get('/', (req, res) => {
  res.render('index')
})

router.get(
  '/verify/:token',
  AuthController.verify
)

/*
 * Handle 404 error
 */
router.use('*', (req, res) => {
  res.status(404).json({
    errors: {
      msg: 'URL_NOT_FOUND'
    }
  })
})



module.exports = router
