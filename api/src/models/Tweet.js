const mongoose = require('mongoose');

//Schema de campos do banco
const TweetSchema = new mongoose.Schema({
    auth: String,
    content: String,
    likes: {
        type: Number,
        default: 0,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
});

//registra e exporta nosso schema para ser importado
module.exports = mongoose.model('Tweet', TweetSchema);