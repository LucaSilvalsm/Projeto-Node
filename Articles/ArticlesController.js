const express = require('express');
const router = express.Router();
const Articles = require('./Article'); // seu model
const slugify = require('slugify');    // cria url amigável
const flash = require('connect-flash'); // middleware do flash
const Category = require('../categories/Category'); // seu model de categorias

// rota de teste
router.get("/articles", (req, res) => {
    res.send('Bem vindo à rota de artigos!');
});

// rota para renderizar o formulário de novo artigo
router.get("/admin/articles/new", (req, res) => {
    Category.findAll().then(categories => {
        res.render("admin/articles/new", {categories: categories});
    }).catch(err => {
        req.flash("error", "Erro ao carregar categorias");
        res.redirect("/admin/articles");
    });
   
});

// exportando corretamente
module.exports = router;


