const University = require('../models/University')

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
    .select('name modules acronym')
    .lean()
    .then(universityList => handleSuccess(res, buildSuccObject(universityList)))
    .catch(err => handleError(res, buildErrObject(422, err.message)));
};


