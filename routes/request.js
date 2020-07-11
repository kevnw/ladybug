const RequestController = require('../controllers/requests')
const AuthController = require('../controllers/auth')
const auth = require('../middleware/auth')
const express = require('express')
const router = express.Router()

/*
 * Get all request route
 */
router.get('/', RequestController.getAllRequest)

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
AuthController.verifyToken,
auth.roleAuthorization(['admin', 'superadmin']),
RequestController.deleteRequest
);

module.exports = router
