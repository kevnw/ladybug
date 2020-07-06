const PostController = require('../controllers/posts')
const AuthController = require('../controllers/auth')

const express = require('express')
const router = express.Router()

/*
 * Get all post route
 */
router.get('/', PostController.getPostList)

/*
 * Get post recommendations
 */
router.get(
  '/recommendations',
  PostController.givePostRecommendations
)

/*
 * Get particular module info
 */
router.get(
  '/:postId',
  PostController.getPostInfo
)

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
router.post('/edit/:postId', 
AuthController.verifyToken,
PostController.updatePost
)

/*
 * Delete post route
 */
router.delete('/delete/:postId',
AuthController.verifyUserIdentityForPost,
AuthController.verifyToken,
PostController.deletePost
)

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

/*
 * Comment post route
 */
router.put('/comment/:postId', 
AuthController.verifyToken,
PostController.comment
)


/*
 * Delete comment post route
 */
router.delete('/:postId/:commentId', 
AuthController.verifyUserIdentityForComment,
AuthController.verifyToken,
PostController.deleteComment
)

module.exports = router
