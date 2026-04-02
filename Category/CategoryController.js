const express = require('express');
const router = express.Router();
const Category = require('./Category');
const slugify = require('slugify');
// slugify: cria uma url amigavel ex: "Minha Categoria" vira "minha-categoria"

const flash = require('connect-flash');
// Middleware do flash (depois da sessão)

router.get('/admin/categories/new', (req, res) => {
  // Renderiza a página de criação de nova categoria

  res.render('admin/categories/new');
});
router.post('/categories/save', (req, res) => {
  const title = req.body.name; // Corrigido para `name` (do campo de entrada no formulário)

  if (title && title.trim() !== '') {
    Category.create({
      title: title,
      slug: slugify(title),
    })
      .then(() => {
        req.flash('success', 'Categoria criada com sucesso!'); // Mensagem de sucesso
        res.redirect('/admin/categories'); // Redireciona para a página principal após sucesso
      })
      .catch((error) => {
        req.flash('error', 'Erro ao criar a categoria!'); // Mensagem de erro
        res.redirect('/admin/categories/new'); // Redireciona para a página de criação se houver erro
      });
  } else {
    req.flash('error', 'Título não pode ser vazio'); // Mensagem de erro
    res.redirect('/admin/categories/new'); // Redireciona se o título estiver vazio
  }
});
router.post('/categories/delete', async (req, res) => {
  let acao = req.body.acao;
  let id = req.body.id;

  if (acao === 'deletar') {
    if (!id) {
      req.flash('error', 'ID inválido para deletar!');
      return res.redirect('/admin/categories');
    }

    try {
      await Category.destroy({
        where: { id: id },
      });

      req.flash('success', 'Categoria apagada com sucesso!');
      return res.redirect('/admin/categories');
    } catch (err) {
      console.error(err);

      //  TRATAMENTO ESPECÍFICO DA FOREIGN KEY
      if (err.name === 'SequelizeForeignKeyConstraintError') {
        req.flash('error', 'Não é possível apagar a categoria vinculada a um artigo.');
      } else {
        req.flash('error', 'Erro ao apagar a categoria!');
      }

      return res.redirect('/admin/categories');
    }
  } else {
    req.flash('error', 'Erro ao tentar realizar a ação!');
    return res.redirect('/admin/categories');
  }
});

router.get('/admin/categories', (req, res) => {
  Category.findAll().then((categories) => {
    res.render('admin/categories/index', { categories: categories });
  });
});
router.get('/admin/categories/edit/:id', async (req, res) => {
  const idParam = req.params.id;

  // Verifica se a string é composta apenas por dígitos
  if (!/^\d+$/.test(idParam)) {
    req.flash('error', 'ID inválido para editar!');
    return res.redirect('/admin/categories');
  }

  const id = parseInt(idParam, 10);

  try {
    const category = await Category.findByPk(id);

    if (category) {
      res.render('admin/categories/edit', { category });
    } else {
      req.flash('error', 'Categoria não encontrada!');
      res.redirect('/admin/categories');
    }
  } catch (err) {
    console.error('Erro ao buscar categoria:', err);
    res.redirect('/admin/categories');
  }
});
router.post('/categories/update', (req, res) => {
  let id = req.body.id;
  let title = req.body.name;

  Category.update(
    {
      title: title,
      slug: slugify(title),
    },
    {
      where: { id: id },
    }
  )
    .then(() => {
      req.flash('success', 'Categoria atualizada com sucesso!'); // caso tenha sucesso ele salva no banco
      res.redirect('/admin/categories');
    })
    .catch((err) => {
      console.error(err);
      req.flash('error', 'Erro ao atualizar a categoria!'); // caso contrario ele mostra um erro
      res.redirect('/admin/categories');
    });
});

module.exports = router;
