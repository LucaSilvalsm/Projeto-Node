const express = require('express');
const router = express.Router();
const Articles = require('./Article');
const slugify = require('slugify');
const Category = require('../Category/Category');
const multer = require('multer');
const path = require('path');

// =============================
// CONFIGURAÇÃO DO UPLOAD
// =============================
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/img');
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + '-' + Date.now() + path.extname(file.originalname),
    );
  },
});

var upload = multer({ storage: storage });

// =============================
// LISTAR ARTIGOS
// =============================
router.get('/admin/articles', async (req, res) => {
  try {
    const articles = await Articles.findAll({
      include: [{ model: Category }],
    });

    res.render('admin/articles/index', { articles });
  } catch (err) {
    console.error('Erro ao carregar artigos:', err);
    res.status(500).send('Erro interno ao carregar artigos');
  }
});

// =============================
// NOVO ARTIGO
// =============================
router.get('/admin/articles/new', async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.render('admin/articles/new', { categories });
  } catch (err) {
    console.error(err);
    req.flash('error', 'Erro ao carregar categorias');
    res.redirect('/admin/articles');
  }
});

// =============================
// SALVAR ARTIGO
// =============================
router.post('/articles/save', upload.single('image'), async (req, res) => {
  try {
    const { title, body, category } = req.body;

    let imagePath = null;

    if (req.file) {
      imagePath = '/img/' + req.file.filename; //
    }

    await Articles.create({
      title,
      slug: slugify(title),
      body,
      category_id: category,
      image: imagePath,
    });

    req.flash('success', 'Artigo criado com sucesso!');
    res.redirect('/admin/articles');
  } catch (err) {
    console.error(err);
    req.flash('error', 'Erro ao criar artigo!');
    res.redirect('/admin/articles');
  }
});
// =============================
// UPDATE DE ARTIGO
// =============================
router.post('/articles/update', upload.single('image'), async (req, res) => {
  try {
    const { id, title, body, category } = req.body;

    let imagePath = null;

    if (req.file) {
      imagePath = '/img/' + req.file.filename; // ✅ corrigido
    }

    await Articles.update(
      {
        title,
        slug: slugify(title),
        body,
        category_id: category,
        image: imagePath,
      },
      { where: { id: id } },
    );

    req.flash('success', 'Artigo atualizado com sucesso!');
    res.redirect('/admin/articles');
  } catch (err) {
    console.error(err);
    req.flash('error', 'Erro ao atualizar artigo!');
    res.redirect('/admin/articles');
  }
});

// =============================
// EDITAR
// =============================
router.get('/admin/articles/edit/:id', async (req, res) => {
  const idParam = req.params.id;

  if (!/^\d+$/.test(idParam)) {
    req.flash('error', 'ID inválido!');
    return res.redirect('/admin/articles');
  }

  try {
    const article = await Articles.findByPk(idParam);

    if (!article) {
      req.flash('error', 'Artigo não encontrado!');
      return res.redirect('/admin/articles');
    }

    const categories = await Category.findAll();

    res.render('admin/articles/edit', {
      article,
      categories,
    });
  } catch (err) {
    console.error(err);
    res.redirect('/admin/articles');
  }
});

// =============================
// ATUALIZAR
// =============================


module.exports = router;
