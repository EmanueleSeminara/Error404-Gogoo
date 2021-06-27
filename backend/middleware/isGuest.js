module.exports = (req, res, next) => {
    if (req.isAuthenticated() && req.user.role == "guest") return next();

    return res.status(401).json({ error: "not autorized" });
};