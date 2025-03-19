const express = require('express')
const app = express()
const mysql = require('./db/db.js')
const routeUsuario = require('./Routes/rotas.js') 

app.use(express.json()); 



app.use('/users', routeUsuario);

app.listen(3000,()=>{
    console.log('rodando porta 3000')
})


