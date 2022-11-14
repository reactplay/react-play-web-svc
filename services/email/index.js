import sgMail from "@sendgrid/mail";

export const sendMail = (sendgrid_api_key, email) => {
  console.log(">>>>>>>>>>>>>>>>>");
  console.log(sendgrid_api_key);
  sgMail.setApiKey(sendgrid_api_key);
  const msg = {
    to: "koustov@gmail.com", // Change to your recipient
    from: "ioreactplay@gmail.com", // Change to your verified sender
    subject: "Sending with SendGrid is Fun",
    text: "and easy to do anywhere, even with Node.js",
    html: "<strong>and easy to do anywhere, even with Node.js</strong>",
    templateId: "d-242034c978464ef7af0508d7c2c1270e",
    dynamicTemplateData: {
      for: "Winner",
      badge_name: "Hack-R-Play Winner",
      user_email_slug: email,
    },
  };
  sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent");
    })
    .catch((error) => {
      console.error(error);
    });
};
