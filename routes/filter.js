const PostController = require('../controllers/posts')
const AuthController = require('../controllers/auth')
const express = require('express')
const router = express.Router()

/*
 * Get most liked posts
 */
router.get(
  '/most-liked/:moduleId',
  PostController.mostLiked
)

/*
 * Get most recent posts
 */
router.get(
  '/most-recent/:moduleId',
  PostController.mostRecent
)

/*
 * Get most discussed posts
 */
router.get(
  '/most-discussed/:moduleId',
  PostController.mostDiscussed
)

module.exports = router
