const crypto = require('crypto')
const secret = process.env.JWT_SECRET
const algorithm = 'aes-192-cbc'
const key = crypto.scryptSync(secret, 'salt', 24)
const iv = Buffer.alloc(16, 0)
const jwt = require('jsonwebtoken')

const {
  handleError,
  handleSuccess,
  buildErrObject,
  buildSuccObject,
  itemNotFound
} = require('./utils')

module.exports = {
  /**
   * Checks is password matches
   * @param {string} password - password
   * @param {Object} user - user object
   * @returns {boolean}
   */
  async checkPassword(password, user) {
    return new Promise((resolve, reject) => {
      user.comparePassword(password, (err, isMatch) => {
        if (err) {
          reject(this.buildErrObject(422, err.message))
        }
        if (!isMatch) {
          resolve(false)
        }
        resolve(true)
      })
    })
  },

  /**
   * Encrypts text
   * @param {string} text - text to encrypt
   */

  encrypt(text) {
    const cipher = crypto.createCipheriv(algorithm, key, iv)

    let encrypted = cipher.update(text, 'utf8', 'hex')
    encrypted += cipher.final('hex')

    return encrypted
  },

  /**
   * Decrypts text
   * @param {string} text - text to decrypt
   */

  decrypt(text) {
    const decipher = crypto.createDecipheriv(algorithm, key, iv)

    try {
      let decrypted = decipher.update(text, 'hex', 'utf8')
      decrypted += decipher.final('utf8')
      return decrypted
    } catch (err) {
      return err
    }
  },

  async findUserIdFromToken(token) {
    return new Promise((resolve, reject) => {
      // Decrypts, verifies and decode token
      jwt.verify(decrypt(token), process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
          reject(buildErrObject(409, 'BAD_TOKEN'))
        }
        resolve(decoded.data._id)
      })
    })
  }
}
