
//importar biblioteca para conectar a apis externas
const axios = require('axios');
//importa a dev que contem os modelo de dados
const Dev = require('../models/Dev');
//importar função para array
const parseStringAsArray = require('../utils/parseStringAsArray');

//index = mostrar lista do recurso
//show = mostrar um unico
//store = criar
//update = alterar
//destroy = deletar

module.exports = {

    async index(request,response){
        const devs = await Dev.find();

        return response.json(devs);
    },

    async store(request, response) {
        const { github_username, techs, latitude, longitude } = request.body;
    
        //função para localizar se o usuário já existe
        let dev = await Dev.findOne({github_username});
        
        if (!dev) {
            //await (aguardar a resposta da API do guit)
            //utilizase crase na string para passar uma variável
            const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);
            
            //retornando apenas as informações necessárias
            //name = login é uma condição, quando não tiver um vem o outro
            const {name = login, avatar_url, bio} = apiResponse.data;
            
            //separa em um array a string, separadas por ','
            //e o map percorre a string e faz um trim
            const techsArray = parseStringAsArray(techs);
        
            //laction para gravar no mongo as coordenadas
            //mesmas variaveis de pointschema
            const location = {
                type: 'Point',
                coordinates: [longitude,latitude]
            };
            //retorna os dados em uma variavel
            dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs: techsArray,
                location,
            })
        }
        return response.json(dev);
    },

};