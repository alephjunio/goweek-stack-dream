//Dependencias
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

//Instancia aplicacao
const app = express();

//Extrair servidor http
const server = require('http').Server(app);
//Habilita comunicacao via websocket
const io = require('socket.io')(server);

//Conecta banco de dados
mongoose.connect(
    "mongodb://goweek:stack2018@ds155203.mlab.com:55203/goweek-alephjunio",
    {
        useNewUrlParser: true
    }
);

//Disponibiliza o io para todas as requisicoes
app.use((req, res, next) => {
    req.io = io;
    return next();
})

//Habilita cross domain
app.use(cors());
//Seta JSON como padrao
app.use(express.json());
//Rotas
app.use(require('./routes'));

//Inicia aplicacao
server.listen(3000, () => {
    console.log('Server iniciado na porta 3000');
});
