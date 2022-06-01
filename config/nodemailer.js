const nodemailer = require('nodemailer');
const path = require('path');
const ejs = require('ejs');
const env = require('./environment');

let testAccount = nodemailer.createTestAccount();

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport(env.smtp);

let renderTemplate = (data, relativePath) => {
  let mailHtml;
  ejs.renderFile(
    path.join(__dirname, '../views/mailers', relativePath),
    data,
    function (err, template) {
      if (err) {
        console.log('error in rendering mail template', err);
        return;
      }
      mailHtml = template;
    }
  );
  return mailHtml;
};

module.exports = {
  transporter: transporter,
  renderTemplate: renderTemplate,
};
