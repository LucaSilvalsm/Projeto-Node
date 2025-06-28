const express = require('express');
const conectar = require('./Database/database');
const app = express();
const bodyParser = require('body-parser');

// Importando os Dominions 
const categoriaController = require('./categories/categoriesController');
const loginController = require('./login/loginController');
// carregando a views engine

app.set('view engine', 'ejs');
// Setando arquivos estáticos como CSS
app.use(express.static('public'));
// Setando o body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Setando o banco de dados

conectar.authenticate()
    .then(() => {
        console.log('Conexão com o banco de dados foi estabelecida');
    })
    .catch((msgError) => {
        console.log(msgError);
    });

// Para utilizar as rotas criadas

app.use('/', categoriaController);
app.use('/', loginController);

app.get('/', (req, res) => {
    res.render('index');
})

app.listen(8080,()=>{
    console.log('Server rodando na porta 8080');
    console.log('Visit http://localhost:8080 ');
})