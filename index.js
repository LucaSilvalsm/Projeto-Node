const express = require('express');
const conectar = require('./Database/database');
const app = express();
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const session = require('express-session');
const path = require('path');
const he = require('he');

// =======================
// IMPORTANDO MODELS
// =======================
const Category = require('./Category/Category');
const Article = require('./Articles/Article');

// =======================
// IMPORTANDO CONTROLLERS
// =======================
const categoriaController = require('./Category/CategoryController');
const articlesController = require('./Articles/ArticlesController');
const loginController = require('./login/loginController');

// =======================
// VIEW ENGINE
// =======================
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); // ✅ garante o caminho

// =======================
// ARQUIVOS ESTÁTICOS
// =======================
app.use(express.static('public')); // ✅ apenas uma vez

// =======================
// BODY PARSER
// =======================
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// =======================
// SESSION (ANTES DO FLASH)
// =======================
app.use(
  session({
    secret: 'seu-segredo',
    resave: false,
    saveUninitialized: true,
  }),
);

// =======================
// FLASH
// =======================
app.use(flash());

// =======================
// MENSAGENS GLOBAIS
// =======================
app.use((req, res, next) => {
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  next();
});

// =======================
// BANCO DE DADOS
// =======================
conectar
  .authenticate()
  .then(() => {
    console.log('✅ Conexão com o banco estabelecida');
    return conectar.sync();
  })
  .then(() => {
    console.log('✅ Models sincronizados');
  })
  .catch((err) => {
    console.error('❌ Erro no banco:', err);
  });

// =======================
// ROTAS
// =======================
app.use('/', categoriaController);
app.use('/', loginController);
app.use('/', articlesController);

app.get('/', async (req, res) => {
  try {
    const articles = await Article.findAll({
      include: [{ model: Category }],
    });

    // 🔥 limpeza profissional
    const articlesClean = articles.map((a) => {
      const decoded = he.decode(a.body || '');

      const textOnly = decoded
        .replace(/<[^>]*>/g, '') // remove HTML
        .replace(/\s+/g, ' ') // normaliza espaços
        .trim();

      return {
        ...a.dataValues,
        preview: textOnly.substring(0, 240),
      };
    });

    res.render('index', { articles: articlesClean });
  } catch (err) {
    console.error('Erro ao carregar artigos:', err);
    res.status(500).send('Erro interno ao carregar artigos');
  }
});

// Rota para exibir um artigo específico
app.get('/:slug',(req,res)=>{
  const slug = req.params.slug;
  Article.findOne({
    where: {
      slug: slug
    }
  }).then(article=>{
    if(article){
      res.render('article',{article: article});
    }else{
      res.redirect('/');
    }
  }).catch(err=>{
    console.log(err);
    res.redirect('/');
  })
})

// =======================
// SERVIDOR
// =======================
app.listen(8080, () => {
  console.log('🚀 Server rodando na porta 8080');
  console.log('👉 http://localhost:8080');
});
