const express = require('express');
const conectar = require('./Database/database');
const app = express();
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const session = require('express-session'); // Adicionei a Session para usar o flash

// Importando os Models
const Category = require('./categories/Category');
const Article = require('./Articles/Article');

// Importando os Controllers
const categoriaController = require('./categories/categoriesController');
const loginController = require('./login/loginController');

// Carregando a views engine
app.set('view engine', 'ejs');

// Setando arquivos estáticos como CSS
app.use(express.static('public'));

// Setando o body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Configurando a sessão antes do flash
app.use(session({
    secret: 'seu-segredo',
    resave: false,
    saveUninitialized: true
}));

// Configurando o middleware do flash
app.use(flash());

// Middleware para tornar as mensagens acessíveis nas views
app.use((req, res, next) => {
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  next();
});
// Conexão com o banco de dados
conectar.authenticate()
    .then(() => {
        console.log('Conexão com o banco de dados foi estabelecida');
    })
    .catch((msgError) => {
        console.log(msgError);
    });

// Definindo as rotas
app.use('/', categoriaController);
app.use('/', loginController);

app.get('/', (req, res) => {
    res.render('index');
});

// Iniciando o servidor
app.listen(8080, () => {
    console.log('Server rodando na porta 8080');
    console.log('Visit http://localhost:8080 ');
});
// Sincronizando os modelos com o banco de dados