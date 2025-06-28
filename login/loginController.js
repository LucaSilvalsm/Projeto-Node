const express = require('express');
const router = express.Router();

// Importando os controllers

router.get('/login', (req, res) => {
    res.send('Bem vindo a rota de login!');
})

module.exports = router;