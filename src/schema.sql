--CREATE DATABASE locais_acessiveis;

CREATE TABLE usuarios(
id serial PRIMARY KEY,
nome varchar(100) NOT NULL,
email text NOT NULL UNIQUE
);

CREATE TABLE marcacao(
id serial PRIMARY KEY,
usuario_id varchar REFERENCES usuarios(email),
categoria text NOT NULL,
comentarios text NOT NULL,
logradouro varchar(100) NOT NULL,
coordenadas varchar(50) DEFAULT NULL
);


