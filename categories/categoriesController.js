const express = require('express');
const router = express.Router();

router.get("/categories", (req, res) => {
    res.send('Bem vindo a rota de categorias');
});

module.exports = router;
