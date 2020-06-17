const jwt = require('jsonwebtoken')
const User = require('../models/User')
const auth = require('../middleware/auth')
const uuid = require('uuid')
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
 * Generates a token
 * @param {Object} user - user object
 */
const generateToken = (user) => {
  // Gets expiration time
  const expiration =
    Math.floor(Date.now() / 1000) + 60 * process.env.JWT_EXPIRATION_IN_MINUTES

  // returns signed and encrypted token
  return auth.encrypt(
    jwt.sign(
      {
        data: {
          _id: user
        },
        exp: expiration
      },
      process.env.JWT_SECRET
    )
  )
}

/**
 * Creates an object with user info
 * @param {Object} req - request object
 */
const setUserInfo = (req) => {
  let user = {
    _id: req.body._id,
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
    verified: req.body.verified
  }
  // Adds verification for testing purposes
  if (process.env.NODE_ENV !== 'production') {
    user = {
      ...user,
      verification: req.body.verification
    }
  }
  return user
}

/**
 * Saves login attempts to dabatabse
 * @param {Object} user - user object
 */
const saveLoginAttemptsToDB = async (user) => {
  return new Promise((resolve, reject) => {
    user.save((err, result) => {
      if (err) {
        reject(buildErrObject(422, err.message))
      }
      if (result) {
        resolve(true)
      }
    })
  })
}

/**
 * Registers a new user in database
 * @param {Object} req - request object
 */
const registerUser = async (req) => {
  return new Promise((resolve, reject) => {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      verification: uuid.v4()
    }); 

    console.log("didalam register user, user = " + user)
    user.save((err, item) => {
      console.log("error = " + err)
      console.log(item)
      if (err) reject(buildErrObject(422, err.message))
      resolve(item)
    });
  });
};

/* Checks User model if user with a specific email exists */
const isEmailRegistered = async email => {
  return new Promise((resolve, reject) => {
    User.findOne({ email }, (err, item) => {
      if (err) reject(buildErrObject(422, err.message));
      if (item) resolve(true);
      else resolve(false);
    });
  });
}

/* Builds the registration token
* @param {Object} item - user object that contains created id
* @param {Object} userInfo - user object
*/
const returnRegisterToken = (item, userInfo) => {
 if (process.env.NODE_ENV !== 'production') {
   userInfo.verification = item.verification
 }
 const data = {
   token: generateToken(item._id),
   user: userInfo
 }
 return data
}

/********************
 * Public functions *
 ********************/
/**
 * Register function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
exports.register = async (req, res) => {
  try {
    console.log("incoming email = " + req.body.email)
    // if (await isEmailRegistered(req.body.email)) {
      // handleError(res, buildErrObject(409, 'Email is already registered'));
      // return;
    // }
    // console.log("lewat isEmailRegistered")
    const user = await registerUser(req)
    console.log("checkpoint 1")
    const userInfo = setUserInfo(item)
    const response = returnRegisterToken(user, userInfo)
    res.status(201).json(response)
  } catch (error) {
    handleError(res, error)
  }
}