const express = require('express');
const router = express.Router();
const Users = require('./Users');
const bcrypt = require('bcryptjs');

router.get('/admin/users/lista', (req, res) => {
  Users.findAll().then((users) => {
    res.render('admin/users/lista', { users });
  });
});

router.get('/admin/users/create', (req, res) => {
  res.render('admin/users/create');
});

router.get('/admin/users/login', (req, res) => {
  res.render('admin/users/login');
});

router.post("/users/login", (req, res) => {
  const { email, password } = req.body;

  Users.findOne({ where: { email } }).then((user) => {
    if (user) {
      bcrypt.compare(password, user.password).then((match) => {
        if (match) {
          req.session.user = user;
          req.flash("success", "Login bem-sucedido.");          
          res.redirect("/admin/articles");
        } else {
          req.flash("error", "Senha incorreta.");
          res.redirect("/admin/users/login");
        }
      });
    } else {
      req.flash("error", "Usuário nao encontrado.");
      res.redirect("/admin/users/login");
    }
  });
});

router.post("/admin/users/delete/:id", (req,res) =>{
  const id = req.params.id;

  if(id){
    Users.destroy({
      where: {
        id
      }
    }).then(()=>{
      req.flash("success", "Usuario deletado com sucesso.");
      res.redirect("/admin/users/lista");
      
    }).catch((error)=>{
      console.error(error);
      res.redirect("/admin/users/lista");
      flash("error", "Erro ao deletar usuario.");
    })  
  }else{
    res.redirect("/admin/users/lista");
  }

});


router.get('/admin/users/logout', (req, res) => {
  req.session.destroy();
  req.flash('success', 'Logout bem-sucedido.');
  res.redirect('/');
});

router.post('/users/create', (req, res) => {
  const { name, email, password } = req.body;

  if (
    name && name.trim() !== '' &&
    email && email.trim() !== '' &&
    password && password.trim() !== ''
  ) {
    Users.findOne({ where: { email } }).then((user) => {
      if (user) {
        req.flash('error', 'Email já cadastrado.');
        return res.redirect('/admin/users/create');
      }

      bcrypt.hash(password, 10).then((hash) => {
        Users.create({
          name,
          email,
          password: hash,
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
    });
  } else {
    req.flash('error', 'Todos os campos são obrigatórios.');
    return res.redirect('/admin/users/create');
  }
});
module.exports = router;
