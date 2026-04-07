function adminAuth(req, res, next) {
    if (req.session.user != undefined) {
        next();
    } else {
        req.flash('error', 'Acesso negado!')
        res.redirect('/admin/users/login')
    }
}

module.exports = adminAuth