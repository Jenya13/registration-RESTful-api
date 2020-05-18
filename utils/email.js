const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  const trasporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: 'Jenya Brodsky <somemail@mail.com>',
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  await trasporter.sendMail(mailOptions);
};

module.exports = sendEmail;
