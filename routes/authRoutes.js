const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const authenticateToken = require('../authenticateToken'); 

// Rota para criar um usuário
router.post('/users', userController.createUser);

// Rota para fazer login
router.post('/login', userController.loginUser);

// Rota para buscar um usuário autenticado
router.get('/user', authenticateToken, userController.getUser);

module.exports = router;