const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ error: 'Accès refusé, token manquant.' });
    }
    const verified = jwt.verify(token, process.env.JWT_SECRET || 'secret_par_defaut');
    req.user = verified;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Token invalide.' });
  }
};