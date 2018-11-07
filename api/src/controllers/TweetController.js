const Tweet = require('../models/Tweet');

module.exports = {
    //metodos async
    async index(req, res){
        //Busca tweets no banco de dados
        const tweets = await Tweet.find({}).sort('-createdAt');
        return res.json(tweets);
    },

    async store(req, res){
        const tweet = await Tweet.create(req.body);

        //Dispara evento, avisando que foi criado um novo tweet
        req.io.emit('tweet', tweet);

        return res.json(tweet);
    }
};