const express = require('express');
const usuarios = require('./controladores/usuarios');
const marcacao = require('./controladores/marcacao');

const routes = express();

routes.get('/', (req, res) => {
    return res.send('OK');
})

routes.post('/usuarios', usuarios.identificarUsuario);

routes.get('/usuarios', usuarios.listarUsuarios);

routes.post('/marcarlugar', marcacao.marcacaoLugar);

routes.get('/marcarlugar', marcacao.listarLugaresMarcados);

routes.get('/comentarios/:logradouro', marcacao.listarComentarios);

routes.get('/lugares/:categoria', marcacao.listarLugaresCategoria);


module.exports = routes;