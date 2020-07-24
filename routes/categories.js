const CategoriesController = require('../controllers/categories')
const AuthController = require('../controllers/auth')
const auth = require('../middleware/auth')
const express = require('express')
const router = express.Router()

/*
 * Retrieves all universities
 */
router.get(
  '/',
  CategoriesController.getUniversityList
);

/*
 * Create new university and module
 */
router.post(
  '/create',
  AuthController.verifyToken,
  auth.roleAuthorization(['admin', 'superadmin']),
  CategoriesController.createUniAndModule
)

module.exports = router
