const mysql = require('mysql');

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root123",
    database: "cafeteria"
});

connection.connect(function(err) {
    if (err) {
        console.error("Erro na conexão:", err);
        return;
    }
    console.log("Conectado ao banco de dados!");
});

module.exports = connection;
