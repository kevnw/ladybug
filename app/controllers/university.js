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

 /* Finds university by name  */
const findUniversityByName = async name => {
  return new Promise((resolve, reject) => {
    University.findOne({ name })
      .select('name modules')
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

exports.createUni = async (req, res) => {
  var newUni = new University({
    name: req.body.name
  });

  newUni
    .save()
    .then(uni =>
      handleSuccess(res, buildSuccObject('New university created'))
    )
    .catch(error => handleError(res, buildErrObject(422, error.message)));
};

exports.addModule = async (req, res) => {
  try {
    const uni = await findUniversityByName(req.body.name)
    if (!uni) {
      handleError(res, buildErrObject(409, 'University not found'))
      return
    }

    uni.addModule(req.body.moduleId)
    handleSuccess(res, buildSuccObject('Module added to University' + uni.name))
  } catch (err) {
    handleError(res, buildErrObject(422, err.message));
  }
}

// exports.getAllModule = async (req, res) => {
  // const uni = await findUniversityByName(req.body.name)
// 
// }