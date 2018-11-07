const express = require('express');

//Instacia rotas
const routes  = express.Router();

//Importa Controller
const TweetController = require('./controllers/TweetController');
const LikeController = require('./controllers/LikeController');

//Retorna Tweets
routes.get('/tweets' ,TweetController.index);
//Criar Tweet
routes.post('/tweets' ,TweetController.store);
//Da Like no tweet
routes.post('/likes/:id' ,LikeController.store);

//Exporta rotas
module.exports = routes;