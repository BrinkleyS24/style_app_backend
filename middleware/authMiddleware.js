const jwt = require('jsonwebtoken');
const ServiceProvider = require('../models/ServiceProvider');

const authMiddleware = async (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '');
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const serviceProvider = await ServiceProvider.findById(decoded.id);
    if (!serviceProvider) {
      throw new Error();
    }
    req.user = serviceProvider;
    next();
  } catch (error) {
    res.status(401).send('Please authenticate');
  }
};

module.exports = authMiddleware;
