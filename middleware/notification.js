const Notification = require('../models/Notification')

exports.createNotification = async (data, user) => {
  try {
    var newNotif = new Notification({
      type: data.type,
      user: user._id,
      action: data.action,
      date: new Date()
    })

    user.notifications.push(newNotif._id)

    user.save()
    newNotif.save()
    return user
  } catch (err) {
    return err
  }
}
