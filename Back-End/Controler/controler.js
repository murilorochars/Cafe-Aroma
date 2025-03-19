const connection = require('../db/db.js')




class UserController {
    static RetornaUsuarios(req, res) {
        connection.query("SELECT * FROM usuarios", (err, results) => {
            if (err) {
                return res.status(500).json({ error: "Erro ao buscar usuários" });
            }
            res.json(results);
        });
    }

    static AdicionaUsuarios(req, res) {
        const { nome, email, senha, permissao } = req.body;

        if (!nome || !email) {
            return res.status(400).json({ error: "Nome e email são obrigatórios" });
        }

        const sql = "INSERT INTO usuarios (nome, email, senha, permissao) VALUES (?, ?, ?, ?)";
        connection.query(sql, [nome, email, senha, permissao], (err, results) => {
            if (err) {
                return res.status(500).json({ error: "Erro ao adicionar usuário" });
            }
            res.json({ message: "Usuário adicionado com sucesso", id: results.insertId });
        });
    }
}

module.exports = UserController;

