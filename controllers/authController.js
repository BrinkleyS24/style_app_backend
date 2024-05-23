const ServiceProvider = require('../models/ServiceProvider');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  const { name, email, password, phone } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const serviceProvider = new ServiceProvider({ name, email, password: hashedPassword, phone });
    await serviceProvider.save();
    res.status(201).send('Service Provider Registered');
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const serviceProvider = await ServiceProvider.findOne({ email });
    if (!serviceProvider || !await bcrypt.compare(password, serviceProvider.password)) {
      return res.status(401).send('Invalid Credentials');
    }
    const token = jwt.sign({ id: serviceProvider._id }, process.env.JWT_SECRET);
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
