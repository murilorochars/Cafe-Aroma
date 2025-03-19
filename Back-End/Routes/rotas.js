const express = require('express');
const router = express.Router();
const controlador = require('../Controler/controler.js')

//retorna usuarios cadastrado
router.get('/cadastro', controlador.RetornaUsuarios)
//cadastra usuarios
router.post('/cadastro',controlador.AdicionaUsuarios)

router.get('/login')

router.post('login')

module.exports = router;
