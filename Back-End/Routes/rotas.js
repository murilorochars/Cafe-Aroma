const express = require('express');

const router = express.Router();
const controlador = require('../Controler/controler.js')
const Auth = require('../middlewear/middlewear.js')
//retorna usuarios cadastrado
router.get('/cadastro', controlador.RetornaUsuarios)
//cadastra usuarios
router.post('/cadastro',controlador.AdicionaUsuarios)
// Retorna o usuario logado
router.get('/home',controlador.Home)
// Envia o login
router.post('/login', controlador.Login)
////////// Produtos////////
//retorna as categorias
router.get('/categoria', controlador.RetornaCategoria)
//envia a categoria
router.post('/categoria', controlador.AdicionaCategorias)
//Retorna todos produtos
router.get('/produtos')
//envia os produtos
router.post('/produtos')

module.exports = router;
