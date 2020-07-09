const CategoriesController = require('../controllers/categories')
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
  CategoriesController.createUniAndModule
)

module.exports = router
