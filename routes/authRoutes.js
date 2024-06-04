const express = require('express');
const router = express.Router();
const { auth } = require('../config/firebaseConfig');
const ServiceProvider = require('../models/ServiceProvider');

const checkAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: 'No token provided' });
  }

  const token = authHeader.split('Bearer ')[1];
  try {
    const decodedToken = await auth.verifyIdToken(token);
    req.user = decodedToken;
    next();
  } catch (error) {
    console.error('Error verifying token:', error);
    return res.status(401).json({ message: 'Unauthorized' });
  }
};

router.post('/register', async (req, res) => {
  const { email, password, name, phone } = req.body;

  try {
    const userRecord = await auth.createUser({
      email,
      password,
    });

    const newServiceProvider = new ServiceProvider({
      _id: userRecord.uid, 
      name,
      email,
      phone,
    });
    await newServiceProvider.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).send('Server error');
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {

    const user = await auth.getUserByEmail(email);

    const token = await auth.createCustomToken(user.uid);

    res.json({ token });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).send('Server error');
  }
});

router.get('/profile', checkAuth, async (req, res) => {
  try {
    const serviceProvider = await ServiceProvider.findById(req.user.uid);
    if (!serviceProvider) {
      return res.status(404).json({ message: 'ServiceProvider not found' });
    }
    res.json(serviceProvider);
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).send('Server error');
  }
});

module.exports = router;
