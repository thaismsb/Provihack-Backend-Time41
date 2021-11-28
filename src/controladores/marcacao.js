const conexao = require('../conexao');

const marcacaoLugar = async (req,res) =>{
    const {usuario_id,categoria,comentarios,logradouro,coordenadas} = req.body;

    if (!usuario_id) {
        return res.status(404).json({ mensagem: "Você precisa colocar um e-mail para se identificar." })
    }
    if (!categoria) {
        return res.status(404).json({ mensagem: "Você precisa colocar uma categoria para o local." })
    }
     if (!comentarios) {
        return res.status(404).json({ mensagem: "Você precisa deixar um comentário para que as outras pessoas entendam o porquê do local ser acessível. " })
    }
    if (!logradouro) {
        return res.status(404).json({ mensagem: "Você precisa deixar o endereço do local. " })
    }

    try {

        const query = 'insert into marcacao (usuario_id,categoria,comentarios,logradouro,coordenadas) values ($1, $2,$3,$4,$5)';

        const localMarcado = await conexao.query(query, [usuario_id,categoria,comentarios,logradouro,coordenadas]);

        if (localMarcado.rowCount === 0) {
            return res.status(400).json({ mensagem: "Não foi possível cadastrar o local." })  
        } 

         return res.status(201).json({ mensagem: "Local cadastrado com sucesso!" })

     } catch (error) {
         return res.status(404).json({ mensagem: error.message })
    }

}

const listarLugaresMarcados = async (req,res) =>{
    const todosOsLugares = await conexao.query('select * from marcacao');

    return res.status(200).json(todosOsLugares.rows);
}

const listarComentarios = async(req,res) =>{

        const {logradouro }= req.params;
    try {
        const coments = await conexao.query('select comentarios from marcacao where logradouro = $1', [logradouro]);

        if (coments.rowCount === 0) {
            return res.status(404).json('Comentários não encontrados.');
        }

        return res.status(200).json(coments.rows);
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

const listarLugaresCategoria = async(req,res) =>{

        const { categoria }= req.params;
    try {
        const categ = await conexao.query('select logradouro from marcacao where categoria = $1', [categoria]);

        if (categ.rowCount === 0) {
            return res.status(404).json('Lugares com essa categoria não foram encontrados.');
        }

        return res.status(200).json(categ.rows);
    } catch (error) {
        return res.status(400).json(error.message);
    }
}



module.exports ={
    marcacaoLugar,
    listarLugaresMarcados,
    listarComentarios,
    listarLugaresCategoria
}