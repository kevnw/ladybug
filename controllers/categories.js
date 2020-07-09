const University = require('../models/University')
const Module = require('../models/Module')

const {
  handleError,
  handleSuccess,
  buildErrObject,
  buildSuccObject
} = require('../middleware/utils');

/*********************
 * Private functions *
 *********************/

/********************
 * Public functions *
 ********************/

exports.getUniversityList = async (req, res) => {
  University.find()
    .select('name modules acronym').sort({name: 1})
    .lean()
    .then(universityList => handleSuccess(res, buildSuccObject(universityList)))
    .catch(err => handleError(res, buildErrObject(422, err.message)));
};

exports.createUniAndModule = async (req, res) => {
  try {
    var newUni = new University({
      name: req.body.university.name,
      acronym: req.body.university.acronym,
      overview: req.body.university.overview,
      website: req.body.university.website,
      logo: req.body.university.logo,
    });

    var newModule = new Module({
      name: req.body.module.name,
      title: req.body.module.title,
      description: req.body.module.description,
      university: newUni._id,
      nOfFollowers: 0
    });
    
    newModule.uniAcronym = newUni.acronym
    newUni.modules.push(newModule._id)
    newUni.save()
    newModule.save()
    handleSuccess(res, buildSuccObject('University and Module created'))
  } catch (err) {
    handleError(res, buildErrObject(422, err.message));
  }
}
