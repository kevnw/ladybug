const PostController = require('../controllers/post')
const express = require('express')
const router = express.Router()

/*
 * Retrieves all post
 */
router.get(
  '/',
  PostController.getPostList
);

/*
 * Retrieves specific post according to postId
 */
router.get(
  '/:postId',
  PostController.getPostInfo
)

/*
 * Create post route
 */
router.post('/', PostController.createPost)

/*
 * Update post route
 */
router.post('/:postId', PostController.updatePost)

/*
 * Delete post route
 */
router.delete('/:postId', PostController.deletePost)

module.exports = router
