const express = require('express')
const app = express()
const mysql = require('./db/db.js')
const jwt = require('jsonwebtoken');
require('dotenv').config()
require('crypto').randomBytes(64).toString('hex')
// '09f26e402586e2faa8da4c98a35f1b20d6b033c6097befa8be3486a829587fe2f90a832bd3ff9d42710a4da095a2ce285b009f0c3730cd9b8e1af3eb84df6611'
const routeUsuario = require('./Routes/rotas.js') 

app.use(express.json()); 



app.use('/users', routeUsuario);

app.listen(3000,()=>{
    console.log('rodando porta 3000')
})


