const fs = require('fs')
const ejs = require('ejs')
const emailer = require('../middleware/emailer')
const emailTemplatesDir = __dirname + '/../views/mailers'

/* Sends registration email */
exports.verifyRegistration = async response => {
  const user = response.user
  return new Promise((resolve, reject) => {
    const file = fs.readFileSync(
      emailTemplatesDir + '/verify_registration.ejs',
      'ascii'
    );

    const domain = process.env.NODE_ENV == "production" ? 'https://ask-ladybug.herokuapp.com' : 'http://localhost:3000'
    var verificationUrl =
      domain +
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
  const user = response.user
  return new Promise ((resolve, reject) => {
    const file = fs.readFileSync(
      emailTemplatesDir + '/forgot_password.ejs',
      'ascii'
    );

    var forgotPasswordUrl = 
      'http://localhost:3000' +
      '/forgot' +
      '/' + response.token

    const data = {
      from: 'Ladybug <ladybug.officials@gmail.com>',
      to: user.email,
      subject: 'Forgot Password Request',
      html: ejs.render(file, { user, forgotPasswordUrl })
    }

    emailer.sendMail(data, (err, info, response) => {
      if (err) reject(err);
      else resolve(info, response);
    });
  })
}
