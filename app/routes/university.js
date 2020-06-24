const UniversityController = require('../controllers/universities')
const express = require('express')
const router = express.Router()

/*
 * Get particular university info
 */
router.get(
  '/:uniName',
  UniversityController.getUniInfo
)

/*
 * Creates a university
 */
router.post(
  '/add',
  UniversityController.createUni
)

/*
 * Deletes a university
 */
router.delete(
  '/delete',
  UniversityController.deleteUni
)

/*
 * Retrieves all modules in that university
 */
router.get(
  '/modules/:uniName',
  UniversityController.getModuleList
);

/*
 * Add module to array route
 */
router.put(
  '/modules/add/:uniName',
  UniversityController.addModule
)

/*
 * Delete module from array route
 */
router.put(
  '/modules/delete/:uniName',
  UniversityController.deleteModule
)

module.exports = router