var distance = require("google-distance");
distance.apiKey = process.env.GOOGLE_KEY;

exports.get = (start, end) => {
  return new Promise((resolve, reject) => {
    distance.get(
      {
        origin: start + ", Palermo Italy",
        destination: end + ", Palermo Italy",
        mode: "walking",
        language: 'it'
      },
      function (err, data) {
        return err ? reject(err) : resolve(data);
      }
    );
  });
};
