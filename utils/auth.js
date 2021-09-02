const sessionChecker = (req, res, next) => {
    if (!req.session.user && req.cookies.user_sid) {
        res.redirect("/login");
    } else {
        next();
    }
};


module.exports = sessionChecker;