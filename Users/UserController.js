const express = require('express');
const router = express.Router();
const Users = require('./Users');
const flash = require('connect-flash');
// Middleware do flash (depois da sessão)






// Rota para criar um novo usuário



router.get("/admin/users", (req, res) => {
    Users.findAll().then(users => {
        res.send("/admin/users/index", { users });
    });




});


router.get("/admin/users/create", (req, res) => {
    res.render("admin/users/create");
});






module.exports = router;














module.exports = router;