const mongoose = require('mongoose')

const RequestSchema = new mongoose.Schema(
  {
    university: {
      type: String
    },
    module: {
      type: String
    },
    description: {
      type: String
    }
  }
)

module.exports = mongoose.model('Request', RequestSchema)
