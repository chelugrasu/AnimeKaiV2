// validate-token.js
const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Middleware to verify JWT token
function verifyToken(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'Token is missing' });
  }
  try {
    const decoded = jwt.verify(token, 'LB7/9rMBtdAu/Vnc7eKDavAYiVB2cwRKKzfMKiEe1iY=');
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ error: 'Invalid token' });
  }
}

// Route to check if user is logged in (token validation)
router.get('/', verifyToken, (req, res) => {
  // The verifyToken middleware ensures that the user is authenticated
  // If the middleware passes, it attaches the user information to req.user
  // Here you can perform any additional actions with req.user if needed
  res.json({ user: req.user }); // Send user information from decoded token
});

module.exports = router;
