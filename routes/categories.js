const CategoriesController = require('../controllers/categories')
const UniversityController = require('../controllers/universities')
const express = require('express')
const router = express.Router()

/*
 * Retrieves all universities
 */
router.get(
  '/',
  CategoriesController.getUniversityList
);

// router.use(
  // '/:uniName/modules', require('./university')
// )

module.exports = router
