const fs = require('fs')
const ejs = require('ejs')
const querystring = require('querystring');

const emailer = require('../middleware/emailer')
console.log(__dirname)
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
      'http://localhost:5000' +
      '/verify' +
      '/' + response.token
      // querystring.stringify({
        // email: user.email
      // });

    const data = {
      from: 'Ladybug <ladybug.officials@gmail.com>',
      to: user.email,
      subject: 'Registration Confirmation',
      html: ejs.render(file, { user, verificationUrl })
    };
    console.log("verificationUrl = " +verificationUrl)

    emailer.sendMail(data, (err, info, response) => {
      if (err) reject(err);
      else resolve(info, response);
    });
  });
};