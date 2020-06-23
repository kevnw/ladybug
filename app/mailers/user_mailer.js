const fs = require('fs')
const ejs = require('ejs')

const emailer = require('../middleware/emailer')
const emailTemplatesDir = __dirname + '/../../views/mailers'

/* Sends registration email */
exports.verifyRegistration = async user => {
  return new Promise((resolve, reject) => {
    const file = fs.readFileSync(
      emailTemplatesDir + 'verify_registration.ejs',
      'ascii'
    );

    var verificationUrl =
      config.get('host.frontend') +
      '/verify' +
      '?' +
      querystring.stringify({
        email: user.email,
        id: user.id
      });

    const data = {
      from: 'PINUS Visit <no-reply@pi-nus.org>',
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