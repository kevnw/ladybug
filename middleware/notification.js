const Notification = require('../models/Notification')

exports.createNotification = async (data, user, actor) => {
  try {
    var newNotif = new Notification({
      type: data.type,
      user: actor,
      action: data.action,
      date: new Date()
    })

    user.notifications.unshift(newNotif._id)

    user.save()
    newNotif.save()
    return user
  } catch (err) {
    return err
  }
}
