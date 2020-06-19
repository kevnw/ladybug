const express = require('express')
const router = express.Router()

// Load Auth route
router.use('/users', require('./auth'))

// Load Post route
router.use('/posts', require('./post'));
/*
 * Setup routes for index
 */
router.get('/', (req, res) => {
  res.render('index')
})

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
