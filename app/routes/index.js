const express = require('express')
const router = express.Router()
const AuthController = require('../controllers/auth')
/*
 * Setup routes for index
 */
router.get('/', (req, res) => {
  res.render('index')
})

router.post('/register', AuthController.register)
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
