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

 /* Finds university by name  */
const findUniversityByName = async name => {
  return new Promise((resolve, reject) => {
    University.findOne({ acronym: name })
      .then(uni => {
        if (!uni) {
          reject(buildErrObject(422, 'University does not exist'));
        } else {
          resolve(uni); // returns mongoose object
        }
      })
      .catch(err => reject(buildErrObject(422, err.message)));
  });
};

 /********************
 * Public functions *
 ********************/

exports.getUniInfo = async (req, res) => {
  University.findOne({ acronym: req.params.uniName })
    .lean()
    .then(uni => {
      if (uni) handleSuccess(res, buildSuccObject(uni));
      else handleError(res, buildErrObject(422, 'University not found'));
    })
    .catch(err => handleError(res, buildErrObject(422, err.message)));
};

exports.getModuleList = async (req, res) => {
  try {
    const uni = await findUniversityByName(req.params.uniName)
    Module.find({ university: uni._id })
    .select('_id name title description posts followers')
    .sort({ name: 1 })
    .lean()
    .then(moduleList => {
      handleSuccess(res, buildSuccObject(moduleList))
    })
    .catch(err => handleError(res, buildErrObject(422, err.message)));

  } catch (err) {
    handleError(res, buildErrObject(422, err.message));
  } 
};

exports.createUni = async (req, res) => {
  var newUni = new University({
    name: req.body.name,
    acronym: req.body.acronym,
    overview: req.body.overview,
    website: req.body.website,
    logo: req.body.logo
  });

  newUni
    .save()
    .then(uni =>
      handleSuccess(res, buildSuccObject('New university created'))
    )
    .catch(error => handleError(res, buildErrObject(422, error.message)));
};

exports.deleteUni = async (req, res) => {
  University.deleteOne({ _id: req.body.uniId })
    .then(result => {
      if (result.n) handleSuccess(res, buildSuccObject('University deleted'));
      else handleError(res, buildErrObject(422, 'University not found'));
    })
    .catch(error => handleError(res, buildErrObject(422, error.message)));
};

exports.updateUni = async (req, res) => {
  University.updateOne({ _id: req.params.uniId }, req.body.university)
    .then(result => {
      if (result.n) {
        if (result.nModified)
          handleSuccess(res, buildSuccObject('University updated'));
        else handleError(res, buildErrObject(422, 'No changes made'));
      } else handleError(res, buildErrObject(422, 'University not found'));
    })
    .catch(error => handleError(res, buildErrObject(422, error.message)));
};

exports.addModule = async (req, res) => {
  try {
    const uni = await findUniversityByName(req.params.uniName)
    const moduleId = req.body.moduleId
    if (!uni) {
      handleError(res, buildErrObject(409, 'University not found'))
      return
    }

    if (uni.modules.indexOf(moduleId) === -1) {
      uni.modules.push(moduleId)
    } else {
      handleError(res, buildErrObject(422, 'Module already exists'))
      return
    }

    uni.save()
    handleSuccess(res, buildSuccObject('Module added to ' + uni.name))
  } catch (err) {
    handleError(res, buildErrObject(422, err.message));
  }
}

exports.deleteModule = async (req, res) => {
  try {
    const uni = await findUniversityByName(req.params.uniName)
    const moduleId = req.body.moduleId
    const uni_idx = uni.modules.indexOf(moduleId)
    if (uni_idx > -1) {
      const temp = []
      uni.modules.forEach(element => {
        if (element != moduleId) {
          temp.push(element)
        }
      })
      uni.modules = temp
    } else {
      handleError(res, buildErrObject(422, 'Module does not belong to ' + uni.name))
      return
    }

    uni.save()
    handleSuccess(res, buildSuccObject('Module removed from ' + uni.name))
  } catch (err) {
    handleError(res, buildErrObject(422, err.message))
  }
}
