const PostController = require('../controllers/post')
const express = require('express')
const Post = require('../models/Post')
const router = express.Router()

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
router.post('/:postId', PostController.deletePost)

module.exports = router
