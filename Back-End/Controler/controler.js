const connection = require("../db/db.js");
const jwt = require("jsonwebtoken");
const jwtauth = require("../middlewear/middlewear.js");
require("dotenv").config();

function generateAccessToken(nome) {
  return jwt.sign({ nome }, process.env.TOKEN_SECRET, { expiresIn: "1800s" });
}

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

    if (!nome || !email || !senha) {
      return res
        .status(400)
        .json({ error: "Nome, email e senha são obrigatórios" });
    }

    const sql =
      "INSERT INTO usuarios (nome, email, senha, permissao) VALUES (?, ?, ?, ?)";
    connection.query(sql, [nome, email, senha, permissao], (err, results) => {
      if (err) {
        return res.status(500).json({ error: "Erro ao adicionar usuário" });
      }
      res.json({
        message: "Usuário adicionado com sucesso",
        id: results.insertId,
      });
    });
  }

  static Login(req, res) {
    const { nome, senha } = req.body;
    const query = "SELECT * FROM usuarios WHERE nome = ? AND senha = ?";

    connection.query(query, [nome, senha], (err, results) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Erro ao consultar o banco de dados" });
      }

      if (results.length > 0) {
        const usuario = results[0];
        const token = generateAccessToken(usuario.nome);
        return res
          .status(200)
          .json({ message: "Login bem-sucedido", token: token, user: usuario });
      } else {
        return res.status(401).json({ message: "Credenciais inválidas" });
      }
    });
  }
  static Home(req, res) {
    const nome = req.user.nome; // O nome do usuário autenticado

    const query = "SELECT * FROM usuarios WHERE nome = ?";

    connection.query(query, [nome], (err, results) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Erro ao consultar o banco de dados" });
      }

      if (results.length > 0) {
        // Se o usuário for encontrado, retorna os dados
        return res
          .status(200)
          .json({ message: `Bem-vindo, ${nome}!`, user: results[0] });
      } else {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }
    });
  }

  static AdicionaCategorias(req, res) {
    const { nome, descricao } = req.body;

    if (!nome || !descricao) {
      return res
        .status(400)
        .json({ error: "Nome, e descriçao são obrigatórios" });
    }

    const sql = "INSERT INTO categorias (nome, descricao) VALUES (?, ?)";
    connection.query(sql, [nome, descricao], (err, results) => {
      if (err) {
        return res.status(500).json({ error: "Erro ao adicionar categoria" });
      }
      res.json({
        message: "Categoria adicionado com sucesso",
        id: results.insertId,
      });
    });
  }
  static RetornaCategoria(req, res) {
    const sql = "SELECT * FROM categorias";

    connection.query(sql, (erro, resultado) => {
      if (erro) {
        return res.json({ Erro: "Deu erro em retornar a categoria" });
      } else {
        res.json({ resultado: resultado });
      }
    });
  }

  static AdicionaProdutos(req, res) {
    const { nome, preco, quantidade, cat, imagem } = req.body;

    const sql = "SELECT id FROM categorias WHERE nome = ?";
    connection.query(sql, [cat], (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: "Erro ao buscar categoria" });
      }

      if (result.length === 0) {
        return res.status(404).json({ message: "Categoria não encontrada" });
      }

      const categoriaId = result[0].id;

      const query =
        "INSERT INTO produtos (nome, preco, quantidade, categoria_id, imagem) VALUES (?, ?, ?, ?, ?)";
      connection.query(
        query,
        [nome, preco, quantidade, categoriaId, imagem],
        (err, results) => {
          if (err) {
            console.log(err);
            return res.status(500).json({ message: "Erro ao inserir produto" });
          } else {
            return res.status(201).json({
              message: "Produto cadastrado com sucesso",
              produto: results,
            });
          }
        }
      );
    });
  }

  static RetornaProdutos(req, res) {
    const query =
      "SELECT produtos.nome AS nome_produto, produtos.preco, produtos.quantidade, produtos.categoria_id, categorias.nome, produtos.imagem  FROM produtos INNER JOIN categorias on categorias.id=produtos.categoria_id";
    connection.query(query, (err, result) => {
      res.json({ resultado: result });
    });
  }
}

module.exports = UserController;
