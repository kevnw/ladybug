const fs = require('fs')
const ejs = require('ejs')
const querystring = require('querystring');

const emailer = require('../middleware/emailer')
console.log(__dirname)
const emailTemplatesDir = __dirname + '/../../views/mailers'

/* Sends registration email */
exports.verifyRegistration = async user => {
  return new Promise((resolve, reject) => {
    const file = fs.readFileSync(
      emailTemplatesDir + '/verify_registration.ejs',
      'ascii'
    );

    console.log(user)

    var verificationUrl =
      'http://localhost:3001' +
      '/verify' +
      '?' +
      querystring.stringify({
        id: user._id
      });

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