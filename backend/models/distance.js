var distance = require("google-distance");
distance.apiKey = process.env.GOOGLE_KEY;

// Calcola la distanza in km e tempo (a piedi) tra la via in cui si trova il cliente e la via in cui si trova il veicolo (solo nel caso di veicoli fuori stallo)
exports.get = (start, end) => {
  return new Promise((resolve, reject) => {
    distance.get(
      {
        origin: start + ", Palermo Italy",
        destination: end + ", Palermo Italy",
        mode: "walking",
        language: "it",
      },
      function (err, data) {
        return err ? reject(err) : resolve(data);
      }
    );
  });
};
