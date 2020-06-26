const mongoose = require('mongoose')

const ProfileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    name: {
      type: String
    },
    avatar: {
      type: String
    },
    dateJoined: {
      type: Date
    },
    status: {
      type: String
    },
    skills: [String],
    bio: {
      type: String
    },
    social: {
      youtube: {
        type: String,
      },
      twitter: {
        type: String,
      },
      facebook: {
        type: String,
      },
      linkedin: {
        type: String,
      },
      instagram: {
        type: String,
      }, 
      website: {
        type: String
      }
    },
    experiences: [
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
    educations: [
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
