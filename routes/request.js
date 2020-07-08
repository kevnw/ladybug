const RequestController = require('../controllers/requests')
const AuthController = require('../controllers/auth')
const express = require('express')
const router = express.Router()

/*
 * Create request route
 */
router.post(
'/add',
AuthController.verifyToken,
RequestController.createRequest
);

/*
 * Cancel request route
 */
router.put(
'/cancel/:requestId',
AuthController.verifyToken,
RequestController.cancelRequest
)

/*
 * Delete request route
 */
router.delete(
'/delete/:requestId',
RequestController.deleteRequest
);

module.exports = router
