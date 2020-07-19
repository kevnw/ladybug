const NotificationController = require('../controllers/notifications')
const AuthController = require('../controllers/auth')
const auth = require('../middleware/auth')
const express = require('express')
const router = express.Router()

/*
 * Create notification route
 */
router.post(
  '/add',
  AuthController.verifyToken,
  auth.roleAuthorization(['admin', 'superadmin']),
  NotificationController.createNotification
);

router.get(
  '/',
  AuthController.verifyToken,
  NotificationController.getNotificationList
)

/*
 * Delete notification route
 */
router.delete('/delete/:notifId',
AuthController.verifyToken,
NotificationController.deleteNotification
)

/*
 * Mark notification read route
 */
router.post(
  '/mark-read/:notifId',
  AuthController.verifyToken,
  NotificationController.setNotificationRead
)

module.exports = router
