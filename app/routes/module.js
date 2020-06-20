const UserController = require('../controllers/user')
const AuthController = require('../controllers/auth')
const ModuleController = require('../controllers/module')
const express = require('express')
const Module = require('../models/Module')
const router = express.Router()

/*
 * Retrieves all modules
 */
router.get(
  '/',
  ModuleController.getModuleList
);

/*
 * Retrieves specific post according to postId
 */
router.get(
  '/:moduleId',
  ModuleController.getModuleInfo
)

/*
 * Create module route
 */
router.post('/', ModuleController.createModule)

/*
 * Delete post route
 */
router.delete('/:moduleId', ModuleController.deleteModule)

router.put(
  '/:moduleName',
  AuthController.verifyToken,
  UserController.followModule
)

module.exports = router
