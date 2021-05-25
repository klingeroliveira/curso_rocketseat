//importar mongoose
const mongoose = require('mongoose');

const PointSchema = require('./utils/PointSchema');

//definindo os campos para cadastro do dev
const DevSchema = new mongoose.Schema({
    name: String,
    github_username: String,
    bio: String,
    avatar_url: String,
    techs: [String],
    location: {
        type: PointSchema,
        index: '2dsphere'
    }
});

//exportando o schema dos campos
module.exports = mongoose.model('Dev', DevSchema);