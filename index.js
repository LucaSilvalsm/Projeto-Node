const express = require('express');

const app = express();
const bodyParser = require('body-parser');

// carregando a views engine

app.set('view engine', 'ejs');
// Setando arquivos estáticos como CSS
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('index');
})

app.listen(8080,()=>{
    console.log('Server rodando na porta 8080');
    console.log('Visit http://localhost:8080 ');
})