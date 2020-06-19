const mongoose = require('mongoose')

const ProfileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    status: {
      type: String
    },
    skills: {
      type: String
    },
    bio: {
      type: String
    },
    social: {
      type: String
    },
    experience: [
      {
        title: {
          type: String
        },
        company: {
          type: String
        },
        startDate: {
          type: Date
        },
        endDate: {
          type: Date
        },
        current: {
          type: Boolean
        },
        description: {
          type: String
        }
      }
    ],
    education: [
      {
        school: {
          type: String
        },
        degree: {
          type: String
        },
        fieldOfStudy: {
          type: String
        },
        startDate: {
          type: Date
        },
        endDate: {
          type: Date
        },
        current: {
          type: Boolean
        },
        description: {
          type: String
        }
      }
    ]
  }
)

module.exports = mongoose.model('Profile', ProfileSchema)
