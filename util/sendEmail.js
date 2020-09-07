const nodemailer = require("nodemailer");
const ejs = require("ejs");

const sendEmailToSupplier = (supplierEmail, orderedItems) => {
  const transport = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    //   host: "smtp.mailtrap.io",
    //   port: 2525,
    auth: {
      user: "okushal71@gmail.com",
      pass: "sarala9843111145",
    },
  });

  const message = {
    from: "okushal71@gmail.com", // Sender address
    to: `${supplierEmail}`, // List of recipients
    subject: "Order from Mr. Sister App", // Subject line
    html: "<h1>You have got order from Mr.Sister App</h1>", // Plain text body
  };

  transport.sendMail(message, function (err, info) {
    if (err) {
      console.log(err);
    } else {
      console.log(info);
    }
  });
};

module.exports = {
  sendEmailToSupplier,
};
