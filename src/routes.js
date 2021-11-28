const express = require('express');
const usuarios = require('./controladores/usuarios');
const marcacao = require('./controladores/marcacao');

const routes = express();

routes.post('/usuarios', usuarios.identificarUsuario);

routes.get('/usuarios', usuarios.listarUsuarios);

routes.post('/marcarlugar', marcacao.marcacaoLugar);

routes.get('/marcarlugar', marcacao.listarLugaresMarcados);

routes.get('/comentarios/:logradouro', marcacao.listarComentarios);


module.exports = routes;