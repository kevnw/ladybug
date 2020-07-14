const cloudinary = require('cloudinary')

// Configure cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: '',
  api_secret: ''
})

module.exports = { cloudinary }
