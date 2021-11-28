const conexao = require('../conexao');

const marcacaoLugar = async (req,res) =>{
    const {nome,email,categoria,nome_do_estabelecimento,comentario,logradouro,coordenadas} = req.body;
    
    if (!nome) {
        return res.status(404).json({ mensagem: "Você precisa colocar uma nome para o local." })
    }
    if (!email) {
        return res.status(404).json({ mensagem: "Você precisa colocar uma email para o local." })
    }
    if (!nome_do_estabelecimento) {
        return res.status(404).json({ mensagem: "Você precisa colocar o nome do estabelecimento." })
    }
     if (!comentario) {
        return res.status(404).json({ mensagem: "Você precisa deixar um comentário para que as outras pessoas entendam o porquê do local ser acessível. " })
    }
    if (!logradouro) {
        return res.status(404).json({ mensagem: "Você precisa deixar o endereço do local. " })
    }

    try {

        const query = 'insert into marcacao_usuario (nome,email,categoria,nome_do_estabelecimento,comentario,logradouro,coordenadas) values ($1, $2,$3,$4,$5,$6,$7)';

        const localMarcado = await conexao.query(query, [nome,email,categoria,nome_do_estabelecimento,comentario,logradouro,coordenadas]);

        if (localMarcado.rowCount === 0) {
            return res.status(400).json({ mensagem: "Não foi possível enviar sua solicitação." })  
        } 

         return res.status(201).json({ mensagem: "Sua solicitação foi enviada com sucesso!" })

     } catch (error) {
         return res.status(404).json({ mensagem: error.message })
    }

}

const listarLugaresMarcados = async (req,res) =>{
    const todosOsLugares = await conexao.query('select * from marcacao_usuario');

    return res.status(200).json(todosOsLugares.rows);
}

const listarComentarios = async(req,res) =>{

        const {logradouro }= req.params;
    try {
        const coments = await conexao.query('select comentario from marcacao_usuario where logradouro = $1', [logradouro]);

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
        const categ = await conexao.query('select logradouro from marcacao_usuario where categoria = $1', [categoria]);

        if (categ.rowCount === 0) {
            return res.status(404).json('Lugares com essa categoria não foram encontrados.');
        }

        return res.status(200).json(categ.rows);
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

const aprovarLugar = async(req,res) =>{
    const { id } = req.params;
    const { aprovacao } = req.body;

    if (aprovacao !== true || aprovacao !== false) {
        return res.status(400).json('Nesse campo só pode ser digitado true ou false');
    }

    try {
        const lmarcado = await conexao.query('select * from marcacao_usuario where id = $1', [id]);

        if (lmarcado.rowCount === 0) {
            return res.status(404).json('Marcação não encontada');
        }

        const query = `update marcacao_usuario set aprovacao = $1 where id = $2`;

        const marcacaoAtualizada = await conexao.query(query, [aprovacao, id]);

        if (marcacaoAtualizada.rowCount === 0) {
            return res.status(400).json('Não foi possível aprovar a marcação.');
        }

        return res.status(200).json('A marcação foi aprovada com sucesso.');
    } catch (error) {
        return res.status(400).json(error.message);
    }
}



module.exports ={
    marcacaoLugar,
    listarLugaresMarcados,
    listarComentarios,
    listarLugaresCategoria,
    aprovarLugar
}