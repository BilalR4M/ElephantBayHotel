const expressAsyncHandler = require("express-async-handler");
const dotenv = require("dotenv");
const nodemailer = require("nodemailer");
dotenv.config();

let transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_MAIL, // generated ethereal user
    pass: process.env.SMTP_PASSWORD, // generated ethereal password
  },
});

const sendEmailMsgController = expressAsyncHandler(async (req, res) => {
  try {
    const { email, subject, message } = req.body;
    // console.log(email, subject, message);

    var mailOptions = {
      from: process.env.SMTP_MAIL,
      to: email,
      subject: subject,
      text: message,
    };

    const sendEmail = await transporter.sendMail(mailOptions);

    res.status(201).json({
      message: "Email sent successfully!",
      error: false,
      success: true,
      data: sendEmail,
  });
  } catch (error) {
    res.status(400).json({
      message: "Already to receive offers!",
      error: true,
      success: false,
  });
  }
});

module.exports = { sendEmailMsgController };
