const express = require('express');
const router = express.Router();
const Articles = require('./Article'); // seu model
const slugify = require('slugify');    // cria url amigável
const flash = require('connect-flash'); // middleware do flash

// rota de teste
router.get("/articles", (req, res) => {
    res.send('Bem vindo à rota de artigos!');
});

// rota para renderizar o formulário de novo artigo
router.get("/admin/articles/new", (req, res) => {
    res.render("admin/articles/new"); // views/admin/articles/new.ejs
});

// exportando corretamente
module.exports = router;


