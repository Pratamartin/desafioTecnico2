const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class User {
  constructor(nome, email, senha, telefone) {
    this.id = generateGUID(); // Função para gerar um GUID
    this.nome = nome;
    this.email = email;
    this.senha = senha;
    this.telefone = telefone;
    this.data_criacao = new Date();
    this.data_atualizacao = new Date();
    this.ultimo_login = null;
    this.token = null;
  }

  // Método para gerar um token JWT para o usuário
  generateAuthToken() {
    const token = jwt.sign({ email: this.email }, 'secreto');
    return token;
  }

  // Método para verificar a senha do usuário
  async verifyPassword(candidatePassword) {
    const match = await bcrypt.compare(candidatePassword, this.senha);
    return match;
  }

  // Método para atualizar a data de última atualização e último login
  updateTimestamps() {
    this.data_atualizacao = new Date();
    this.ultimo_login = new Date();
  }
}

function generateGUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

module.exports = User;
