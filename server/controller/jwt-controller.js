import jwt from 'jsonwebtoken';

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ msg: 'Token is missing or malformed' });
  }

  const token = authHeader.split(' ')[1];
  console.log('Token:', token);

  jwt.verify(token, process.env.ACCESS_SECRET_KEY, (err, user) => {
    if (err) {
      console.log('JWT Error:', err.message);
      return res.status(403).json({ msg: 'Invalid token' });
    }

    req.user = user;
    next();
  });
};
