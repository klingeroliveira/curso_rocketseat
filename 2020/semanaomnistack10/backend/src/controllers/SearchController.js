const Dev = require('../models/Dev');
//importar função para array
const parseStringAsArray = require('../utils/parseStringAsArray');

module.exports = {
    async index(request, response){

        const {latitude, longitude, techs} = request.query;

        //filtrar por tec
        const techsArray = parseStringAsArray(techs);

        //buscar desv raio 10km
        const devs = await Dev.find({
            techs: {
                //in operador logido do mongo
                $in: techsArray,
            },
            location: {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [longitude,latitude],
                    },
                    $maxDistance: 10000,
                },
            },
        });

        return response.json({devs});

    }

}