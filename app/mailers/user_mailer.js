const fs = require('fs')
const ejs = require('ejs')
const emailer = require('../middleware/emailer')
const emailTemplatesDir = __dirname + '/../../views/mailers'

/* Sends registration email */
exports.verifyRegistration = async response => {
  const user = response.user
  return new Promise((resolve, reject) => {
    const file = fs.readFileSync(
      emailTemplatesDir + '/verify_registration.ejs',
      'ascii'
    );

    var verificationUrl =
      'http://localhost:3000' +
      '/verify' +
      '/' + response.token

    const data = {
      from: 'Ladybug <ladybug.officials@gmail.com>',
      to: user.email,
      subject: 'Registration Confirmation',
      html: ejs.render(file, { user, verificationUrl })
    };

    emailer.sendMail(data, (err, info, response) => {
      if (err) reject(err);
      else resolve(info, response);
    });
  });
};

exports.forgotPassword = async response => {
  return new Promise ((resolve, reject) => {
    const file = fs.readFileSync(
      emailTemplatesDir + '/forgot_password.ejs',
      'ascii'
    );


  })
}