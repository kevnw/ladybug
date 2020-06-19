const mongoose = require('mongoose')

const UniversitySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    acronym: {
      type: String
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

UniversitySchema.methods.addModule = (module) => {
  this.modules.push(module)
  
  return this.save()
}

module.exports = mongoose.model('University', UniversitySchema)
