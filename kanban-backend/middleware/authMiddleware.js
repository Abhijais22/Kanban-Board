const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Access denied' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(403).json({ error: 'Invalid token' });
  }
};

exports.checkAccessLevel = (requiredLevel) => (req, res, next) => {
  if (req.user.accessLevel !== requiredLevel) {
    return res.status(403).json({ error: 'Access forbidden' });
  }
  next();
};
