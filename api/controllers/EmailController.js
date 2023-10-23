const nodemailer = require("nodemailer");
const Mailgen = require("mailgen");

const sendMail = (req, res) => {
  const { ownerEmail, ownerName, customerName, customerEmail, messageBody } =
    req.body;

  const companyName = "Auto Exchange";

  let config = {
    service: process.env.SERVICE,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  };

  // Create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport(config);

  // Configure mailgen by setting a theme and your product info
  let MailGenerator = new Mailgen({
    theme: "default",
    product: {
      name: companyName,
      link: "https://google.com/",
    },
  });

  // Prepare email contents
  let response = {
    body: {
      name: ownerName,
      intro: `${customerName} is interested in your car, please contact him/her. Here's a message from him/her:- <br /><br /> ${customerName}: ${messageBody}`,
      action: {
        button: {
          color: "#22BC66", // Optional action button color
          text: "Contact this user",
          link: `https://mail.google.com/mail/?view=cm&fs=1&to=${customerEmail}`,
        },
      },
    },
  };

  // Generate an HTML email with the provided contents
  let emailBody = MailGenerator.generate(response);

  // Message object
  let message = {
    from: process.env.EMAIL,
    to: ownerEmail,
    subject: "We got a Customer!",
    html: emailBody,
  };

  // Send mail with defined transport object
  transporter
    .sendMail(message)
    .then(() => {
      return res.status(200).json({
        message: "You should receive an email",
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({ err });
    });
};

module.exports = { sendMail };
