var nodemailer = require("nodemailer");

// Informazioni relativa lla mail usata per le comunicazioni
var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD,
  },
});

// Mail di benvenuto
exports.sendWelcomeMail = (email, name) => {
  transporter.sendMail(
    {
      from: process.env.MAIL_USER,
      to: email,
      subject: "Welcome to dropcar",
      text:
        "Dear " +
        name +
        ",\n\nThe dropcar team welcomes you to the platform, we wish you a good stay!",
    },
    function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    }
  );
};

// Mail che notifica l'avvenuto cambiamento della password
exports.sendPasswordChangedMail = (email, name) => {
  transporter.sendMail(
    {
      from: process.env.MAIL_USER,
      to: email,
      subject: "dropcar - The password has been changed",
      text:
        "Dear " +
        name +
        ",\n\nThe password associated with your account has been changed.\n\ndropcar Team",
    },
    function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    }
  );
};

// Mail che invia la nuova password generata casualmente a seguito del ripristino
exports.sendRecoveryPasswordMail = (email, password) => {
  transporter.sendMail(
    {
      from: process.env.MAIL_USER,
      to: email,
      subject: "dropcar - The password has been changed",
      text:
        "Dear User" +
        ",\n\nThe password associated with your account has been changed in:  " +
        password +
        "  .\n\ndropcar Team",
    },
    function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    }
  );
};

// Mail che notifica l'avvenuto cambiamento delle informazioni personali del cliente
exports.sendInformationChangedMail = (email, name) => {
  transporter.sendMail(
    {
      from: process.env.MAIL_USER,
      to: email,
      subject: "dropcar - Information changed",
      text:
        "Dear " +
        name +
        ",\n\nWe inform you that your account information has been changed.\n\ndropcar Team",
    },
    function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    }
  );
};

// Mail che notifica l'avvenuta rimozione di un metodo di pagamento del cliente
exports.sendPaymentMethodRemovedMail = (email, name) => {
  transporter.sendMail(
    {
      from: process.env.MAIL_USER,
      to: email,
      subject: "dropcar - Payment method removed",
      text:
        "Dear " +
        name +
        ",\n\nWe inform you that a payment method has been removed from your account.\n\ndropcar Team",
    },
    function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    }
  );
};

// Mail che notifica l'avvenuta aggiunzione della patente del cliente
exports.sendAddedLicenseMail = (email, name) => {
  transporter.sendMail(
    {
      from: process.env.MAIL_USER,
      to: email,
      subject: "dropcar - Added license",
      text:
        "Dear " +
        name +
        ",\n\nWe inform you that the license has been successfully added to your account!\n\ndropcar Team",
    },
    function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    }
  );
};

// Mail che notifica l'avvenuta modifica della patente del cliente
exports.sendModifiedLicenseMail = (email, name) => {
  transporter.sendMail(
    {
      from: process.env.MAIL_USER,
      to: email,
      subject: "dropcar - License modified",
      text:
        "Dear " +
        name +
        ",\n\nWe inform you that the license associated with your account has been updated!\n\ndropcar Team",
    },
    function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    }
  );
};

// Mail che notifica l'avvenuta aggiunzione di un metodo di pagamento del cliente
exports.sendPaymentMethodAddedMail = (email, name) => {
  transporter.sendMail(
    {
      from: process.env.MAIL_USER,
      to: email,
      subject: "dropcar - Payment method added",
      text:
        "Dear " +
        name +
        ",\n\nWe inform you that a payment method has been added from your account.\n\ndropcar Team",
    },
    function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    }
  );
};

// Mail che notifica la conferma della prenotazione richiesta dal cliente
exports.sendNewReservationMail = (email, name, id) => {
  transporter.sendMail(
    {
      from: process.env.MAIL_USER,
      to: email,
      subject: "dropcar - New Reservation",
      text:
        "Dear " +
        name +
        ",\n\nWe inform you that the booking of your vehicle with id " +
        id +
        " has been confirmed!\n\ndropcar Team",
    },
    function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    }
  );
};

// Mail che notifica l'avvenuta eliminazione della prenotazione richiesta dal cliente
exports.sendReservationDeletedMail = (email, name, id) => {
  transporter.sendMail(
    {
      from: process.env.MAIL_USER,
      to: email,
      subject: "dropcar - Reservation deleted",
      text:
        "Dear " +
        name +
        ",\n\nWe inform you that the reservation with id " +
        id +
        " has been canceled\n\ndropcar Team",
    },
    function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    }
  );
};

// Mail che notifica l'avvenuta modifica della prenotazioen richiesta dal cliente
exports.sendReservationEditedMail = (email, name, id) => {
  transporter.sendMail(
    {
      from: process.env.MAIL_USER,
      to: email,
      subject: "dropcar - Reservation deleted",
      text:
        "Dear " +
        name +
        ",\n\nWe inform you that the reservation with id " +
        id +
        " has been edited\n\ndropcar Team",
    },
    function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    }
  );
};

// Mail che notifica la scadenza della data e ora di consegna del veicolo prenotato dal cliente
exports.sendExpiredDeliveryMail = (email, name, id) => {
  transporter.sendMail(
    {
      from: process.env.MAIL_USER,
      to: email,
      subject: "dropcar - Delivery Expired",
      text:
        "Dear " +
        name +
        ",\n\nWe inform you that the delivery for the booking with id " +
        id +
        " has expired, log in to the portal to update the information.\n\ndropcar Team",
    },
    function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    }
  );
};

// Mail che notifica che la prenotazione richiesta dal cliente è in fase di elaborazione
exports.sendReservationBeingProcessedMail = (email, name) => {
  transporter.sendMail(
    {
      from: process.env.MAIL_USER,
      to: email,
      subject: "dropcar - New Reservation",
      text:
        "Dear " +
        name +
        ",\n\nWe inform you that your reservation is being processed, as soon as it is confirmed you will be informed!\n\ndropcar Team",
    },
    function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    }
  );
};

// Mail che notifica la mancata consegna del veicolo prenotato dal cliente e l'addebito della penale
exports.sendDeliveryFailureyMail = (email, name, id) => {
  transporter.sendMail(
    {
      from: process.env.MAIL_USER,
      to: email,
      subject: "dropcar - Delivery Failure",
      text:
        "Dear " +
        name +
        ",\n\nWe inform you that you have not delivered the vehicle associated with the booking with id " +
        id +
        ", you have been charged for the penalty.\n\ndropcar Team",
    },
    function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    }
  );
};

// Mail che notifica gli amministratori che vi è stata una mancata consegna di un veicolo
exports.sendDeliveryFailureyMailAdmin = (
  emailAdmin,
  nameGuest,
  idReservation,
  emailGuest
) => {
  transporter.sendMail(
    {
      from: process.env.MAIL_USER,
      to: emailAdmin,
      subject: "dropcar - Delivery Failure",
      text:
        "Dear Admin" +
        ",\n\nMr. " +
        nameGuest +
        " with email " +
        emailGuest +
        " did not deliver the vehicle associated with the booking with id " +
        idReservation +
        ".\n\ndropcar Team",
    },
    function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    }
  );
};
