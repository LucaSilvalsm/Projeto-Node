const express = require('express');
const router = express.Router();
const Category = require('./Category')
const slugify = require('slugify');
// slugify: cria uma url amigavel ex: "Minha Categoria" vira "minha-categoria"

const flash = require('connect-flash');
// Middleware do flash (depois da sessão)




router.get("/admin/categories/new", (req, res) => {
    res.render("admin/categories/new");
});
router.post("/categories/save", (req, res) => {
  const title = req.body.name; // Corrigido para `name` (do campo de entrada no formulário)

  if (title && title.trim() !== "") {
    Category.create({
      title: title,
      slug: slugify(title)
    }).then(() => {
      req.flash("success", "Categoria criada com sucesso!"); // Mensagem de sucesso
      res.redirect("/"); // Redireciona para a página principal após sucesso
    }).catch((error) => {
      req.flash("error", "Erro ao criar a categoria!"); // Mensagem de erro
      res.redirect("/admin/categories/new"); // Redireciona para a página de criação se houver erro
    });
  } else {
    req.flash("error", "Título não pode ser vazio"); // Mensagem de erro
    res.redirect("/admin/categories/new"); // Redireciona se o título estiver vazio
  }
});


module.exports = router;
