const UserController = require('../controllers/users')
const AuthController = require('../controllers/auth')
const ModuleController = require('../controllers/modules')
const PostController = require('../controllers/posts')
const express = require('express')
const router = express.Router()

/*
 * Get all modules
 */
router.get(
  '/',
  ModuleController.getModuleList
)

/*
 * Get particular module info
 */
router.get(
  '/:moduleId',
  ModuleController.getModuleInfo
)

/*
 * Create module route
 */
router.post(
  '/add',
  ModuleController.createModule
);

/*
 * Delete module route
 */
router.delete(
  '/delete',
  ModuleController.deleteModule
);

/*
 * Add post to array route
 */
router.put(
  '/posts/add/:moduleId',
  ModuleController.addPost
)

/*
 * Delete module from array route
 */
router.put(
  '/posts/delete/:moduleId',
  ModuleController.deletePost
)

/*
 * Get particular post info
 */
router.get(
  '/posts/:moduleId',
  ModuleController.getPostList
)

module.exports = router
