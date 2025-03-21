-- Criação do banco de dados
CREATE DATABASE IF NOT EXISTS cafeteria;
USE cafeteria;

-- Tabela: usuarios
CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    permissao ENUM('admin', 'funcionario') NOT NULL DEFAULT 'funcionario'
);

-- Tabela: categorias
CREATE TABLE IF NOT EXISTS categorias (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    descricao TEXT
);

-- Tabela: produtos
CREATE TABLE IF NOT EXISTS produtos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    descricao TEXT,
    preco DECIMAL(10, 2) NOT NULL,
    quantidade INT NOT NULL DEFAULT 0,
    categoria_id INT NOT NULL,
    imagem VARCHAR(255),
    FOREIGN KEY (categoria_id) REFERENCES categorias(id) ON DELETE CASCADE
);

-- Índices para melhorar performance
CREATE INDEX idx_produtos_nome ON produtos(nome);
CREATE INDEX idx_categorias_nome ON categorias(nome);