//implementação futura quando houver cadastro de usuários

const conexao = require('./src/conexao');

const listarUsuarios = async (req,res) =>{
       
    const todosOsUsuarios = await conexao.query('select * from usuarios ');

    return res.status(200).json(todosOsUsuarios.rows);
}

const identificarUsuario = async (req,res) =>{

    const {nome,email} = req.body;

    if (!nome) {
        return res.status(404).json({ mensagem: "Você precisa colocar um nome." })
    }
    if (!email) {
        return res.status(404).json({ mensagem: "Você precisa colocar um e-mail." })
    }

    try {

        const queryConsultaEmail = 'select * from usuarios where email = $1';
        const { rowCount: quantidadeUsuarios } = await conexao.query(queryConsultaEmail, [email]);

        if (quantidadeUsuarios > 0) {
            return res.status(400).json({ mensagem: "O usuário já está cadastrado!" })
        }

        const query = 'insert into usuarios (nome,email) values ($1, $2)';

        const usuarioIdentificado = await conexao.query(query, [nome, email]);

        if (usuarioIdentificado.rowCount === 0) {
            return res.status(400).json({ mensagem: "Não foi possível cadastrar o usuário." })  
        } 

         return res.status(201).json({ mensagem: "Usuário cadastrado com sucesso!" })

     } catch (error) {
         return res.status(404).json({ mensagem: error.message })
    }
    }

    module.exports = {
    identificarUsuario,
    listarUsuarios,
}