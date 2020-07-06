const mongoose = require('mongoose')

const RequestSchema = new mongoose.Schema(
  {
    university: {
      type: String,
      required: true
    },
    module: {
      type: String,
      required: true
    },
    description: {
      type: String
    }
  }
)

module.exports = mongoose.model('Request', RequestSchema)
