const crypto = require('crypto')
const secret = process.env.JWT_SECRET
const algorithm = 'aes-192-cbc'
const key = crypto.scryptSync(secret, 'salt', 24)
const iv = Buffer.alloc(16, 0)
const jwt = require('jsonwebtoken')
const User = require('../models/User')

const {
  handleError,
  handleSuccess,
  buildErrObject,
  buildSuccObject,
  itemNotFound
} = require('./utils')

/**
 * Checks is password matches
 * @param {string} password - password
 * @param {Object} user - user object
 * @returns {boolean}
 */
exports.checkPassword = async (password, user) => {
  return new Promise((resolve, reject) => {
    user.comparePassword(password, (err, isMatch) => {
      if (err) {
        reject(buildErrObject(422, err.message))
      }
      if (!isMatch) {
        resolve(false)
      }
      resolve(true)
    })
  })
}

/**
 * Encrypts text
 * @param {string} text - text to encrypt
 */

exports.encrypt = (text) => {
  const cipher = crypto.createCipheriv(algorithm, key, iv)

  let encrypted = cipher.update(text, 'utf8', 'hex')
  encrypted += cipher.final('hex')

  return encrypted
}

/**
 * Decrypts text
 * @param {string} text - text to decrypt
 */

exports.decrypt = (text) => {
  const decipher = crypto.createDecipheriv(algorithm, key, iv)

  try {
    let decrypted = decipher.update(text, 'hex', 'utf8')
    decrypted += decipher.final('utf8')
    return decrypted
  } catch (err) {
    return err
  }
}

/* 
  Verify user role(s). 
  `requireAuth` must precede this function.
*/
exports.roleAuthorization = roles => async (req, res, next) => {
  User.findById(req.body._id)
    .select('role')
    .lean()
    .then(user => {
      if (!user) {
        handleError(res, buildErrObject(401, 'Unauthenticated'));
      } else if (roles.indexOf(user.role) < 0) {
        handleError(res, buildErrObject(403, 'Unauthorized'));
      } else {
        return next();
      }
    })
    .catch(err => handleError(res, buildErrObject(403, 'Unauthorized')));
};
