const User = require('../models/User')
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

exports.createModule = async (req, res) => {
  var newModule = new Module({
    name: req.body.module.name,
    description: req.body.module.description
  });

  newModule
    .save()
    .then(mod =>
      handleSuccess(res, buildSuccObject('New module created'))
    )
    .catch(error => handleError(res, buildErrObject(422, error.message)));
};

exports.getModuleList = async (req, res) => {
  Module.find()
    .select('_id name description posts followers')
    .lean()
    .then(moduleList => handleSuccess(res, buildSuccObject(moduleList)))
    .catch(err => handleError(res, buildErrObject(422, err.message)));
};

exports.deleteModule = async (req, res) => {
  Module.deleteOne({ _id: req.params.moduleId })
    .then(result => {
      if (result.n) handleSuccess(res, buildSuccObject('Module deleted'));
      else handleError(res, buildErrObject(422, 'Module not found'));
    })
    .catch(error => handleError(res, buildErrObject(422, error.message)));
};

exports.getModuleInfo = async (req, res) => {
  Module.findOne({ _id: req.params.moduleId })
    .select('_id name description posts followers')
    .lean()
    .then(mod => {
      if (mod) handleSuccess(res, buildSuccObject(mod));
      else handleError(res, buildErrObject(422, 'Module not found'));
    })
    .catch(err => handleError(res, buildErrObject(422, err.message)));
};
