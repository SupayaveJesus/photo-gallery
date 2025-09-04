exports.checkUser = (req, res, next) => {
    if (!req.session.user) {
        res.redirect('/login');
        return;
    }
    req.local = req.local || {};
    req.local.userName = req.session.user.name;
    req.local.userEmail = req.session.user.email;
    next();
}