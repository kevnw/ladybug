const PostController = require('../controllers/post')
const express = require('express')
const Post = require('../models/Post')
const router = express.Router()

router.get(
  '/',
  PostController.getPostList
);

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
