const nodemailer = require("nodemailer");

// PROBLEM HERE

const sendEmail = async (options) => {
  // 1. Create a transporter
  const transporter = nodemailer.createTransport({
    // service: "Gmail",
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    logger: true,
    secure: false,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
    // Activate in gmail "less secure app" option
  });
  // 2. Define email options
  const mailOptions = {
    from: "Oskar Ziembrowicz <o.z@mail.com>",
    to: options.email,
    subject: options.subject,
    text: options.message,
    // html:
  };
  // 3. Send the email
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
