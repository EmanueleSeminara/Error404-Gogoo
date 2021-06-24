var nodemailer = require("nodemailer");
//require("dotenv").config({ path: "../.env" });

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD,
  },
});

exports.sendWelcomeMail = (email, name) => {
  transporter.sendMail(
    {
      from: process.env.MAIL_USER,
      to: email,
      subject: "Welcome to Gogoo",
      text:
        "Dear " +
        name +
        ",\n\nThe Error404 team welcomes you to Gogoo!!",
    },
    function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    }
  );
}

exports.sendPasswordChangedMail = (email, name) => {
  transporter.sendMail(
    {
      from: process.env.MAIL_USER,
      to: email,
      subject: "Gogoo - The password has been changed",
      text:
        "Dear " +
        name +
        ",\n\nThe password associated with your account has been changed.\n\nGogoo Team",
    },
    function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    }
  );
}

exports.sendRecoveryPasswordMail = (email, name, password) => {
  transporter.sendMail(
    {
      from: process.env.MAIL_USER,
      to: email,
      subject: "Gogoo - The password has been changed",
      text:
        "Dear " +
        name +
        ",\n\nThe password associated with your account has been changed in: " +
        password +
        ".\n\nGogoo Team",
    },
    function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    }
  );
}
exports.sendInformationChangedMail = (email, name) => {
  transporter.sendMail(
    {
      from: process.env.MAIL_USER,
      to: user.email,
      subject: "Gogoo - Information changed",
      text:
        "Dear " +
        user.name +
        ",\n\nWe inform you that your account information has been changed.\n\nGogoo Team",
    },
    function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    }
  );
}

exports.sendInformationChangedMail = (email, name) => {
  transporter.sendMail(
    {
      from: process.env.MAIL_USER,
      to: email,
      subject: "Gogoo - Payment method removed",
      text:
        "Dear " +
        name +
        ",\n\nWe inform you that a payment method has been removed from your account.\n\nGogoo Team",
    },
    function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    }
  );
}


exports.sendPaymentMethodRemovedMail = (email, name) => {
  transporter.sendMail(
    {
      from: process.env.MAIL_USER,
      to: email,
      subject: "Gogoo - Payment method removed",
      text:
        "Dear " +
        name +
        ",\n\nWe inform you that a payment method has been removed from your account.\n\nGogoo Team",
    },
    function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    }
  );
}

exports.sendAddedLicenseMail = (email, name) => {
  transporter.sendMail(
    {
      from: process.env.MAIL_USER,
      to: email,
      subject: "Gogoo - Added license",
      text:
        "Dear " +
        name +
        ",\n\nWe inform you that the license has been successfully added to your account!\n\nGogoo Team",
    },
    function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    }
  );
}

exports.sendModifiedLicenseMail = (email, name) => {
  transporter.sendMail(
    {
      from: process.env.MAIL_USER,
      to: email,
      subject: "Gogoo - License modified",
      text:
        "Dear " +
        name +
        ",\n\nWe inform you that the license associated with your account has been updated!\n\nGogoo Team",
    },
    function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    }
  );
}

exports.sendPaymentMethodAddedMail = (email, name) => {
transporter.sendMail(
  {
    from: process.env.MAIL_USER,
    to: email,
    subject: "Gogoo - Payment method added",
    text:
      "Dear " +
      name +
      ",\n\nWe inform you that a payment method has been added from your account.\n\nGogoo Team",
  },
  function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  }
);
}