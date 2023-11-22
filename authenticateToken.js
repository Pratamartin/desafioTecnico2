const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Não autorizado' });
  }

  jwt.verify(token.replace('Bearer ', ''), 'secreto', (err, user) => {
    if (err) {
      if (err.name === 'TokenExpiredError') {
        return res.status(401).json({ message: 'Sessão inválida' });
      }
      return res.status(401).json({ message: 'Não autorizado' });
    }
    req.user = user;
    next();
  });
}

module.exports = authenticateToken;
