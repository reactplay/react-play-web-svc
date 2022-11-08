import hbs from "nodemailer-express-handlebars";
import nodemailer from "nodemailer";
import path from "path";

// initialize nodemailer
var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "ioreactplay@gmail.com",
    pass: "password_for_your_email_address",
  },
});

// point to the template folder
const handlebarOptions = {
  viewEngine: {
    partialsDir: path.resolve("./views/"),
    defaultLayout: false,
  },
  viewPath: path.resolve("./views/"),
};

// use a template file with nodemailer
transporter.use("compile", hbs(handlebarOptions));

export const sendMail = () => {
  var mailOptions = {
    from: '"Adebola" <ioreactplay@gmail.com>', // sender address
    to: "koustov@gmail.com", // list of receivers
    subject: "Welcome!",
    template: "email", // the name of the template file i.e email.handlebars
    context: {
      name: "Adebola", // replace {{name}} with Adebola
      company: "My Company", // replace {{company}} with My Company
    },
  };

  // trigger the sending of the E-mail
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      return console.log(error);
    }
    console.log("Message sent: " + info.response);
  });
};

// import sgMail from "@sendgrid/mail";

// export const sendMail = (sendgrid_api_key) => {
//   sgMail.setApiKey(sendgrid_api_key);
//   const msg = {
//     to: "koustov@gmail.com", // Change to your recipient
//     from: "ioreactlplay@gmail.com", // Change to your verified sender
//     subject: "Sending with SendGrid is Fun",
//     text: "and easy to do anywhere, even with Node.js",
//     html: "<strong>and easy to do anywhere, even with Node.js</strong>",
//   };
//   sgMail
//     .send(msg)
//     .then(() => {
//       console.log("Email sent");
//     })
//     .catch((error) => {
//       console.error(error);
//     });
// };
