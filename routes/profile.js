const express = require('express');
const router = express.Router();
const { auth } = require('../config/firebaseConfig');
const ServiceProvider = require('../models/ServiceProvider');

const checkAuth = async (req, res, next) => {
  const token = req.headers.authorization?.split('Bearer ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized, no token provided' });
  }
  try {
    const decodedToken = await auth.verifyIdToken(token);
    req.user = decodedToken;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized, invalid token' });
  }
};

router.get('/', checkAuth, async (req, res) => {
  try {
    const serviceProvider = await ServiceProvider.findById(req.user.uid);
    if (!serviceProvider) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(serviceProvider);
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).send('Server error');
  }
});

module.exports = router;
