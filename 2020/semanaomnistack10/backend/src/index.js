//definindo a variavel express e importando o modulo express para utilizizacao dos recusos
//tipo const, pois nao tera seu valor alterado, constante
const express = require('express');
//mongoose ferramenta para banco de dados
const mongoose = require('mongoose');
const cors = require('cors');
//importando as rotas, usa-se ./ (caminho relativo)
const routes = require('./routes');

//varivel para receber a funcao express
const app = express();


//definindo conexão ao banco
//passando segundo parametro (objetos) para remover avisos (erro) de conexão ao banco
mongoose.connect('mongodb+srv://omnistack10:omnistack@cluster0-n7zcj.mongodb.net/week10?retryWrites=true&w=majority', {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useFindAndModify: true,
    useCreateIndex: true,
});

app.use(cors());

//entender requisições cujo corpo tem formato json
//tem que vir antes das rotas
app.use(express.json());

//utilizando as rotas importadas
app.use(routes);

//definindo uma porta para execucao da aplicacao
app.listen(3333);


//Métodos http:
//get = buscar
//post = salvar
//put = editar
//delete = apagar

//Tipos de parametros:
//Query params: request.query buscar (filtros, ordenação, paginação,...)
//Route params: request.params (identificar um recurso na alteração ou remoção)
//Body: request.body (dados para criação ou alteração de um registro )

//metodo get para direcionar a rota
//passando dois parametros, requisicao e resposta
//utilizando o metodo json para retornar objeto com o texto

/*app.get('/',(request, response) => {
    return response.json({message: 'Hello World'})
});

//Query params: request.query buscar (filtros, ordenação, paginação,...)
app.get('/users',(request, response) => {
    console.log(request.query)
    return response.json({message: 'Hello World'})
});

//Route params: request.params (identificar um recurso na alteração ou remoção)
app.delete('/users/:id',(request, response) => {
    console.log(request.params)
    return response.json({message: 'Hello World'})
});

//Body: request.body (dados para criação ou alteração de um registro )
app.post('/users',(request, response) => {
    console.log(request.body)
    return response.json({message: 'Hello World'})
});

//MongoDB (não-relacional)

app.post('/users',(request, response) => {
    console.log(request.body)
    return response.json({message: 'Hello World'})
});*/