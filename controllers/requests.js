const Request = require('../models/Request')
const {
  handleError,
  handleSuccess,
  buildErrObject,
  buildSuccObject
} = require('../middleware/utils');

/*********************
 * Private functions *
 *********************/

 /* Finds request by id*/
const findRequestById = async (id) => {
  return new Promise((resolve, reject) => {
    Request.findOne({ _id: id })
      .select('_id university module')
      .then(request => {
        if (!request) {
          reject(buildErrObject(422, 'Request does not exist'));
        } else {
          resolve(request); // returns mongoose object
        }
      })
      .catch(err => reject(buildErrObject(422, err.message)));
  });
};

/* Finds request by university and module*/
const findRequestByUniAndMod = async (uni, mod) => {
  return new Promise((resolve, reject) => {
    Request.findOne({ university: uni, module: mod })
      .select('_id university module counter')
      .then(request => {
        resolve(request)
      })
      .catch(err => reject(buildErrObject(422, err.message)));
  });
};

/* Deletes request from database */
const deleteRequestFromDb = async (id) => {
  return new Promise((resolve, reject) => {
    Request.deleteOne({ _id: id })
    .then(result => {
      if (result.n) resolve(buildSuccObject('Request deleted'));
      else reject(buildErrObject(422, 'Request not found'));
    })
    .catch(error => handleError(res, buildErrObject(422, error.message)));
  })
}

/********************
 * Public functions *
 ********************/

exports.createRequest = async (req, res) => {
   try {
    const uni = req.body.university
    const mod = req.body.module
    const existingRequest = await findRequestByUniAndMod(uni, mod)
    if (existingRequest) {
      existingRequest.counter++
      existingRequest.save()
      handleSuccess(res, buildSuccObject(existingRequest))
      return
    } else {
      var newRequest = new Request({
        university: uni,
        module: mod,
        counter: 0
      })
      
      newRequest
      .save()
      .then(request =>
        handleSuccess(res, buildSuccObject(request))
      )
      .catch(error => handleError(res, buildErrObject(422, error.message)));
    }
  } catch (err) {
    handleError(res, buildErrObject(422, err.message));
  }
}

exports.deleteRequest = async (req, res) => {
  try {
    const requestId = req.params.requestId
    await deleteRequestFromDb(requestId)

    handleSuccess(res, buildSuccObject("Request deleted!"))
  } catch (err) {
    handleError(res, buildErrObject(422, err.message));
  }
}
