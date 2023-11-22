const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../model/user');

const users = [];

async function createUser(req, res) {
    try {
        const { nome, email, senha, telefone } = req.body;

        // Verificar se o email já existe
        const existingUser = users.find(u => u.email === email);
        if (existingUser) {
            return res.status(400).json({ message: 'Email já existente' });
        }

        const hashedPassword = await bcrypt.hash(senha, 10);
        const user = new User(nome, email, hashedPassword, telefone);

        users.push(user);

        const token = user.generateAuthToken();
        user.token = token;
        user.updateTimestamps();

        res.status(201).json({
            message: 'Usuário criado com sucesso',
            confirmation: 'Cadastro confirmado',
            user,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao criar usuário' });
    }
}

async function loginUser(req, res) {
    try {
        const { email, senha } = req.body;

        const user = users.find(u => u.email === email);

        if (!user) {
            return res.status(401).json({ message: 'Usuário e/ou senha inválidos' });
        }

        const passwordMatch = await user.verifyPassword(senha);

        if (!passwordMatch) {
            return res.status(401).json({ message:'Usuário e/ou senha inválidos' });
        }

        
        const token = user.generateAuthToken();
        user.token = token;
        user.updateTimestamps();

        res.status(200).json({
            message: 'Login bem-sucedido',
            confirmation: 'Login confirmado',
            user,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao fazer login' });
    }
}

async function getUser(req, res) {
    try {
      const user = users.find(u => u.email === req.user.email);
  
      if (!user) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
      }
  
      res.status(200).json({ message: 'Usuário encontrado', user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro ao buscar usuário' });
    }
  }
  
  module.exports = {
    createUser,
    loginUser,
    getUser,
  };