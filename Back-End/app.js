const express = require('express')
const app = express()

app.get('/', (req,res)=>{
    res.json("Hello word")
})

app.listen(3000,()=>{
    console.log('rodando porta 3000')
})
