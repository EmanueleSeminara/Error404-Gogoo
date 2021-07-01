// Controllo se il ruolo dell'utente loggato è driver
module.exports = (req, res, next) => {
  if (req.isAuthenticated() && req.user.role == "driver") return next();

  return res.status(401).json({ error: "not autorized" });
};
