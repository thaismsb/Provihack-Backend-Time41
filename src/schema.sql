CREATE DATABASE locais_acessiveis;

-- CREATE TABLE usuarios(
-- id serial PRIMARY KEY,
-- nome varchar(100) NOT NULL,
-- email text NOT NULL UNIQUE
-- );

CREATE TABLE marcacao_usuario(
id serial PRIMARY KEY,
nome varchar(100) NOT NULL,
email varchar(100) NOT NULL,
categoria text,
nome_do_estabelecimento varchar(50),
comentario text NOT NULL,
logradouro varchar(100) NOT NULL,
coordenadas varchar(50) DEFAULT NULL,
aprovacao BOOLEAN DEFAULT false
);


