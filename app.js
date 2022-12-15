const express = require('express');
const app = express();
const cors = require('cors');
const rotas = require('./rotas');

// app.use(cors());
app.use(rotas);

porta = process.env.PORT || 3000



app.get("/",function(req, res){
    res.send('rodando');
})

app.listen(porta, () => {

    console.log(`Listening on port: ${porta}`)
})






