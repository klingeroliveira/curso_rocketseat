//importando apenas o modulo router do express
const {Router} = require('express');
//importar a controller para usar as funções
const DevController = require('./controllers/DevController');
const SearchController = require('./controllers/SearchController');

//variavel para usar a função router
const routes = Router();

//listar os devs
routes.get('/devs', DevController.index);

//buscar os devs
routes.get('/search', SearchController.index);

//cadastrar os devs
routes.post('/devs', DevController.store);

//exportar rotas para a index usar
module.exports = routes;