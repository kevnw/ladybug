const PostController = require('../controllers/posts')
const AuthController = require('../controllers/auth')

const express = require('express')
const router = express.Router()

/*
 * Create post route
 */
router.get('/', PostController.getPostList)

/*
 * Create post route
 */
router.post('/add', 
AuthController.verifyToken,
PostController.createPost
)

/*
 * Update post route
 */
router.post('/edit/:postId', PostController.updatePost)

/*
 * Delete post route
 */
router.delete('/delete/:postId', PostController.deletePost)

/*
 * Upvote post route
 */
router.put('/upvote/:postId',
AuthController.verifyToken, 
PostController.upvote
)

/*
 * Downvote post route
 */
router.put('/downvote/:postId', 
AuthController.verifyToken,
PostController.downvote
)

module.exports = router
