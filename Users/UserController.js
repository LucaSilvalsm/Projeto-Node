const express = require('express');
const router = express.Router();
const Users = require('./Users');

router.get('/admin/users', (req, res) => {
  Users.findAll().then((users) => {
    res.render('admin/users/index', { users });
  });
});

router.get('/admin/users/create', (req, res) => {
  res.render('admin/users/create');
});

router.post('/users/create', (req, res) => {
  const { name, email, password } = req.body;

  if (
    name &&
    name.trim() !== '' &&
    email &&
    email.trim() !== '' &&
    password &&
    password.trim() !== ''
  ) {
    Users.findOne({ where: { email } }).then((user) => {
      if (user) {
        req.flash('error', 'Email já cadastrado.');
        return res.redirect('/admin/users/create');
      }

      Users.create({
        name,
        email,
        password,
      })
        .then(() => {
          req.flash('success', 'Usuário criado com sucesso.');
          res.redirect('/');
        })
        .catch((error) => {
          console.error(error);
          req.flash('error', 'Erro ao criar usuário.');
          res.redirect('/admin/users/create');
        });
    });
  } else {
    req.flash('error', 'Todos os campos são obrigatórios.');
    return res.redirect('/admin/users/create');
  }
});

module.exports = router;
