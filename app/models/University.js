const mongoose = require('mongoose')

const UniversitySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true
    },
    acronym: {
      type: String,
      required: true
    },
    logo: String,
    modules: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Module'
      }
    ]
  }
)

module.exports = mongoose.model('University', UniversitySchema)
