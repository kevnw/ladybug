const User = require('../models/User')
const Notification = require('../models/Notification')

const {
  handleError,
  handleSuccess,
  buildErrObject,
  buildSuccObject
} = require('../middleware/utils');

/*********************
 * Private functions *
 *********************/

 /**
 * Finds notification by ID
 * @param {string} id - universitiy's id
 */
const findNotificationById = async (notifId) => {
  return new Promise((resolve, reject) => {
    Notification.findOne({ _id: notifId })
      .select('_id title type user read action')
      .then(notif => {
        if (!notif) {
          reject(buildErrObject(422, 'Notification does not exist'));
        } else {
          resolve(notif); // returns mongoose object
        }
      })
      .catch(err => reject(buildErrObject(422, err.message)));
  })
}

/* Finds user by id  */
const findUserById = async id => {
  return new Promise((resolve, reject) => {
    User.findOne({ _id: id })
      .select('name email role verified _id following avatar notifications')
      .then(user => {
        if (!user) {
          reject(buildErrObject(422, 'User does not exist'));
        } else {
          resolve(user); // returns mongoose object
        }
      })
      .catch(err => reject(buildErrObject(422, err.message)));
  });
};

/* Deletes notification from database */
const deleteNotifFromDb = async (id) => {
  return new Promise((resolve, reject) => {
    Notification.deleteOne({ _id: id })
      .then((result) => {
        if (result.n) resolve(buildSuccObject('Notification deleted'));
        else reject(buildErrObject(422, 'Notification not found'));
      })
      .catch((error) => handleError(res, buildErrObject(422, error.message)));
  });
};

/********************
 * Public functions *
 ********************/

exports.deleteNotification = async (req, res) => {
  try {
    const notifId = req.params.notifId
    await deleteNotifFromDb(notifId)
    const user = await findUserById(req.body._id)

    const temp = []
    for (const element of user.notifications) {
      if (element != notifId) {
        temp.push(element)
      }
    }

    user.notifications = temp
    user.save()
    handleSuccess(res, buildSuccObject(user.notifications))
  } catch (err) {
    handleError(res, buildErrObject(422, err.message))
  }
}

exports.setNotificationRead = async (req, res) => {
  try {
    const notif = await findNotificationById(req.params.notifId)

    notif.read = true
    notif.save()

    handleSuccess(res, buildSuccObject(notif))
  } catch (err) {
    handleError(res, buildErrObject(422, err.message))
  }
}

exports.getNotificationList = async (req, res) => {
  try {
    const user = await findUserById(req.body._id)
    const temp = []
    for (const element of user.notifications) {
      const notif = await findNotificationById(element)
      temp.push(notif)
    }

    handleSuccess(res, buildSuccObject(temp))
  } catch (err) {
    handleError(res, buildErrObject(422, err.message))
  }
}
