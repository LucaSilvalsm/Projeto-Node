const express = require('express');
const router = express.Router();
const Articles = require('./Article'); // seu model
const slugify = require('slugify');    // cria url amigável
const flash = require('connect-flash'); // middleware do flash
const Category = require('../categories/Category'); // seu model de categorias

// rota de teste
router.get("/admin/articles", (req, res) => {
    Articles.findAll({
        include: [{model: Category}] // inclui a categoria relacionada
    }).then(articles => {    
        res.render("admin/articles/index", {articles: articles});
    }).catch(err => {
        req.flash("error", "Erro ao carregar artigos");
        res.redirect("/admin/articles");
    });
    
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

router.post("/articles/save",(req,res)=>{
    var title = req.body.title;
    var body = req.body.body;
    var category = req.body.category;
    Articles.create({
        title: title,
        slug: slugify(title),
        body: body, 
        category_id: category      
    }).then(() => {
        req.flash("success", "Artigo criada com sucesso!"); // Mensagem de sucesso
        res.redirect("/admin/articles");
        
    }).catch(err => {
        console.log(err);
        res.redirect("/admin/articles");    
    })
    
});
// exportando corretamente
module.exports = router;


