const dotenv = require("dotenv");
dotenv.config();
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
const EMAIL_TEMPLATE_ID = process.env.SENDGRID_EMAIL_TEMPLATE_ID;

const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(SENDGRID_API_KEY);

const sendMail = (email, badge) => {
  console.log(`Sending mail to : ${email} for ${badge}`);
  const msg = {
    to: email,
    from: "ioreactplay@gmail.com",
    templateId: EMAIL_TEMPLATE_ID,
    dynamicTemplateData: {
      badge_name: badge,
      user_email_slug: email,
    },
  };
  sgMail
    .send(msg)
    .then(() => {
      console.log(`Email sent to : ${email}`);
    })
    .catch((error) => {
      console.error(error);
    });
};

module.exports.sendMail = sendMail;
